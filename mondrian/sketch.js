function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  fill(255);
  noStroke();
  frameRate(5);
  rectMode(CENTER);
}

function draw() {
  fill(255);
  rect(random(windowWidth), random(windowHeight), random(600), random(600));
  fill(190, 90, 90);
  rect(random(windowWidth), random(windowHeight), random(400), random(400));
  fill(40);
  rect(random(windowWidth), random(windowHeight), random(600), random(600));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}
