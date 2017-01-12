// enable strict mode
"use strict";

// VARIABLES
// ----------------------------------------------------------
var border = 0;

// UNITS
var u = {
  wMin: 10,
  wMax: 140,
  hMin: 10,
  hMax: 160,
  w: 0,
  h: 0
}

// selects PATTERNS
var choose = {
  main: 0,
  max: 0,
  local: 0
}

// PATTERNS
var names = [ "diagLine",
              "triangleDraw",
              "circles"];
var patterns = [];

// ARRAY
var a = {
  val: []
}

// NOISE
var n = {
  x : {
    off: 0,
    incr: 0.01
  },
  y : {
    off: 0,
    incr: 0.05
  }
}

// POSITION
var p = {
  x: 0,
  y: 0
}

// COLOR
var col = {
  bgnd: 255,
  f: 0,
  s: 0
}

// STROKE
var s = {
  weight: 3,
  off: 0,
  cap: 0,
  join: 0
}

// ----------------------------------------------------------

function setup() {
  initPatterns();

  // initialize Variables
  s.off = s.weight/2;
  s.cap = ROUND;
  s.join = ROUND;

  u.w = int(random(u.wMin, u.wMax));
  u.h = int(random(u.hMin, u.hMax));

  // SETTINGS
  createCanvas(800,800, [P2D]);
  frameRate(20);
  background(col.bgnd);
}

// ----------------------------------------------------------

function draw() {
  // clear sides with col.bgnd and transform
  clearSides();

  // Assign noise to Array values
  setPatternNoise();

  // copy values from patterns in array
  a.val = new Array(patterns.length);
  for (let i=0; i < patterns.length; i++) {
    a.val[i] = patterns[i].value;
  }

  // map noise to choose function
  choose.max = max(a.val);
  choose.main = map(noise(n.x.off), 0, 1, 0, choose.max);



  // set Unit Width to random or until margin
  if (dist(p.x, p.y, width - border*2, p.y) > u.wMax) {
    u.w = round(random(u.wMin, u.wMax));
  } else {
    u.w = round(dist(p.x, p.y, width - border*2, p.y));
  }

  // sort patterns by value
  patterns.sort(function(a, b){
    return a.value-b.value
  })

  // console.log(patterns[0].name, patterns[1].name);
  // console.log(patterns[0].value, patterns[1].value);

  // selects Function according to pattern.name
  chooseFunction();

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

function initPatterns() {
  for (let i=0; i<names.length; i++) {
    patterns[i] = {
      name: names[i],
      value: 0,
      start: random(100000)
    }
  }
}

function setPatternNoise() {
  for (let i=0; i<patterns.length; i++) {
    patterns[i].value = map(noise(n.y.off + patterns[i].start), 0, 1, 0, 100);
  }
}

function chooseFunction() {
  for (let i=0; i < patterns.length; i++) {
    var foundOne = false;
    if (choose.main < patterns[i].value) {
      if (patterns[i].name == "diagLine") {
        diagLine();
        foundOne = true;
      }
      if (patterns[i].name == "triangleDraw") {
        triangleDraw();
        foundOne = true;
      }
    }
    if (foundOne) {
      break;
    }
  }
}

function scrollScreen() {
  if (p.y + u.h >= height) {
    copy(window, 0, 0, width-border*2, p.y, 0, -u.h, width-border*2, p.y);
    fill(col.bgnd);
    noStroke();
    rect(0, p.y - u.h, width-border*2, u.hMax);
    p.y = p.y - int(u.h);
  }
}

function clearSides() {
  fill(col.bgnd);
  noStroke();
  rect(0, 0, border, height);
  rect(width - border, 0, border, height);
  translate(border, 0);
}

// ----------------------------------------------------------
// PATTERN FUNCTIONS

function diagLine() {
  // STYLING
  stroke(col.s);
  strokeWeight(s.weight);
  strokeCap(s.cap);
  strokeJoin(s.join);
  noFill();

  // PATTERN
  choose.local = round(random(1));
  if (choose.local == 0) {
    line(p.x+s.off, p.y+s.off, p.x+u.w-s.off, p.y+u.h-s.off);
  } else {
    line(p.x+s.off, p.y+u.h-s.off, p.x+u.w-s.off, p.y+s.off);
  }
}

function triangleDraw() {
  choose.local = round(random(1));

  // STYLING
  if (choose.local < 2) {
    fill(col.f);
    noStroke();
  } else {
    noFill();
    stroke(col.s);
    strokeWeight(s.weight);
  }

  // PATTERN
  if (choose.local == 0) {
    triangle(p.x, p.y, p.x+u.w, p.y, p.x, p.y+u.h);
  } else if (choose.local == 1) {
    triangle(p.x+u.w, p.y, p.x+u.w, p.y+u.h, p.x, p.y+u.h);
  }
}

function circle() {
  local.choose = round(random(1));
  // Local VARIABLES
  var circleSize = 0;

  // STYLING
  var sChoose = round(random(1));
  if (sChoose == 0)
}
