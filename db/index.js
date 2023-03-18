const connection = require('./connectdb');

class EmployeeDatabase {
    constructor(connection) {
      this.connection = connection;
    }

    getDepartments() {
      return this.connection.promise().query(
        "SELECT * FROM department"
      );
    };

    addDepartment(name) {
      return this.connection.promise().query(
        `INSERT INTO department(name) 
          VALUES(?)`
        //the name to replace
        , name)
    };

  }