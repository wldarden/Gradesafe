var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var cors = require('cors');
var md5 = require('md5');
var app = express();
var moment = require('moment');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// import moment from 'moment'

// create connection
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: 'gradebook'
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//security regex
var validEmailRE = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
var validPWRE = /^(?=.*\d)(?=.*[!@#$%])(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8}$/;

//security helper funcs
var vEmail = (str) => validEmailRE.test(str)
var vPW = (str) => validPWRE.test(str)


//endpoints
app.post('/login', function (req, res) {// student
  let username = req.body.email
  let password = req.body.password
  let userType = req.body.userType === 'teacher' ? 'professor' : req.body.userType
  // console.log(username, password, md5(password))
  if (!vEmail(username)) {
    res.status(402).send({message: 'Invalid email format'})
  } else if (0 && !vPW(password)) {
    res.status(402).send({message: 'Invalid password format'})
  } else {
  	// var params = [username, md5(password)]
    // let test = 'c462106350f1fcc0b77fbfca4445cfb5' //jgaos teacher password
    let query = 'select * from ' + userType + ' where EMAIL = ? and PASSWORD = ?'; //md5(password)
    con.connect((err) => {
      con.query(query, [username,md5(password)],(err, response) => {
        if (response && !err) {
          res.send(response);
        } else {
          res.status(400).send({message: "Unable to login with that information"})
        }

      })
    })
  }
});

app.post('/classes', function (req, res) {// student
  let email = req.body.email
  let userType = req.body.userType
  let query = ''
  if (userType === 'student') {
    query = 'SELECT DISTINCT C.CNAME FROM course C, grades G, student S WHERE S.EMAIL = ? AND S.S_ID=G.S_ID AND C.C_ID=G.C_ID'
  } else {
    query = 'SELECT DISTINCT C.CNAME FROM course C, professor P WHERE P.EMAIL = ? AND C.C_ID=P.C_ID';
  }
  con.connect((err) => {
    con.query(query,[email], (err, response) => {
      if (response && !err) {
        let newCourses = []
        response.forEach(c => {
          let query = 'SELECT DISTINCT C_ID FROM course WHERE CNAME=?';
          con.query(query, [c.CNAME],(err, resp) => {
            if (resp && !err) {
              newCourses.push({CNAME: c.CNAME, id: resp[0].C_ID})
            } else {
              res.status(400).send({message: "Unable to fetch course"})
            }
          })
        })
        setTimeout(() => {
          res.send(newCourses);
        }, 250)

      } else {
        res.status(400).send({message: "Unable to fetch courses"})
      }

    })
  })
});
app.post('/class/student', function (req, res) {// student
  let sId = req.body.sId
  let cId = req.body.cId
  let query = 'SELECT G.ASSIGNMENTS, C.dateAssigned, C.dueDate, G.GRADE FROM course C, grades G WHERE G.S_ID=? AND G.C_ID=? AND C.C_ID=G.C_ID AND G.ASSIGNMENTS=C.ASSIGNMENTS'
  con.connect((err) => {
    con.query(query,[sId,cId], (err, response) => {
      if (response && !err) {
        res.send(response);
      } else {
        res.status(400).send({message: "Unable to fetch class information for student"})
      }
    })
  })
});

app.post('/class/teacher', function (req, res) {// student
  let cId = req.body.cId
  let query = 'SELECT S.FNAME, S.LNAME, S.S_ID, G.ASSIGNMENTS, G.GRADE FROM student S, grades G, professor P WHERE P.C_ID=? AND G.C_ID=P.C_ID AND S.S_ID=G.S_ID;'
  con.connect((err) => {
    con.query(query,[cId],(err, response) => {
      if (response && !err) {
        res.send(response);
      } else {
        res.status(400).send({message: "Unable to fetch class information for professor"})
      }
    })
  })
});

app.post('/class/teacher/assignment', function (req, res) {// student
  let cId = req.body.cId
  let cName = req.body.cName
  let assignmentName = req.body.assignmentName
  let assigned = moment().format('YYYY-MM-DD')
  let due = moment().add(7, 'days').format('YYYY-MM-DD')
  let query = "insert into course (C_ID, CNAME, ASSIGNMENTS, dateAssigned, dueDate) VALUES (?,?,?,?,?);"
  con.connect((err) => {
    con.query(query,[cId,cName,assignmentName,assigned,due],(err, response) => {
      if (response && !err) {
        res.send(response);
      } else {
        console.log(response, err)
        res.status(400).send({message: "Unable to add asignment"})
      }
    })
  })
});


app.post('/class/teacher/grade', function (req, res) {// student
  let cId = req.body.cId
  let grade = req.body.grade
  let assignmentName = req.body.assignmentName
  let sId = req.body.sId
  let query = "UPDATE grades SET GRADE=? WHERE S_ID=? AND C_ID=? AND ASSIGNMENTS=?;"
  con.connect((err) => {
    con.query(query,[grade,sId,cId,assignmentName], (err, response) => {
      if (response && !err) {
        res.send(response);
      } else {
        console.log(response, err)
        res.status(400).send({message: "Unable to modify grade"})
      }
    })
  })
});

app.post('/class/teacher/grade/add', function (req, res) {// student
  let cId = req.body.cId
  let grade = req.body.grade
  let assignmentName = req.body.assignmentName
  let sId = req.body.sId
  let query = "INSERT INTO grades(S_ID, C_ID, ASSIGNMENTS, GRADE) VALUES (?,?,?,?);"
  con.connect((err) => {
    con.query(query,[sId,cId,assignmentName,0], (err, response) => {
      if (response && !err) {
        res.send(response);
      } else {
        console.log(response, err)
        res.status(400).send({message: "Unable to add grade"})
      }
    })
  })
});
app.listen(3001, function () {
    console.log('Gradesafe app listening on port 3001!');
});
