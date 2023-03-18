const connection = require('./connectdb');

class EmployeeDatabase {
    constructor(connection) {
      this.connection = connection;
    }


    //methods for functions
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

    getEmployees() {
      return this.connection.promise().query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
          FROM employee 
          LEFT JOIN role 
          ON employee.role_id = role.id 
          LEFT JOIN department 
          ON role.department_id = department.id 
          LEFT JOIN employee manager 
          ON manager.id = employee.manager_id;`
      );
    };
    
  addEmployee(first_name, last_name, role_id, manager_id) {
    return this.connection.promise().query(
      `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
        VALUES(?,?,?,?)`
      // employee to replace
      , [first_name, last_name, role_id, manager_id])
  };

  }