let meteors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < 150; i++) {
    meteors.push(new Meteor());
  }
}

function draw() {
  background(0, 0, 0);
  meteors.forEach(meteor => {
    meteor.update();
    meteor.display();
  });
}

class Meteor {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(windowWidth);
    this.y = random(-200, -50);
    this.speedX = random(-0.5, 0.5);
    this.speedY = random(5, 20);
    this.size = random(1, 2);
    this.lightness = random(60, 100);
    this.prevX = this.x;
    this.prevY = this.y;
  }

  update() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > height + 100 || this.x < -100 || this.x > width + 100) {
      this.reset();
    }
  }

  display() {
    strokeWeight(this.size);
    stroke(0, 0, this.lightness, 100);
    line(this.prevX, this.prevY, this.x, this.y);

    noStroke();
    fill(0, 0, this.lightness, 80);
    ellipse(this.x, this.y, this.size * 2); //head of the comets
  }
}