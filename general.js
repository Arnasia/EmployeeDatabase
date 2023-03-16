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
  
        } else if (answer.initialPrompt === 'View all Employees') {
          return viewEmployees();
  
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

  function viewDepartments() {
    db.getDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => beginPrompt());
  }

  function addDepartment() {
    inquirer.prompt([
      {
        name: 'name',
        message: "What is the name of the department?"
      },
    ]).then(res => {
      // cretes a department in the database
      db.addDepartment(res.name)
      console.log("The department has been added!")
      beginPrompt()
    })
  }

  function viewEmployees() {
    //gets employees from database and list them
    db.getEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => beginPrompt());
  }

  function addEmployee() {
    Promise.all([db.getRoles(), db.getManager()])
      .then(([[roles], [managers]]) => {
        // console.log(roles[0]);
        // console.log(managers[0]);
        return inquirer.prompt([
          {
            name: 'firstname',
            message: "What is the employee's first name?"
          },
          {
            name: 'lastname',
            message: "What is the employee's last name?"
          },
          {
            type: 'list',
            name: 'rolePrompt',
            message: "What is the employee's role?",
            choices: roles.map(role => ({ name: role.title, value: role.id })),
          },
          {
            type: 'list',
            name: 'managerPrompt',
            message: "What is the employee's manager?",
            choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
          }
        ])
      }
      ).then(({ firstname, lastname, rolePrompt, managerPrompt }) => {
        // adds an employee and the user inputs
        db.addEmployee(firstname, lastname, rolePrompt, managerPrompt)
        console.log("The employee has been added!")
        beginPrompt()
      })
  }
  

  beginPrompt();