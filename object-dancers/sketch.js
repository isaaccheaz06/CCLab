/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  dancer = new Snoopy(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();
  dancer.update();
  dancer.display();
}

class Snoopy {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.leftArmAngle = 0;
    this.rightArmAngle = 0;
    this.legAngle = 0;
    this.bounce = 0;
    this.armSpeed = 0.1;
    this.bounceSpeed = 0.15;
    this.bodySway = 0;
    this.headTilt = 0;
  }

  update() {
    this.leftArmAngle = sin(frameCount * this.armSpeed) * 0.8;
    this.rightArmAngle = cos(frameCount * this.armSpeed * 1.5) * 0.6;
    this.legAngle = sin(frameCount * this.armSpeed * 1.2 + PI) * 0.5;
    this.bounce = sin(frameCount * this.bounceSpeed) * 8;
    this.bodySway = cos(frameCount * this.bounceSpeed * 0.8) * 5;
    this.headTilt = sin(frameCount * this.armSpeed * 0.7) * 0.2;
  }

  display() {
    push();
    translate(this.x, this.y);
    translate(this.bodySway, this.bounce);

    this.drawLegs();
    this.drawBody();
    this.drawArms();
    this.drawHead();

    pop();
  }

  drawArms() {
    fill(255);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);

    // Left arm
    push();
    translate(-25, 20);
    rotate(this.leftArmAngle * 0.2);
    rect(-10, 0, 20, 60, 10);
    pop();

    // Right arm 
    push();
    translate(25, 20);
    rotate(-this.rightArmAngle * 0.2);
    rect(10, 0, 20, 60, 10);
    pop();
  }

  drawLegs() {
    fill(255);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);

    // Left leg
    push();
    translate(-15, 65);
    rotate(this.legAngle);
    // Lower leg first 
    push();
    translate(0, 35);
    rotate(-this.legAngle * 0.3);
    rect(0, 0, 20, 50, 10);
    pop();
    // Thigh on top
    rect(0, 0, 25, 60, 15);
    pop();

    // Right leg
    push();
    translate(15, 65);
    rotate(-this.legAngle);
    // Lower leg first 
    push();
    translate(0, 35);
    rotate(this.legAngle * 0.3);
    rect(0, 0, 20, 50, 10);
    pop();
    // Thigh on top
    rect(0, 0, 25, 60, 15);
    pop();
  }
  drawBody() {
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(0, 30, 40, 70, 50);
    rect(0, 50, 69, 50, 50);
  }

  drawHead() {
    push();
    rotate(this.headTilt);

    // Ears with outline
    fill(0);
    stroke(255);
    strokeWeight(2);

    // Left ear
    push();
    translate(-40, -70);
    rotate(0.5);
    ellipse(0, 0, 40, 80);
    pop();

    // Right ear
    push();
    translate(40, -70);
    rotate(-0.5);
    ellipse(0, 0, 40, 80);
    pop();

    // Head base
    fill(255);
    //noStroke();
    stroke(0);
    ellipse(0, -70, 80, 90);
    ellipse(0, -30, 100, 80);

    // Nose
    fill(0);
    noStroke();
    ellipse(0, -40, 30, 20);

    // Eyes
    fill(0);
    ellipse(-8, -80, 10, 15);
    ellipse(8, -80, 10, 15);

    // Smile
    noFill();
    stroke(0);
    strokeWeight(3);
    arc(0, -3, 60, 20, 0, PI);

    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}


/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/