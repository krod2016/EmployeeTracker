const inquirer = require('inquirer');
const db = require('./db/connection');

// Connect to database
db.connect(err => {
  if (err) {
      throw error
  }
  promptUser();
});

// prompt user for action
const promptUser = () => {
  inquirer
      .prompt([{
          name: `action`,
          type: `list`,
          message: `What would you like to do?`,
          choices: [
              `View Employees`,
              `View Roles`,
              `View Departments`,
              `Add Employee`,
              `Add Role`,
              `Add Department`,
              `Update Employee's Role`,
              `Exit`
          ]
      }
      ])
      .then((response) => {
          switch (response.action) {
              case `View Employees`: viewEmployees(); break;
              case `View Roles`: viewRole(); break;
              case `View Departments`: viewDepartment(); break;
              case `Add Department`: addDepartment(); break;
              case `Add Role`: addRole(); break;
              case `Add Employee`: addEmployee(); break;
              case `Update Employee's Role`: updateEmployeeRole(); break;
              case `Exit`: db.end(); break;
          }
      })
};

//display table of all departments
const viewDepartment = () => {
  db.query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
      console.table(res)
      promptUser();
  })
};

//displays employees table
function viewEmployees() {
  const sql = `SELECT employee.*, role.title
  AS job_title, role.salary AS salary
  FROM employee
  LEFT JOIN role
  ON employee.role_id = role.id`;
  db.query(sql, (err, res) => {
      if (err) throw err;
      console.table(res)
      promptUser()
  })
};

//displays roles table
function viewRole() {
  const sql = `SELECT role.*, department.name
  AS department
  FROM role
  LEFT JOIN department
  ON role.department_id = department.id`;
  db.query(sql, (err, res) => {
      if (err) throw err;
      console.table(res)
      promptUser()
  })
};

//add new department
const addDepartment = () => {
  return inquirer
      .prompt([
          {
              type: 'input',
              name: 'department_name',
              message: 'What is the name of the department?'
          }
      ]).then(response => {
          db.query("INSERT INTO department SET ?", {
              name: response.department_name
          }, function () {
              promptUser()
          })
      });
};

// update employee's role
const updateEmployeeRole = () => {
  return inquirer
      .prompt([
          {
              type: 'input',
              name: 'employee_id',
              message: 'What is the id number of the employee?'
          },
          {
              type: 'list',
              name: 'role',
              message: 'What is the new role?',
              choices: ['Curator', 'Educator', 'Docent', 'Lawyer']
          }
      ]).then(response => {
          db.query("UPDATE employee SET role_id = ? WHERE id = ?",
              [turnRoleIntoID(response.role), response.employee_id]
              , function () {
                  promptUser()
              })
      });
};

//enter role
function turnRoleIntoID(role) {
  if (role == 'Curator') {
      return 3;
  }
  else if (role == 'Educator') {
      return 4;
  }
  else if (role == 'Docent') {
      return 5;
  }
  else if (role == 'Lawyer') {
      return 6;
  }
}

//enter department, and makes ID
function turnDepartmentIntoID(department) {
    if (department == 'Curator') {
        return 1;
    }
    else if (department == 'Educator') {
        return 2;
    }
    else if (department == 'Docent') {
        return 3;
    }
    else if (department == 'Lawyer') {
        return 4;
    }
};
function turnManagerIntoID(man) {
    if (man == 'John') {
        return 1;
    }
    else if (man == 'Kelly') {
        return 2;
    }
};

//add new role
const addRole = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'

            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department is the role?',
                choices: ['Curator', 'Educator', 'Docent', 'Lawyer']
            }
        ]).then(response => {
            db.query("INSERT INTO role SET ?", {
                title: response.title,
                salary: response.salary,
                department_id: turnDepartmentIntoID(response.department)
            }, function () {
                promptUser()
            })
        });
};

//add new employee
const addEmployee = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is employee's last name?",
            },
            {
                type: 'list',
                name: 'role',
                message: "What is employee's role?",
                choices: ['Curator', 'Educator', 'Docent', 'Lawyer']
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: ['Katrina', 'Jacob', 'John', 'Terry']
            }
        ]).then(response => {
            db.query("INSERT INTO employee SET ?", {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: turnRoleIntoID(response.role),
                manager_id: turnManagerIntoID(response.manager)
            }, function () {
                promptUser()
            })
        });
}