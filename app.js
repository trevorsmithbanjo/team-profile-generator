const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const teamProfile = [];

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

function completeProfile() {
    console.dir(teamProfile);
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