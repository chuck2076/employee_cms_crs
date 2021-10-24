
const inquirer = require("inquirer");


module.exports = async() => {
    const deptInput = await inquirer.prompt ([
    {
        type: "input",
        name: "dept_name",
        message: "Add a New Department",
        when(choices) {
            return choices.action === "Add Department"
        },
        
    },
  ]);
};
