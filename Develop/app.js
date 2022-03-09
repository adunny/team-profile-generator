const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

const writeHtml = require("./lib/renderPromise");

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
        // push new manager obj into employee array
        employees.push(manager);
        return promptEmployeeList(employees);
    })
};

const promptEmployeeList = employees => {
    //add employee/finish prompt
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'employeeList',
            message: `
            =====================================================================
            Please select an employee to add, or select "Finish" if you are done.
            =====================================================================
            
            `,
            choices: ['Engineer', 'Intern', 'Finish']
        },
    ])
    .then(answers => {
        if (answers.employeeList === 'Engineer') {
            // if add engineer was selected, run engineer prompt and pass the employee array thru
            return promptEngineer(employees);
        }
        else if (answers.employeeList === 'Intern') {
            // if add intern was selected, run intern prompt and pass employ array thru
            return promptIntern(employees);
        } else {
            // if finish was selected, render html
            writeHtml(employees);
        }
    })
}


const promptEngineer = employees => {
    // engineer prompts
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
        // push new engineer object into employee array
        employees.push(engineer);
        // run the add/finish prompt again
        promptEmployeeList(employees);
    })
};

const promptIntern = employees => {
    // intern prompts
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
        // push new intern obj into employee array
        employees.push(intern);
        // run the add/finish prompt again
        promptEmployeeList(employees);
    })
}

promptManager();