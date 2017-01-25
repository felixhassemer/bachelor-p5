// GLOBAL variables

var song;
var amp;
var vol;

var x = {
  pos: 0,
  target: 0
}
var y = {
  pos: 0,
  target: 0
}

var easing = 0.05;
var border = 40;
var objSize = 4;

var col = {
  bgnd: 0,
  f: 255,
  s: 0
}

var bpm = 128;
var fr = 60;
var factor = fr/bpm;

// ----------------------------------------------------------

function preload() {
}

function setup() {
  createCanvas(800, 800);
  background(col.bgnd);
  frameRate(fr);
  song = loadSound("data/everythingbefore.mp3", loaded);
  amp = new p5.Amplitude();
  amp.toggleNormalize(1);

  stroke(col.s);
  strokeWeight(1);
  rectMode(CENTER);
  fill(col.f);
  // noFill();
}

function draw() {
  translate(canvas.width/2, canvas.height/2);

  vol = amp.getLevel();
  console.log(vol);
  objSize = map(vol, 0, 1, 0, 180);

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
  if (vol < 0.2) {
    ellipse(mirror*x.pos, mirror*y.pos, 5, 5);
  } else if (vol < 0.8) {
    ellipse(mirror*x.pos, mirror*y.pos, objSize, objSize);
  } else {
    rect(mirror*x.pos, mirror*y.pos, objSize, objSize);

  }
}

function generateTarget() {
  if (frameCount % round(fr*factor) == 1) {
    x.target = random(-canvas.width/2+border, canvas.width/2-border);
    y.target = random(-canvas.height/2+border, canvas.height/2-border);
  }
}

function clearScreen() {
  if (frameCount % round(((fr*factor)*4)) == 0) {
    background(col.bgnd);
  }
}

function loaded() {
  song.play();
}
