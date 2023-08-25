// TODO: Include packages needed for this application
const inquirer = require('inquirer')
const { writeFile } = require('fs').promises;
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is the name of your project?',
        name: 'project',
    },
    {
        type: 'input',
        message: 'Add a short description of your project:',
        name: 'description',
    },
    {
        type: 'confirm',
        message: 'do you need to install anything for this project?',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'please describe what needs to be installed:',
        name: 'installdir',
        when: (response) => response.installation === true
    },
    {
        type: 'input',
        message: 'provide a short description of the usage of this project:',
        name: 'usage',
    },
    {
        type: 'confirm',
        message: 'would you like to add any credits?',
        name: 'creditconfirm',
    },
    {
        type: 'input',
        message: 'Please provide your credits for this project:',
        name: 'credit',
        when: (response) => response.creditconfirm === true
    },
    {
        type: 'list',
        message: 'Which license would like to use?',
        choices: ['MIT', 'Apache License 2.0', 'Mozilla Public License 2.0', 'The Unlicense', 'NONE'],
        name: 'license',
    },
    {
        type: 'confirm',
        message: 'Would you like to add how to Contribute to your README?',
        name: 'contribconfirm',
    },
    {
        type: 'input',
        message: 'Please add how people can contirbute to your project:',
        name: 'contribute',
        when: (response) => response.contribconfirm === true
    },
    {
        type: 'confirm',
        message: 'Do you have information about testing this project?',
        name: 'testconfirm',
    },
    {
        type: 'input',
        message: 'Please input how people can test this project:',
        name: 'tests',
        when: (response) => response.testconfirm === true
    },
    {
        type: 'input',
        message: 'What is your github username?',
        name: 'gitname',
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    }


];

const template = ({project, description, installdir, usage, credit, license, contribute, tests, gitname, email}) => {
`
# ${project}

## Description
${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#how-to-contribute)
- [Tests](#tests)
- [Questions](#Questions)

## Installation
${installdir}
## Usage
${usage}
## Credits
${credit}
## License
${license}
## How to Contribute
${contribute}
## Tests
${tests}
## Questions
Find me on Github at https://github.com/${gitname} or email me at: ${email}
`
}

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions)
    .then((response) => writeFile('newREADME.md', template(response)))
    .then(() => console.log('Successfully created your README!'))
    .catch((err) => console.error(err));
}

// Function call to initialize app
init();
