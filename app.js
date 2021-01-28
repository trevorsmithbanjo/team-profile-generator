const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array to store team info
const teamProfile = [];

// Function to get user input
function teamProfileBuilder() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Hello Team Manager, please enter your name"
            },
            {
                type: "input",
                name: "id",
                message: "Please enter your ID."
            },
            {
                type: "input",
                name: "email",
                message: "Please enter your Email."
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Please enter your office number."
            }
        ])
        .then(data => {
            let manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            teamProfile.push(manager);
            addMember();
        })
}

// Function to ask user if they want to add a member or if they are done.
function addMember() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "member",
                message: "Select another team member to add, or complete team.",
                choices: ["Engineer", "Intern", "Team Complete"]
            }
        ])
        .then(choice => {
            if (choice.member === "Engineer") {
                addEngineer();
            }
            else if (choice.member === "Intern") {
                addIntern();
            }
            else {
                completeProfile();
            }
        })
}

// Function to render info to html file
function completeProfile() {
    fs.writeFileSync(outputPath, render(teamProfile));
    console.log("Team Profile Complete!");
}

function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Please enter Engineer's name"
            },
            {
                type: "input",
                name: "id",
                message: "Please enter Engineer's ID."
            },
            {
                type: "input",
                name: "email",
                message: "Please enter Engineer's Email."
            },
            {
                type: "input",
                name: "github",
                message: "Please enter Engineer's github username."
            }
        ])
        .then(data => {
            let engineer = new Engineer(data.name, data.id, data.email, data.github);
            teamProfile.push(engineer);
            addMember();
        })
}

function addIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Please enter Intern's name"
            },
            {
                type: "input",
                name: "id",
                message: "Please enter Intern's ID."
            },
            {
                type: "input",
                name: "email",
                message: "Please enter Intern's Email."
            },
            {
                type: "input",
                name: "school",
                message: "Please enter Intern's School name."
            }
        ])
        .then(data => {
            let intern = new Intern(data.name, data.id, data.email, data.school);
            teamProfile.push(intern);
            addMember();
        })
}

teamProfileBuilder();