/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let nFrames = 600;
let nPoints = 200;
let delay = 3.0;
let cols, rows;
let current = [];
let previous = [];
const dampening = 0.99;

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent("p5-canvas-container");
    background(50);

    pixelDensity(1);
    cols = width;
    rows = height;
    for (let i = 0; i < cols; i++) {
        current[i] = new Array(rows).fill(0);
        previous[i] = new Array(rows).fill(0);
    }
}

function mouseDragged() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        previous[floor(mouseX)][floor(mouseY)] = 2500;
    }
}

function draw() {
    background(50);
    let bruh = 3;
    if (
        mouseIsPressed == true &&
        mouseX > 0 &&
        mouseX < width &&
        mouseY > 0 &&
        mouseY < height
    ) {
        bruh += 300;
        background(0);
        stroke(255);
    } else {
        stroke(255);
    }

    loadPixels();
    for (let i = 1; i < cols - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            current[i][j] =
                (previous[i - 1][j] +
                    previous[i + 1][j] +
                    previous[i][j - 1] +
                    previous[i][j + 1]) /
                2 -
                current[i][j];
            current[i][j] = current[i][j] * dampening;
            let index = (i + j * cols) * 4;
            pixels[index + 0] = current[i][j];
            pixels[index + 1] = current[i][j];
            pixels[index + 2] = current[i][j];
        }
    }
    updatePixels();

    let temp = previous;
    previous = current;
    current = temp;

    let timing = (frameCount / nFrames) * bruh;
    let diameter = 10;

    let xTwo = width / 3 + 90 * cos(TWO_PI * timing);
    let yTwo = height / 2 + 90 * sin(TWO_PI * timing);

    let xOne = width / 2 + 30 * cos(TWO_PI * timing);
    let yOne = height / 2 + 20 * sin(TWO_PI * timing);

    let xThree = width / 1.4 - 90 * cos(TWO_PI * timing);
    let yThree = height / 2 + 90 * sin(TWO_PI * timing);

    yFour = sin(frameCount * 0.031) * 100 + 100;

    xFive = height / 1.5 + sin(frameCount * 0.02) * 50;

    xSix = height / 1.45 - cos(frameCount * 0.03) * 50;

    xSeven = width / 4 - cos(frameCount * 0.03) * 50;

    xEight = width / 1.3 - cos(frameCount * 0.03) * 50;

    line(xOne, yOne, xTwo, yTwo);
    line(xOne, yOne, xThree, yThree);
    line(xTwo, yTwo, 50, yFour);
    line(xThree, yThree, 750, yFour);
    line(xOne, yOne, 50, yFour);

    let randomNum = sin(frameCount * 0.01) * 50;

    line(xOne, yOne, xFive, height / 1.1 + randomNum - 100);

    line(xOne, yOne, 750, yFour);

    line(xFive, height / 1.1 + randomNum - 100, xSix, height / 1.1 + randomNum);

    line(xTwo, yTwo, xFive, height / 1.1 + randomNum - 100);

    line(xThree, yThree, xFive, height / 1.1 + randomNum - 100);

    line(xSeven, height / 1.2, xFive, height / 1.1 + randomNum - 100);
    line(xEight, height / 1.2, xFive, height / 1.1 + randomNum - 100);

    line(xEight, height / 1.2, xThree, yThree);
    line(xSeven, height / 1.2, xTwo, yTwo);

    fill(255);

    circle(xThree, yThree, diameter);
    circle(xTwo, yTwo, diameter);
    circle(xOne, yOne, diameter);
    circle(xFive, height / 1.1 + randomNum - 100, diameter);

    circle(50, yFour, diameter);
    circle(750, yFour, diameter);

    circle(xSix, height / 1.1 + randomNum, diameter);

    circle(xSeven, height / 1.2, diameter);
    circle(xEight, height / 1.2, diameter);
    let sweaty = 0;
    let sizebruh = 1;
    let originalcolor = 50;

    if (mouseX < xOne + 40 && mouseX > xOne - 40 && mouseY > yOne - 40 && mouseY < yOne + 40) {
        sweaty += 500;
        sizebruh *= 1.5;
        originalcolor += 102.5;
    }

    //heart
    fill(originalcolor, 50, 50);
    heart(
        xOne + 5,
        yOne + 10,
        abs(sin(frameCount * (0.05 + sweaty)) * 20 * sizebruh)
    );

    function heart(x, y, size) {
        beginShape();
        vertex(x, y);
        bezierVertex(
            x - size / 2,
            y - size / 2,
            x - size,
            y + size / 3,
            x,
            y + size
        );
        bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
        endShape(CLOSE);
    }
}
