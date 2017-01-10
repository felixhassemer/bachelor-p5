// VARIABLES
var u = {   // UNITS
  wMin: 10,
  wMax: 140,
  hMin: 10,
  hMax: 160,
  w: 0,
  h: 0
}

var choose = {
  main: 0,
  pattern: 0
}

var patterns = [
  this[0] = {
    name: "diagLine",
    value: 0
  }

]

var a = {   // ARRAY
  rOff: [10], // random offset
  key: [],
  val: []
}

var n = {   // NOISE
  x : {
    off: 0,
    incr: 0.01
  },
  y : {
    off: 0,
    incr: 0.05
  }
}

var p = { // POSITION
  x: 0,
  y: 0
}

var border = 0;
var bgndColor = 255;

var f = {   // FILL
  color: 0
}

var s = {   // STROKE
  color: 0,
  weight: 3,
  off: 0,
  cap: 0,
  join: 0
}


function setup() {
  // INIT
  s.off = s.weight/2;
  s.cap = ROUND;
  s.join = ROUND;

  u.w = random(u.wMin, u.wMax);
  u.h = random(u.hMin, u.hMax);

  console.log(patterns[0]);

  // INIT ARRAY
  for (var i=0; i< 10; i++) {
    a.rOff[i] = random(100000);
  }

  setPatternNoise();

  // SETTINGS
  createCanvas(800,800);
  frameRate(25);
  background(bgndColor);
}

function draw() {
  // choose pattern
  choose.main = map(noise(n.x.off), 0, 1, 0, 100);

  clearSides();

  // set Unit Width to random or until margin
  if (dist(p.x, p.y, width - border*2, p.y) > u.wMax) {
    u.w = round(random(u.wMin, u.wMax));
  } else {
    u.w = dist(p.x, p.y, width - border*2, p.y);
  }

  diagLine();

  // Paragraph Overflow or move X
  if (p.x + u.w > width - border*2-1) {
    // random Unit Height
    p.x = 0;
    p.y += u.h;
    u.h = round(random(u.hMin, u.hMax));
  } else {
    p.x += u.w;
  }

  // NOISE increment
  n.x.off += n.x.incr;
  n.y.off += n.y.incr;

  scrollScreen();
}

// ----------------------------------------------------------
// CORE FUNCTIONS

function chooseFunction() {
  // for (var i=0; i< patterns.length)
}

function setPatternNoise() {
  patterns[0] = {
    "name": "diagLine",
    "keyValue": map(random(n.y.off + a.rOff[0]), 0, 1, 0, 100)
  }
}

function scrollScreen() {
  if (p.y + u.h >= height) {
    copy(this, 0, 0, width, p.y, 0, -u.h, width, p.y);
    fill(bgndColor);
    noStroke();
    rect(0 - border, p.y - u.h, width, u.hMax);
    p.y = p.y - int(u.h);
  }
}

function clearSides() {
  fill(bgndColor);
  noStroke();
  rect(0, 0, border, p.y);
  rect(width - border, 0, border, p.y);
  translate(border, 0);
}

// ----------------------------------------------------------
// PATTERN FUNCTIONS

function diagLine() {
  // STYLING
  stroke(s.color);
  strokeWeight(s.weight);
  strokeCap(s.cap);
  strokeJoin(s.join);
  noFill();

  // PATTERN
  choose.pattern = round(random(1));
  if (choose.pattern == 0) {
    line(p.x, p.y+s.off, p.x+u.w, p.y+u.h-s.off);
  } else {
    line(p.x, p.y+u.h-s.off, p.x+u.w, p.y+s.off);
  }
}
