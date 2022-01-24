// Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadge = license => {
  if (license) {
    return `![${license} License](https://img.shields.io/badge/license-${license
      .split(" ")
      .join("%20")}-blue)
`;
  } else {
    return "";
  }
};

// Create a function that returns the description section
const renderDescription = (title, description, link) => {
  if (link) {
    return `${description}
          
View the deployed page at [${title}](${link}).`;
  } else {
    return `${description}`;
  }
};

// Create a function that returns the table of contents section
const renderTableOfContents = contentsArr => {
  // creates list based on user input
  let contentsList = "";
  contentsArr.forEach((item) => {
    if (item.content) {
      contentsList += `* [${item.header}](#${item.header
        .toLowerCase()
        .split(" ")
        .join("-")})
      `;
    }
  });
  return contentsList;
};

// Create a function that returns installation section of README
const renderInstallation = install => {
  if (install) {
    return `To use this application, please install: 
\`\`\`
${install}
\`\`\``
  } else {
    return "";
  }
};

// Create a function that returns test section of README
const renderTest = test => {
  if (test) {
    return `To run tests on the application, install
\`\`\`
${test}
\`\`\`
and run \`npm run test\` from the command line.`
  } else {
    return "";
  };
};

// Create a function that returns the built with section of README
const renderBuiltWith = builtWith => {
  let allTech = "";

  if (builtWith) {
    builtWith.forEach(item => {
      allTech += `
* ${item}`
    });
    return `${allTech}`;
  } else {
    return "";
  };
};

// Create a function that returns the usage section of README
const renderUsage = usage => {
  return `${usage}`
};

// Create a function that returns the license section of README
// If there is no license, return an empty string
const renderLicense = license => {
  if (license) {
    return `This application is licensed under the ${license} license.`;
  } else {
    return "";
  }
};

// Create a function that returns the questions section of README
const renderQuestions = (email, github, repository) => {
  if (email) {
    return `If you have any questions about the repository, please contact me through email at ${email}. You can find more work by me on my Github, [${github}](https://github.com/${github}/).`;
  } else {
    return "";
  }
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const { title, github, repository, license } = data;
  let contentsOfReadme = "";
  const sectionsArr = [
    {
      header: "Installation",
      content: renderInstallation(data.installation)
    },
    {
      header: "Usage",
      content: renderUsage(data.usage)
    },
    {
      header: "License",
      content: renderLicense(license)
    },
    {
      header: "Built With",
      content: renderBuiltWith(data["built with"])
    },
    {
      header: "Contributions",
      content: data.contributions
    },
    {
      header: "Tests",
      content: renderTest(data.tests)
    },
    {
      header: "Questions",
      content: renderQuestions(data.questions, github, repository)
    },
  ];

  // Adds each section into README if they exist and have content
  sectionsArr.forEach((sectionItem) => {
    if (sectionItem.content) {
      contentsOfReadme += `## ${sectionItem.header}   
${sectionItem.content}
      
`;
      }
  });
  return `# ${title} 
  ${renderLicenseBadge(license)}

  ## Description
${renderDescription(title, data.description, data.link)}

## Contents
${renderTableOfContents(sectionsArr)}

${contentsOfReadme}`;
}

module.exports = generateMarkdown;
