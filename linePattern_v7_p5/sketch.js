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
  max: 0,
  local: 0
}

// Initializes all patterns
var patterns;

var a = {   // ARRAY
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

// ----------------------------------------------------------

function setup() {
  initPatterns();

  // INIT
  s.off = s.weight/2;
  s.cap = ROUND;
  s.join = ROUND;

  u.w = int(random(u.wMin, u.wMax));
  u.h = int(random(u.hMin, u.hMax));

  // INIT ARRAY
  for (var i=0; i<2; i++) {
    patterns[i].start = random(100000);
  }

  // SETTINGS
  createCanvas(800,800);
  frameRate(10);
  background(bgndColor);
}

// ----------------------------------------------------------

function draw() {
  // Assign noise to Array values
  setPatternNoise();

  // copy values from patterns in array
  var vArray = new Array(patterns.length);
  for (var i=0; i < patterns.length; i++) {
    vArray[i] = patterns[i].value;
  }
  var kArray = new Array(patterns.length);
  for (var i=0; i < patterns.length; i++) {
    kArray[i] = patterns[i].name;
  }

  // map noise to choose function
  choose.max = max(vArray);
  choose.main = map(noise(n.x.off), 0, 1, 0, choose.max);

  // clear sides with bgndColor and transform
  clearSides();

  // set Unit Width to random or until margin
  if (dist(p.x, p.y, width - border*2, p.y) > u.wMax) {
    u.w = round(random(u.wMin, u.wMax));
  } else {
    u.w = round(dist(p.x, p.y, width - border*2, p.y));
  }
  // console.log(vArray, kArray);
  var sorted = sort(vArray, [vArray.length]);
  console.log(vArray, kArray);
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
  patterns = [
    this[0] = {
      name: "diagLine", // used to execute the function
      value: 0,   // mapped noise value of the pattern
      start: 0    // start will be set to random(100000)
    },
    this[1] = {
      name: "triangleDraw", // used to execute the function
      value: 0, // mapped noise value of the pattern
      start: 0  // start will be set to random(100000)
    }
  ]
}

function chooseFunction() {
  for (var i=0; i < patterns.length; i++) {
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

function setPatternNoise() {
  for (var i=0; i<patterns.length; i++) {
    patterns[i].value = map(noise(n.y.off + patterns[i].start), 0, 1, 0, 100);
  }
}

function scrollScreen() {
  if (p.y + u.h >= height) {
    copy(this, 0, 0, width-border*2, p.y, 0, -u.h, width-border*2, p.y);
    fill(bgndColor);
    noStroke();
    rect(0 - border, p.y - u.h, width, u.hMax);
    p.y = p.y - int(u.h);
  }
}

function clearSides() {
  fill(bgndColor);
  noStroke();
  rect(0, 0, border, height);
  rect(width - border, 0, border, height);
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
    fill(f.color);
    noStroke();
  } else {
    noFill();
    stroke(s.color);
    strokeWeight(s.weight);
  }

  // PATTERN
  if (choose.local == 0) {
    triangle(p.x, p.y, p.x+u.w, p.y, p.x, p.y+u.h);
  } else if (choose.local == 1) {
    triangle(p.x+u.w, p.y, p.x+u.w, p.y+u.h, p.y, p.y+u.h);
  }
}
