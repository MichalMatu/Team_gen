// import modules to create manager, engineer, and intern objects
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// import inquirer to prompt user for input
const inquirer = require("inquirer");
// import path to create output path
const path = require("path");
// import fs to write file
const fs = require("fs");
// create output path folder
const OUTPUT_DIR = path.resolve(__dirname, "output");
// vreate file path for output file
const outputPath = path.join(OUTPUT_DIR, "team.html");
// render function to create html file from page-template.js
const render = require("./src/page-template.js");
// create array to hold team members
let TEAM = [];
// inquirer questions for manager
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the manager's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the manager's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the manager's email?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's phone number?",
  },
];
// inquirer questions for engineer
const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the engineer's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the engineer's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the engineer's email?",
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer's GitHub username?",
  },
];
// inquirer questions for intern
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the intern's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the intern's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the intern's email?",
  },
  {
    type: "input",
    name: "school",
    message: "What is the intern's school?",
  },
];
// inquirer question for main menu
const mainMenu = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: ["Add an Engineer", "Add an Intern", "Finish building my team"],
  },
];
// initialize app by prompting user for manager info and then calling addEmployee function
function init() {
    inquirer.prompt(managerQuestions).then(function (data) {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        TEAM.push(manager);
        addEmployee();
    });
}
// function to prompt user for Engineer or Intern or to finish building team in switch statement
function addEmployee() {
    inquirer.prompt(mainMenu).then(function (data) {
        switch (data.menu) {
            case "Add an Engineer":
                inquirer.prompt(engineerQuestions).then(function (data) {
                    const engineer = new Engineer(data.name, data.id, data.email, data.github);
                    TEAM.push(engineer);
                    addEmployee();
                });
                break;

            case "Add an Intern":
                inquirer.prompt(internQuestions).then(function (data) {
                    const intern = new Intern(data.name, data.id, data.email, data.school);
                    TEAM.push(intern);
                    addEmployee();
                });
                break;

            case "Finish building my team":
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR);
                }
                fs.writeFileSync(outputPath, render(TEAM), "utf-8");
                break;

            default:
                break;
        }
    });
}
// Lets start it up
init();
