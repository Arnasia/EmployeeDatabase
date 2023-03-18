const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // MySQL password
      password: "NaeNae23",
      database: "employee_db",
    },
    console.log("Connected to the employee database.")
  );



  module.exports = db;
