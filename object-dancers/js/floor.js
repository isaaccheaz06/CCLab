function drawFloor() {
  push();

  let perspY = height * 0.3;
  let tileW = width / 30;

  for (let x = -150; x <= width + 150; x += tileW) {
    stroke(45);
    line(width / 2, perspY, x, height);
  }
  let dy = 5;
  let y = height * 0.6;
  while (y <= height) {
    line(0, y, width, y);
    dy *= 1.05;
    y += dy;
  }

  fill(0);
  noStroke();

  beginShape();
  vertex(-151, height);
  vertex(width / 2, perspY);
  vertex(-151, perspY);
  endShape();

  beginShape();
  vertex(width + 151, height);
  vertex(width / 2 + 1, perspY);
  vertex(width + 151, perspY);
  endShape();

  rect(0, 0, width, height * 0.6);

  fill(180);
  textSize(10);
  text("note: the grey grid in the background is for reference only.", 10, height - 20);
  text("It represents the 'floor' on which your dancer dances.", 35, height - 9);

  pop();
}