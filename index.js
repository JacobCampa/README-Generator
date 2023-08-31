
const inquirer = require('inquirer');
const { writeFile } = require('fs').promises;
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

const template = ({ project, description, installdir, usage, credit, license, contribute, tests, gitname, email, badge }) =>
    `
# ${project}

${badge}

## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${installdir ? installdir : "Not available"}

## Usage

${usage}

## Credits

${credit ? credit : "Not available"}

## License

Currently Licensed under: ${license}

## How to Contribute

${contribute ? contribute : "Not available"}

## Tests

${tests ?  tests : "Not available"}

## Questions

Find me on Github at https://github.com/${gitname} or email me at: ${email}
`;


function init() {
    return inquirer.prompt(questions)
        .then((response) => {
            const badgeChoice = response.license;
            let badge = "";
            switch (badgeChoice) {
                case "MIT":
                    badge = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
                    break;
                case "Apache License 2.0":
                    badge = "![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)";
                    break;
                case "Mozilla Public License 2.0":
                    badge = "![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)";
                    break;
                case "The Unlicense":
                    badge = "![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)";
                    break;
                default:
                    break;
            }
            writeFile('newREADME.md', template({...response, badge}))
        })
        .then(() => console.log('Successfully created your README!'))
        .catch((err) => console.error(err));
}


init();
