const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const promptManager = () => {
    const employees = [];

    return inquirer
    .prompt([
        // manager prompts
        {
            type: 'input',
            name: 'managerName',
            message: "What your team manager's name?"
        },
        {
            type: 'input',
            name: 'managerId',
            message: "Please enter the manager's ID."
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "Please enter the manager's e-mail address."
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: "Please enter the manager's office number."
        }
    ])
    .then(managerInfo => {
        const {managerName, managerId, managerEmail, managerOfficeNumber} = managerInfo;
        const manager = new Manager(managerName, managerId, managerEmail, managerOfficeNumber);
        employees.push(manager);
        console.log(employees);
        promptEmployeeList(employees);
        
    })
};

const promptEmployeeList = employees => {
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'employeeList',
            message: 'Please select an employee to add, or select "Finish" if you are done.',
            choices: ['Engineer', 'Intern', 'Finish']
        },
    ])
    .then(answers => {
        if (answers.employeeList === 'Engineer') {
            promptEngineer(employees);
        }
        else if (answers.employeeList === 'Intern') {
            promptIntern(employees);
        } else {
            render(employees);
        }
    })
}


const promptEngineer = employees => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: "Please enter the engineer's name.",
        },
        {
            type: 'input',
            name: 'engineerId',
            message: "Please enter the engineer's ID.",
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "Please enter the engineer's e-mail address."
        },
        {
            type: 'input',
            name: 'githubName',
            message: "Please enter the engineer's github username."
        }
    ])
    .then(engineerInfo => {
        const {engineerName, engineerId, engineerEmail, githubName} = engineerInfo;
        const engineer = new Engineer(engineerName, engineerId, engineerEmail, githubName)
        employees.push(engineer);
        console.log(employees);
        promptEmployeeList(employees);
    })
};

const promptIntern = employees => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'internName',
            message: "Please enter the intern's name."
        },
        {
            type: 'input',
            name: 'internId',
            message: "Please enter the intern's ID."
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "Please enter the intern's e-mail address."
        },
        {
            type: 'input',
            name: 'schoolName',
            message: "Please enter the name of the school this intern is attending."
        }
    ])
    .then(internInfo => {
        const {internName, internId, internEmail, schoolName} = internInfo;
        const intern = new Intern(internName, internId, internEmail, schoolName);
        employees.push(intern);
        console.log(employees);
        promptEmployeeList(employees);
    })
}

promptManager();


    
   







    





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
