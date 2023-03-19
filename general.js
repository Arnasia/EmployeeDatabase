const inquirer = require("inquirer");
const EmployeeDatabase = require ("./db/index")

const beginPrompt = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'initialPrompt',
        message: 'What action would you like to take?',
        choices: ['View All Departments', 'Add Department','View All Employees', 'Add Employee', 'Update Employee Role', 'Delete Employee', 'View All Roles', 'Add Role', 'Delete Role'],
    }])
    .then(answer => {
        if (answer.initialPrompt === 'View All Departments') {
          return viewDepartments();
  
        } else if (answer.initialPrompt === 'Add Department') {
          return addDepartment();
  
        } else if (answer.initialPrompt === 'View All Employees') {
          return viewEmployees();
  
        } else if (answer.initialPrompt === 'Add Employee') {
          return addEmployee();
  
        } else if (answer.initialPrompt === 'Update Employee Role') {
          return updateEmployeeRole();
  
        } else if (answer.initialPrompt === 'Delete Employee') {
          return deleteEmployee();
  
        } else if (answer.initialPrompt === 'View All Roles') {
          return viewRoles();
  
        } else if (answer.initialPrompt === 'Add Role') {
          return addRole();
  
        } else if (answer.initialPrompt === 'Delete Role') {
          return deleteRole();

        } else {
          console.log('Please select an action!');
          return false;
        }
      })
  };

  function viewDepartments() {
    EmployeeDatabase.getDepartments()
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
      EmployeeDatabase.addDepartment(res.name)
      console.log("The department has been added!")
      beginPrompt()
    })
  }

  function viewEmployees() {
    //gets employees from database and list them
    EmployeeDatabase.getEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => beginPrompt());
  }

  function addEmployee() {
    Promise.all([EmployeeDatabase.getRoles(), EmployeeDatabase.getManager()])
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
        EmployeeDatabase.addEmployee(firstname, lastname, rolePrompt, managerPrompt)
        console.log("The employee has been added!")
        beginPrompt()
      })
  }
  
  function updateEmployeeRole() {
    EmployeeDatabase.getEmployees()
      .then(([employees]) => {
        inquirer.prompt([
          {
            type: 'list',
            name: 'employeePrompt',
            message: "Which employee role would you like to update?",
            //map each with name as display, value as return value. Map with employee object array
            choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
          }
        ])
          .then(res => {
            let employee_id = res.employeePrompt;
            EmployeeDatabase.getRoles()
              .then(([roles]) => {
                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'rolePrompt',
                    message: "What role do you want to update the employee to?",
                    choices: roles.map(role => ({ name: role.title, value: role.id })),
                  }
                ])
                  .then(res => EmployeeDatabase.updateRole(employee_id, res.rolePrompt))
                  .then(() => console.log("The employee's role has been updated!"))
                  .then(() => beginPrompt())
  
              });
          });
      });
  };

  function deleteEmployee() {
    EmployeeDatabase.getEmployees()
      .then(([employees]) => {
        return inquirer.prompt([
          {
            type: 'list',
            name: 'employeePrompt',
            message: "Which employee would you like to delete?",
            choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
          },
        ])
      },
      ).then(({ employeePrompt }) => {
        EmployeeDatabase.deleteEmployee(employeePrompt)
        console.log("The employee has been deleted!")
        beginPrompt()
      })
  }

  function viewRoles() {
    EmployeeDatabase.getRoles()
      .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => beginPrompt());
  }

  function addRole() {
    EmployeeDatabase.getDepartments()
      .then(([departments]) => {
        return inquirer.prompt([
          {
            name: 'title',
            message: "What is the name of the role?"
          },
          {
            name: 'salary',
            message: "What is the salary amount?"
          },
          {
            type: 'list',
            name: 'departmentPrompt',
            message: "What is the role's department?",
            choices: departments.map(department => ({ name: department.name, value: department.id })),
          },
        ])
      },
      ).then(({ title, salary, departmentPrompt }) => {
        EmployeeDatabase.addRole(title, salary, departmentPrompt)
        console.log("The role has been added!")
        beginPrompt()
      })
  }
  function deleteRole() {
    EmployeeDatabase.getRoles()
      .then(([roles]) => {
        return inquirer.prompt([
          {
            type: 'list',
            name: 'rolePrompt',
            message: "Which role would you like to delete?",
            choices: roles.map(role => ({ name: role.title, value: role.id })),
          },
        ])
      },
      ).then(({ rolePrompt }) => {
        EmployeeDatabase.deleteRole(rolePrompt)
        console.log("The role has been deleted!")
        beginPrompt()
      })
  }

  beginPrompt();