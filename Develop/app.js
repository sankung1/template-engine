const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const myTeam = []

// this function will create questions for the manager
function managerQuestions() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter manager's name",
            validate: async input => {
                if (input == "" || input.includes("0123456789")) {
                    return "Please enter a valid name.";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "id",
            message: "Enter Manager's ID",
            validate: async input => {
                if (isNaN(input)) {
                    return "please enter a valid  ID"
                }
                return true;
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter manager's email",
            validate: async input => {
                if (input.includes("@") & input.includes(".com")) {
                    return true;
                }
                return "Please enter a valid email"
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter manager's office number",
            vailidate: async input => {
                if (isNaN(input)) {
                    return "The office number must include numbers only";
                }
                return true;
            },
        }
    ]).then(answers => {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        myTeam.push(manager);
        addTeamMember()
    })

}

// this function will promt the user to add a new team member
function addTeamMember() {
    inquirer.prompt([{
        type: "list",
        name: "teamMember",
        message: "Select the team member you want to add",
        choices: ["engineer", "intern", "I don't want to add a team member"]
    }]).then(res => {
        if (res.teamMember == "engineer") {
            createEngineer();
        } else if (res.teamMember == "intern") {
            createIntern();
        } else {
            writeToFile(outputPath, render(myTeam));
        }
    })
}

// this function will create the questions to create the engineer
function createEngineer() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter the name of the engineer you want to add",
            validate: async input => {
                if (input == "" || input.includes("0123456789")) {
                    return "Please enter a valid name";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "id",
            message: "Enter the engineer's id",
            validate: async input => {
                if (isNaN(input)) {
                    return "Please enter a valid ID";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter the engineer's email",
            validate: async input => {
                if (input.includes("@") & input.includes(".com")) {
                    return true;
                }
                return "Please enter a valid email"
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter the engineer's github username",
            validate: input => {
                if (input == "") {
                    return "Please enter a username"
                }
                return true;
            }
        }
    ]).then(res => {
        const engineer = new Engineer(res.name, res.id, res.email, res.github);
        myTeam.push(engineer);
        addTeamMember();
    })
}

// this function will prompt the user to create an intern
function createIntern() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter the name of the intern you want to add",
            validate: async input => {
                if (input == "" || input.includes("0123456789")) {
                    return "Please enter a valid name";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "id",
            message: "Enter the intern's id",
            validate: async input => {
                if (isNaN(input)) {
                    return "Please enter a valid ID";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter the intern's email",
            validate: async input => {
                if (input.includes("@") & input.includes(".com")) {
                    return true;
                }
                return "Please enter a valid email"
            }
        },
        {
            type: "input",
            name: "school",
            message: "Enter the intern's school name",
            validate: input => {
                if (input == "") {
                    return "Please enter a school name"
                }
                return true;
            }
        }
    ]).then(res =>{
        const intern = new Intern(res.name, res.id, res.email, res.school)
        myTeam.push(intern);
        addTeamMember();
    })
}

// this function will write the files to create the team.html
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            throw err;
        }
        console.log("Successful");
    });
}

// call the manager function to start the app
managerQuestions();

