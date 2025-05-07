let faceMesh;
let handPose;
let video;
let hands = [];
let faces = [];
let options = { maxFaces: 2, refineLandmarks: false, flipHorizontal: false };
let options2 = { maxHands: 4, modelType: "lite" };

let vidWidth = 640;
let vidHeight = 480;

function preload() {
  faceMesh = ml5.faceMesh(options);
  handPose = ml5.handPose(options2);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  video = createCapture(VIDEO);
  video.size(vidWidth, vidHeight);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
  handPose.detectStart(video, gotHands);
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

  // Grid distortion
  for (let y = 0; y < video.height; y += gridSize) {
    stroke(0);
    noFill();
    beginShape();
    for (let x = 0; x < video.width; x += gridSize) {
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

  // Face keypoints (colored)
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

  // Hand keypoints and connections
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [5, 6], [6, 7], [7, 8],
    [9, 10], [10, 11], [11, 12],
    [13, 14], [14, 15], [15, 16],
    [0, 17], [17, 18], [18, 19], [19, 20],
    [1, 5], [5, 9], [9, 13], [13, 17],

  ];

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let keypoints = hand.keypoints;

    // Draw connecting lines
    stroke(0);
    strokeWeight(2);
    for (let k = 0; k < connections.length; k++) {
      let [i1, i2] = connections[k];
      let kp1 = keypoints[i1];
      let kp2 = keypoints[i2];
      line(kp1.x, kp1.y, kp2.x, kp2.y);
    }

    // Draw keypoints using video pixel color
    noStroke();
    for (let j = 0; j < keypoints.length; j++) {
      let kp = keypoints[j];
      let px = floor(kp.x);
      let py = floor(kp.y);

      if (px >= 0 && px < video.width && py >= 0 && py < video.height) {
        let index = (px + py * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];

        fill(r, g, b);
        circle(kp.x, kp.y, 8);
      }
    }
  }

  pop(); // end mirror transform
}

function gotFaces(results) {
  faces = results;
}

function gotHands(results) {
  hands = results;
}