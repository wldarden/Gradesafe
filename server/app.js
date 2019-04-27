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
  let userType = req.body.userType
  let query = 'select * from ' + userType + ' where EMAIL = ' + "'" + username + "'" + ' and PASSWORD = ' + "'" + md5(password) + "'"
  con.connect((err) => {
    con.query(query, (err, response) => {
      console.log(response, response.length, err, 'response loggggg')
      if (response && !err) {
        res.send(response);
      } else {
        res.status(400).send({message: "Unable to login with that information"})
      }

    })
  })
});

app.listen(3000, function () {
    console.log('Gradesafe app listening on port 3000!');
});
