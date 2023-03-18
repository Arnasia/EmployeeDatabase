const connection = require('./connectdb');

class EmployeeDatabase {
    constructor(connection) {
      this.connection = connection;
    }