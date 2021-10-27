//Importing and requiring middleware
const express = require('express');
const mysql = require('mysql2');
const hideSecrets = require ('hide-secrets')
const consoleTable = require ('console.table')
const chalk = require('chalk')
const logo = require('asciiart-logo');
const inquirer = require('inquirer')

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

  //Ascii Art for successful connection to DB
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
//Initial menu of choices
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
            "Update Employee",
            "Add Role",
            "Quit"
   
        ]
        },    
    ]);
    
//Switch case for menu choices to run functions defined below
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
            addEmployee();
            break;
        case "Add Role":
            addRole();
            break;
        case "Update Employee":
            updateEmployee();
            break;
        default:
            break;
    }
}; 
// Get Department query function
const getDepartment = async () => {
    const departments = await db.promise().query("SELECT * FROM department")
    console.table(departments[0]);
    menu()
}
// Get roles query function
const getRoles = async () => {
    const roles = await db.promise().query("SELECT roles.title, roles.salary, department.dept FROM roles LEFT JOIN department ON roles.dept_id=department.id")
    console.table(roles[0])
    menu()
}
// Get Employees query function
const getEmployees = async () => {
    const employee = await db.promise().query("SELECT employee.first_name, employee.last_name, department.dept, roles.title, roles.salary, manager.last_name AS manager FROM employee LEFT JOIN roles ON roles.id=employee.roles_id LEFT JOIN department ON department.id=roles.dept_id LEFT JOIN employee manager ON manager.id=employee.manager_id")
    console.table(employee[0])
    menu()
}
// Starting inquirer prompts to add departments
const addDepartment = async () => {
    const deptInput = await inquirer.prompt ([
        {
            type: "input",
            name: "dept",
            message: "Add a New Department:"
            
        },
      ]);
// Query function to add department
    const iDepartment = await db.promise().query("INSERT INTO department SET?", deptInput)
    console.log("New Department Added")
    menu()
}
// Start inquirer prompts to add role
const addRole = async () => { 
    //Add departments variable to make available to choices dropdown list
    const departments = await db.promise().query("SELECT * FROM department")

    const rolesInput = await inquirer.prompt ([
        {
            type: "input",
            name: "title",
            message: "Add a New Employee Role:",
        },
        {    
            type: "input",
            name: "salary",
            message: "What is the salary for this role?",
        },
        {
            type: "list",
            name: "dept_id",
            message: "Add Department for this role:",
            choices: departments[0].map((dept) => ({name: dept.dept, value: dept.id}))
        },
      ]);
// Query to add role input to database
    const iRole = await db.promise().query("INSERT INTO roles SET?", rolesInput)
    console.log("New Role Added")
    menu()
};
// Start inquirer prompts to add Employee
const addEmployee = async () => {
    // Import roles query for choices in roles_id
    const roles = await db.promise().query("SELECT roles.title, roles.id FROM roles")
    const employees = await db.promise().query("SELECT employee.last_name, employee.id FROM employee")

    const employeeInput = await inquirer.prompt ([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the Employee?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the Employee?"
        },
        {
            type: "list",
            name: "roles_id",
            message: "What is the Employee Role?",
            choices: roles[0].map((role) => ({name: role.title, value: role.id}))
    
        },
        {
            type: "list",
            name: "manager_id",
            message: "Select the Manager:",
            choices: employees[0].map((employee) => ({name: employee.last_name, value: employee.id}))
        },
    
      ]);
// Query to add Employee to dbase
    const iEmployee = await db.promise().query("INSERT INTO employee SET?", employeeInput)
    console.log("New Employee Added")
    menu()
};
// Starting update employee inquirer prompts
const updateEmployee = async () => {
    // making roles, employee available to inquirer choices
    const roles = await db.promise().query("SELECT roles.title, roles.id FROM roles")
    const employees = await db.promise().query("SELECT employee.last_name, employee.id FROM employee")

    const employeeInput = await inquirer.prompt ([
        {
            type: "list",
            name: "id",
            message: "Select the Employee to Update:",
            choices: employees[0].map((employee) => ({name: employee.last_name, value: employee.id}))
        },

        {
            type: "list",
            name: "roles_id",
            message: "What is the new Employee Role?",
            choices: roles[0].map((role) => ({name: role.title, value: role.id}))
    
        },
    
      ]);

      // Query for updating employees
    const uEmployee = await db.promise().query("UPDATE employee SET roles_id = ? WHERE id = ?", [employeeInput.roles_id, employeeInput.id])
    console.log("Employee has been updated")
    menu()
};


menu();