const inquirer = require("inquirer");


module.exports = async() => {
    const rolesInput = await inquirer.prompt ([
    {
        type: "input",
        name: "title_name",
        message: "Add a New Employee Role:",

        type: "input",
        name: "salary_name",
        message: "What is the salary for this role?"
    },
  ]);
};
