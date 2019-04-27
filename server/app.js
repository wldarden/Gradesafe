var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var cors = require('cors');
var md5 = require('md5');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// create connection
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  port: "3303",
  user: "wldarden",
  password: "Dlw8615!",
  database: 'gradesafe'
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//security regex
var validEmailRE = new RegExp('/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix');
var validPWRE = new RegExp('/^(?=.*\d)(?=.*[!@#$%])(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8}$/');

//security helper funcs
var vEmail = (str) => validEmailRE.test(str)
var vPW = (str) => validPWRE.test(str)


//endpoints
app.post('/login', function (req, res) {// student
  let username = req.body.email
  let password = req.body.password
  let userType = req.body.userType === 'teacher' ? 'professor' : req.body.userType
  let query = 'select * from ' + userType + ' where EMAIL = ' + "'" + username + "'" + ' and PASSWORD = ' + "'" + md5(password) + "'"
  con.connect((err) => {
    con.query(query, (err, response) => {
      if (response && !err) {
        res.send(response);
      } else {
        res.status(400).send({message: "Unable to login with that information"})
      }

    })
  })
});

app.post('/classes', function (req, res) {// student
  let email = req.body.email
  let userType = req.body.userType
  let query = ''
  if (userType === 'student') {
    query = 'SELECT DISTINCT C.CNAME FROM course C, grades G, student S WHERE S.EMAIL = ' + "'" + email + "'" + ' AND S.S_ID=G.S_ID AND C.C_ID=G.C_ID'
  } else {
    query = 'SELECT DISTINCT C.CNAME FROM course C, professor P WHERE P.EMAIL = ' + "'" + email + "'" + ' AND C.C_ID=P.C_ID';
  }
  con.connect((err) => {
    con.query(query, (err, response) => {
      if (response && !err) {
        let newCourses = []
        response.forEach(c => {
          let query = 'SELECT DISTINCT C_ID FROM course WHERE CNAME='+"'"+c.CNAME+"'";
          con.query(query, (err, resp) => {
            if (resp && !err) {
              newCourses.push({CNAME: c.CNAME, id: resp[0].C_ID})
            } else {
              res.status(400).send({message: "Unable to fetch course"})
            }
          })
        })
        setTimeout(() => {
          res.send(newCourses);
        }, 1000)

      } else {
        res.status(400).send({message: "Unable to fetch courses"})
      }

    })
  })
});
app.post('/class/student', function (req, res) {// student
  let sId = req.body.sId
  let cId = req.body.cId
  let query = 'SELECT G.ASSIGNMENTS, C.dateAssigned, C.dueDate, G.GRADE FROM course C, grades G WHERE G.S_ID=' + "'" + sId + "'" + ' AND G.C_ID=' + "'" + cId + "'" + ' AND C.C_ID=G.C_ID AND G.ASSIGNMENTS=C.ASSIGNMENTS'
  con.connect((err) => {
    con.query(query, (err, response) => {
      if (response && !err) {
        res.send(response);
      } else {
        res.status(400).send({message: "Unable to fetch class information for student"})
      }
    })
  })
});


app.listen(3000, function () {
    console.log('Gradesafe app listening on port 3000!');
});
