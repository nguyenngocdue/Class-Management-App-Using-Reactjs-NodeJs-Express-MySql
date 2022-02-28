const mysql = require("mysql");
require('dotenv/config');

var db;
connectDatabase = () => {
  if (!db) {
    db = mysql.createConnection({
      // host: process.env.DBHOST,
      // database: process.env.DBNAME,
      // user: process.env.DBUSER,
      // password:  process.env.DB_PASS,
      host: "us-cdbr-east-05.cleardb.net",
      user: "baf95f51e8e853",
      password:  "271e1603",
      database: "heroku_056284627c926ae",
    });
    db.connect(function (err) {
      if (!err) {
        console.log("Database is connected!");
      } else {
        console.log("Error connecting database!");
      }
    });
  }
  return db;
};
module.exports = connectDatabase();


// vast-ridge-96173
//mysql://baf95f51e8e853:271e1603@us-cdbr-east-05.cleardb.net/heroku_056284627c926ae?reconnect=true
