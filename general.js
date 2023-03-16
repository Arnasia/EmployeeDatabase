const inquirer = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");
const db = require("./db/connectdb");

const beginPrompt = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'initialPrompt',
        message: 'What action would you like to take?',
        choices: ['View All Departments', 'Add Department','View All Employees', 'Add Employee', 'Update Employee Role', 'Delete Employee', 'View All Roles', 'Add Role', 'Delete Role'],
    }])
    .then(answer => {
        if (answer.initialPrompt === 'View all departments') {
          return viewDepartments();
  
        } else if (answer.initialPrompt === 'Add departments') {
          return addDepartment();
  
        } else if (answer.initialPrompt === 'View all departments') {
          return viewAllEmployees();
  
        } else if (answer.initialPrompt === 'Add an Employee') {
          return addEmployee();
  
        } else if (answer.initialPrompt === 'Update an employee role') {
          return updateEmployeeRole();
  
        } else if (answer.initialPrompt === 'Delete employee') {
          return deleteEmployee();
  
        } else if (answer.initialPrompt === 'View all roles') {
          return viewRoles();
  
        } else if (answer.initialPrompt === 'Add a role') {
          return addRole();
  
        } else if (answer.initialPrompt === 'Delete a role') {
          return deleteRole();

        } else {
          console.log('Please select an action!');
          return false;
        }
      })
  };



