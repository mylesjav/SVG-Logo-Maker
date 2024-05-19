// Description: This file is the main entry point for the application. It prompts the user for input to generate a logo and writes the SVG file based on the user input.
const fs = require('fs');
const inquirer = require('inquirer');

// Importing the Shape module
const Shape = require('./lib/shapes');

// Function to write an SVG file based on user input
function writeToFile(file, data) {
    let svgString = '<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><g>';

    // Adding the selected shape to the SVG
    switch (data.shape) {
        case 'Circle':
            svgString += new Shape.Circle(data.shapeColor).render();
            break;
        case 'Triangle':
            svgString += new Shape.Triangle(data.shapeColor).render();
            break;
        default:
            svgString += new Shape.Square(data.shapeColor).render();
    }

    // Adding the logo text to the SVG
    svgString += `<text x="30" y="50" text-anchor="middle" fill="${data.shapeColor}">${data.text}</text>`;

    svgString += '</g></svg>'; // Closing the group and SVG tags

    fs.writeFile(file, svgString, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("logo.svg file created!");
        }
    });
}

// Questions to generate the logo
inquirer.prompt([
    {
        type: 'input',
        message: 'Please enter up to 3 characters to be displayed: ',
        name: 'text',
        validate: (text) => text.length <= 3 || "Text cannot be longer than three characters."
   
        },
    
    {
        type: 'input',
        message: 'Enter a color for the text: ',
        name: 'textColor'
    },
    {
        type: 'list',
        message: 'Pick a shape: ',
        name: 'shape',
        choices: ['Circle', 'Triangle', 'Square']
    },
    {
        type: 'input',
        message: 'Enter a color for the Shape: ',
        name: 'shapeColor'
    }
])
.then((answers) => {
    //user feed back
    console.log(answers);

    writeToFile("logo.svg", answers);
   })
   .catch((error) => {
       console.log(error);
   });


