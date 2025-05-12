let handPose;
let video;
let hands = [];
let options = { maxHands: 2 };

let startTime;
let showIntro = true;
let showVideo = false;
let NowStartDrawing = false;

let vidWidth = 1056;
let vidHeight = 792;

let pinch = 0;

let drawingPoints = [];

function preload() {
  handPose = ml5.handPose(options);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(vidWidth, vidHeight);
  video.hide();

  startTime = millis();

  handPose.detectStart(video, gotHands);
  background(255);
}

function draw() {
  background(255);

  let elapsed = millis() - startTime;

  if (showIntro) {
    let alpha;

    if (elapsed < 2000) {
      alpha = map(elapsed, 0, 2000, 0, 255);
    } else if (elapsed < 7000) {
      alpha = 255;
    } else if (elapsed < 10000) {
      alpha = map(elapsed, 7000, 10000, 255, 0);
    } else if (elapsed >= 10000) {
      showIntro = false;
      showVideo = true;
      return;
    }

    fill(0, alpha);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(64);
    text("YOU ARE ART", width / 2, height / 2);
  }

  let yOffset = (height - vidHeight) / 3;
  let gridSize = 20;

  video.loadPixels();

  if (showVideo) {
    let videoalpha = 0;

    if (elapsed < 15000) {
      videoalpha = map(elapsed, 10000, 15000, 0, 255);
    } else {
      videoalpha = 255;
      NowStartDrawing = true;
    }

    push();
    translate(width / 2, yOffset);
    scale(-1, 1);

    // Grid distortion
    for (let y = 0; y < video.height; y += gridSize) {
      stroke(0, videoalpha);
      noFill();
      beginShape();
      for (let x = 0; x < video.width; x += gridSize) {
        let index = (x + y * video.width) * 4;

        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];

        let avg = (r + g + b) / 3;
        let yAdj = map(avg, 0, 255, 0, gridSize * 2);

        curveVertex(x - vidWidth / 2, y + yAdj);
      }
      endShape();
    }

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

      stroke(0);
      strokeWeight(2);
      for (let k = 0; k < connections.length; k++) {
        let [i1, i2] = connections[k];
        let kp1 = keypoints[i1];
        let kp2 = keypoints[i2];
        line(kp1.x - vidWidth / 2, kp1.y, kp2.x - vidWidth / 2, kp2.y);
      }
    }


  }

  if (NowStartDrawing) {
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      let keypoints = hand.keypoints;

      let thumb = keypoints[4];
      let index = keypoints[8];
      let middle = keypoints[12];

      let centerX = (index.x + thumb.x) / 2;
      let centerY = (index.y + thumb.y) / 2;

      let centerX2 = (middle.x + thumb.x) / 2;
      let centerY2 = (middle.y + thumb.y) / 2;

      let pinchDist = dist(index.x, index.y, thumb.x, thumb.y);
      let pinchDist2 = dist(middle.x, middle.y, thumb.x, thumb.y);

      if (pinchDist < 50) {
        let randColor = color(random(255), random(255), random(255));
        drawingPoints.push({ x: centerX, y: centerY });
      }

      if (pinchDist2 < 20) {
        drawingPoints = [];
      }

    }


    noStroke();
    fill(0);
    for (let pt of drawingPoints) {
      circle(pt.x - vidWidth / 2, pt.y, 20);
    }
  }


  pop();
}

function gotHands(results) {
  hands = results;
}
