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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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
    })

}

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

function createEngineer() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter employee name",
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
            message: "Enter employee id",
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
            message: "Enter employee's email",
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

function createIntern() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter employee name",
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
            message: "Enter employee id",
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
            message: "Enter employee's email",
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

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            throw err;
        }
        console.log("Successful");
    });
}


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