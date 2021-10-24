const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const hideSecrets = require ('hide-secrets')
const consoleTable = require ('console.table')
const chalk = require('chalk')
const logo = require('asciiart-logo');
const inquirer = require('inquirer')
const department = require('./lib/department')
const roles = require('./lib/roles')
const employee = require('./lib/employee')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root123',
    database: 'office_db'
  },

  
  console.log(
    logo({
        name: 'Welcome to the Office Database',
        font: 'Poison',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'bold-blue',
    })
    .render()
)
);

const menu = async() => {
    const answer = await inquirer.prompt ([
        {
            type: "list",
            name: "action",
            message: "Get Started",
            choices: [
            "View All Departments", 
            "View All Employees", 
            "View All Roles",
            "Add Department",
            "Add Employee",
            "Add Role",
            "Delete Department",
            "Delete Employee",
            "Delete Role"    
        ]
        },    
    ]);
    

    switch (answer.action) {
        case "View All Departments":
            getDepartment();
            break;
        case "View All Employees":
            getEmployees();
            break;
        case "View All Roles":
            getRoles();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Employee":
            //addEmployee();
            break;
        case "Add Role":
            //addRole();
            break;
        case "Delete Department":
            //deleteDepartment();
            break;
        case "Delete Employee":
            //deleteEmployee();
            break;
        case "Delete Role":
            //deleteRole();
            break;                    
        default:
            break;
    }
}; 

const getDepartment = async () => {
    const departments = await db.promise().query("SELECT * FROM department")
    console.table(departments[0]);
    menu()
}

const getRoles = async () => {
    const roles = await db.promise().query("SELECT roles.title, roles.salary, department.dept FROM roles LEFT JOIN department ON roles.dept_id=department.id")
    console.table(roles[0])
    menu()
}

const getEmployees = async () => {
    const employee = await db.promise().query("SELECT employee.first_name, employee.last_name, department.dept, roles.title, roles.salary, manager.last_name AS manager FROM employee LEFT JOIN roles ON roles.id=employee.roles_id LEFT JOIN department ON department.id=roles.dept_id LEFT JOIN employee manager ON manager.id=employee.manager_id")
    console.table(employee[0])
    menu()
}

const addDepartment = async () => {
    const iDepartment = await db.promise().query("INSERT INTO department (dept) SET?", department(deptInput(dept_name.answer)))
    console.table(iDepartment[0])
    menu()
}

const addRole = async () => {
    const iRole = await db.promise().query("INSERT INTO roles (title, salary) SET?", roles(rolesInput(title_name.answer, salary_name.answer)))
    console.table(iRole[0])
    menu()
}

const addEmployee = async () => {
    const iEmployee = await db.promise().query("INSERT INTO employee (first_name, last_name, roles_id, manager_id) SET?", employee(employeeInput(first_name_input.answer, last_name_input.answer, employee_role.answer, employee_manager.answer)))
    console.table(iEmployee[0])
    menu()
}



// var x = 
// db.query(`SELECT *
//     FROM course_names
//     JOIN department ON course_names.department = department.id;`);

// // Query database
// db.query('SELECT * FROM course_names', function (err, results) {
//   console.log(results);
//   return(results)
// });

menu();