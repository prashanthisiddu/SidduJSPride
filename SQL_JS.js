function saveAccount(){
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root@localhost",
  password: "Prasu7036S",
  database: "testdb"
});

con.connect(function(err) {
  if (err) throw err;
console.log("connected");
});

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var psw = document.getElementById("psw");
var userName = document.getElementById("userName");
var email = document.getElementById("inputText");

var sql = "INSERT INTO accounts (UserName, FirstName, LastName, Email, UserPassword) VALUES ('"+userName+ "', '"+firstName+"','"+lastName+"','"+email+"','"+psw+"')";
con.query(sql, function (err, result) {
    if (err) {
        throw err;

    }

    console.log(result.affectedRows + " record(s) updated");
  });
}