// GLOBAL variables

var x = {
  pos: 0,
  target: 0
}
var y = {
  pos: 0,
  target: 0
}

var easing = 0.05;
var border = 50;
var circleSize = 4;

var col = {
  bgnd: 0,
  f: 255,
  s: 255
}

var bpm = 100;
var fr = 60;
var factor = fr/bpm;

// ----------------------------------------------------------

function setup() {
  createCanvas(800, 800);
  background(0);
  frameRate(fr);

  stroke(255);
  strokeWeight(1);
  rectMode(CENTER);
  noFill();
}

function draw() {
  translate(canvas.width/2, canvas.height/2);

  // vol = amp.getLevel();
  circleSize = 100;

  // calculate Target point
  generateTarget();

  // clear screen every 4 beats
  clearScreen();

  // easing
  x.pos += (x.target-x.pos) * easing;
  y.pos += (y.target-y.pos) * easing;

  // draw mirrored shapes
  generate(1);
  generate(-1);
}

// ----------------------------------------------------------

function generate(mirror) {
  if ((mirror === undefined) || (mirror != -1)) {
    mirror = 1;
  }
  ellipse(mirror*x.pos, mirror*y.pos, circleSize, circleSize);
}

function generateTarget() {
  if (frameCount % (fr*(factor)) == 1) {
    x.target = random(-canvas.width/2+border, canvas.width/2-border);
    y.target = random(-canvas.height/2+border, canvas.height/2-border);
  }
}

function clearScreen() {
  if (frameCount % ((fr*factor)*4) == 0) {
    background(col.bgnd);
  }
}

function loaded() {
  song.play();
}
