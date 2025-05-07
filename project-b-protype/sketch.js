let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 4, refineLandmarks: false, flipHorizontal: false };

let vidWidth = 640;
let vidHeight = 480;

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  video = createCapture(VIDEO);
  video.size(vidWidth, vidHeight);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
  background(255);
}

function draw() {
  background(255);

  let xOffset = (width - vidWidth) / 2;
  let yOffset = (height - vidHeight) / 2;
  push();
  translate(xOffset + vidWidth, yOffset);
  scale(-1, 1);
  image(video, 1000, 1000, vidWidth, vidHeight);
  pop();

  let gridSize = 15;
  video.loadPixels();

  push();
  translate(xOffset + vidWidth, yOffset);
  scale(-1, 1);

  for (let y = 0; y < video.height; y += gridSize) {
    stroke(0);
    noFill();
    beginShape();
    for (let x = 0; x < video.width; x += gridSize) {

      //let flippedX = video.width - x - 1;
      let index = (x + y * video.width) * 4;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let avg = (r + g + b) / 3;
      let yAdj = map(avg, 0, 255, 0, gridSize * 2);

      curveVertex(x, y + yAdj);
    }
    endShape();
  }

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];

      let px = floor(keypoint.x);
      let py = floor(keypoint.y);

      if (px >= 0 && px < video.width && py >= 0 && py < video.height) {
        let index = (px + py * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];

        fill(r, g, b);
        noStroke();
        circle(keypoint.x, keypoint.y, 5);
      }
    }
  }


}

function gotFaces(results) {
  faces = results;
}