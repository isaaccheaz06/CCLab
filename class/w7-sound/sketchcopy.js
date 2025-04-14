
let song;
let amp;

function preload() {
  song = loadSound("assets/song.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


  amp = new p5.Amplitude();
}

function draw() {
  background(220, 30);

  let volume = amp.getLevel();

  let dia = map(volume, 0, 1, 1, 500)

  fill(0, 255, 255);
  //circle(width / 2, height / 2, dia);

  let x = frameCount * 0.5;
  let y = map(volume, 0, 1, height / 2, height / 2 - 500);
  fill(255, 0, 0);
  circle(x, y, 5);

  fill(0);
  text(volume.toFixed(2), 10, 20);

}

function mousePressed() {
  if (song.isPlaying() == false) {
    song.loop();
  } else {
    song.pause();
  }
}