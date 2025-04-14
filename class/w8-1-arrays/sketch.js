let result;
let colorNames = ["red", "coral", "pink", "olive", "royalblue"];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  result = colorNames[colorNames.length - 1];

  console.log(colorNames.length);
}

function draw() {
  background(220);

  for (let i = 0; i < colorNames.length; i++) {
    let name = colorNames[i];

    let x = 20;
    let y = i * 100;

    fill(name);
    noStroke();
    rect(0, y, width, 100);

    fill(255);
    text(name, x, y + 30);
  }

}