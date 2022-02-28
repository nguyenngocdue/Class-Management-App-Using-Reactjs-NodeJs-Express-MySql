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
      database: "heroku_5d1510ed175ce44",
      user: "b7bafd4bb9f161",
      password:  "c12b8433",
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
