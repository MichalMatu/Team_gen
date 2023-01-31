const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let TEAM = [];

const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the manager name ?",
  },
  {
    type: "input",
    name: "id",
    message: "What manager ID ?",
  },
  {
    type: "input",
    name: "email",
    message: "What manager email ?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What manager phone nr ?",
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is engineer name ?",
  },
  {
    type: "input",
    name: "id",
    message: "What is engineer ID ?",
  },
  {
    type: "input",
    name: "email",
    message: "What is engineerthe email ?",
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer github ?",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is intern name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is intern ID ?",
  },
  {
    type: "input",
    name: "email",
    message: "What is intern email address ?",
  },
  {
    type: "input",
    name: "school",
    message: "What is intern school name ?",
  },
];

const mainMenu = [
  {
    type: "list",
    name: "menu",
    message: "What' would you like to do'?",
    choices: ["Add an Engineer", "Add an Intern", "Finish building my team"],
  },
];

function init() {
    inquirer.prompt(managerQuestions).then(function (data) {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        TEAM.push(manager);
        addEmployee();
    });
}

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
