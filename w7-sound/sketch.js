let sound;
let amp;

function preload() {
  sound = loadSound("assets/song.mp3")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  amp = new p5.Amplitude();
}

function draw() {
  background(220);

  let volume = amp.getLevel();
  console.log(volume);
  let dia = map(volume, 0, 1, 1, 600);

  noStroke();
  fill(0, 255, 255);
  circle(width / 2, height / 2, dia);

  let vol = map(mouseY, 0, height, 1.0, 0.0, true);
  sound.setVolume(volValue);

  let panValue = map(mouseX, 0, width, -1.0, 1.0, true);
  sound.pan(panValue);

  let rateValue = map(mouseY, 0, height, 3.0, 0.05, true);
  //sound.rate(rateValue);
}

function mousePressed() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}