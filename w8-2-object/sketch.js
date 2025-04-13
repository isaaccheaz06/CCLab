// let b;
let creatureA, creatureB;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // b = new Ball();
  creatureA = new Creature();
  creatureB = new Creature();
}

function draw() {
  background(220);

  //text(b.x, 10, 20);
  //text(b.y, 10, 40);
  //text(b.dia, 10, 60);
  //displayBall();
  // b.move();
  // b.display();

  creatureA.display();

  creatureB.display();
}

class Creature {
  constructor(tempX, tempY, dia) {
    this.x = tempX;
    this.y = tempY;
    this.dia = dia;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
  display() {
    circle(this.x, this.y, this.dia);
  }
  drawArm() {
    ellipse()
  }
}


//function displayBall() {
//circle(b.x, b.y, b.dia);
//}

// class Ball {
//   constructor() {
//     this.x = width / 2;
//     this.y = height / 2;
//     this.dia = 100;

//     this.xSpeed = random(-2, 2);
//     this.ySpeed = random(-2, 2);
//   }
//   display() {
//     circle(this.x, this.y, this.dia)
//   }
//   move() {
//     this.x += this.xSpeed;
//     this.y += this.ySpeed;
//   }
// }

