// Include packages needed for this application
const fs = require ('fs');
const inquirer = require ('inquirer');
const generateMarkdown = require ('./utils/generateMarkdown.js')
// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: "What is your project's name? (Required)",
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Enter a project title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your Github username? (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Enter a valid username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repository',
        message: 'Enter the name of your Github repository. (Required)',
        validate: repositoryInput => {
            if (repositoryInput) {
                return true;
            } else {
                console.log('Please enter the name of your repository!')
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide any information needed for using your application. (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Provide information for using your application!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a project description. (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Enter a project description!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'contents',
        message: 'Any additional sections you would like to include in your README?',
        choices: [
            {
                name: 'Deployed Application',
                checked: false
            },
            {
                name: 'Installation',
                checked: false
            },
            {
                name: 'Contributions',
                checked: false
            },
            {
                name: 'Tests',
                checked: false
            },
            {
                name: 'Built With',
                checked: true
            },
            {
                name: 'License',
                checked: false
            },
            {
                name: 'Questions',
                checked: true
            },
        ]
    },
    {
        type: 'input',
        name: 'link',
        message: 'Please provide a link to your deployed application.',
        when: ({ contents }) => {
            if (contents.indexOf('Deployed Application') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Enter a valid link to your deployed application!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'If there are any required packages for installation of your application, please list them.',
        when: ({ contents }) => {
            if (contents.indexOf('Installation') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Enter installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributions',
        message: 'Do you have any guidelines for contributions? If so please list them.',
        when: ({ contents }) => {
            if (contents.indexOf('Contributions') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributionsInput => {
            if (contributionsInput) {
                return true;
            } else {
                console.log('Please enter guidelines for contributions!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter any test information needed for your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please list the packages that are required to run tests for your application!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'built with',
        message: 'Please select the technologies used to build your application from the following list.',
        choices: ['HTML', 'CSS', 'SASS', 'JavaScript', 'Node.js', 'Express.js'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('Built With') > -1) {
                return true;
            } else {
                return false;
            }
        }
    }, 
    {
        type: 'list',
        name: 'license',
        message: 'Please choose license information from the following list.',
        choices: ['GNU', 'MIT', 'ISC', 'Apache 2.0', 'None'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please provide license information!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Please provide an email address for others to reach you with questions.',
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please provide an email address!');
                return false;
            }
        }
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log('README has been created!')
    });
};

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
};

// Function call to initialize app
init()
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });
