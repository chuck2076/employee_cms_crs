const inquirer = require("inquirer");


module.exports = async() => {
    const employeeInput = await inquirer.prompt ([
    {
        type: "input",
        name: "first_name_input",
        message: "What is the first name of the Employee?",
    },
    {
        type: "input",
        name: "last_name_input",
        message: "What is the last name of the Employee?"
    },
    {
        type: "list",
        name: "employee_role",
        message: "What is the Employee Role?",
        choices: ["Sales", "Engineer", "Contractor"]
    },
    {
        type: "input",
        name: "employee_manager",
        message: "Who is the Employee Manager?",
    },

  ]);
};