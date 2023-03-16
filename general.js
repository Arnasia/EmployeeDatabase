const inquirer = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");
const db = require("./db/connectdb");

const beginPrompt = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'initialPrompt',
        message: 'What action would you like to take?',
        choices: ['View All Departments', 'Add Department', 'View Employees by Department','View All Employees', 'Add Employee', 'Update Employee Role', 'Delete Employee', 'View All Roles', 'Add Role', 'Delete Role', 'View Employees by Manager', 'Update Employee Manager'],
    }])
}
