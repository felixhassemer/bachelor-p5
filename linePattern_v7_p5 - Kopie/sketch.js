// VARIABELN
var choose = 0;
var rArray = [];
var foundOne;
var x = 0,
  y = 0;
var padding = 150;

// ARRAY
var patterns = {};
// FloatDict patterns;
var vArray = [];
var kArray = [];

// NOISE
var xoff = 0;
var yoff = 10000;
var incr = 0.05;
var yincr = 0.001;
var sineOff = 0;
var sineOffInc = 0.005;

// SINE
var sineAngle = 0;
var sineInc;
var scaleVal = 0;

// UNITS
var uWmin, uWmax;
var uHmin, uHmax;
var uW, uH;

// STYLING
var sColor, fColor, bgndColor;
var sWeight = 3,
  sOff = sWeight / 2; // used for offsetting strokes
var sCap, sJoin;

// ----------------------------------------------------------
// SETTINGS

function settings() {
  if (pdf.render) {
    createCanvas(1900, 1080); // , PDF, "linepattern_v7.pdf");
  } else {
    createCanvas(1200, 800);
    // fullScreen();
  }
}

// ----------------------------------------------------------
// SETUP

function setup() {
  // Initialize Variables
  uWmin = 10;
  uWmax = 140;
  uHmin = 10;
  uHmax = 160;
  sineInc = PI / 14;
  uW = round(random(uWmin, uWmax));
  uH = round(random(uHmin, uHmax));
  sColor = color(0);
  fColor = color(0);
  bgndColor = color(255);
  sCap = ROUND;
  sJoin = ROUND;

  background(bgndColor);
  frameRate(20);

  // FloatDict init
  // patterns = new FloatDict();
  var patterns = [];
  rArray = [100];
  for (var i = 0; i < rArray.length; i++) {
    rArray[i] = random(100000);
  }
}

// ---------------------------------------------------------
// DRAW

function draw() {
  // clear sides with background color
  clearSides();

  // RNG for patterns
  setPatternNoise();

  // set UnitWidth to random or until margin
  if (dist(x, y, width - padding * 2, y) > uWmax) {
    uW = round(random(uWmin, uWmax));
  } else {
    uW = dist(x, y, width - padding * 2, y);
  }

  // sorting Dictionary
  // patterns.sortValues();
  // vArray = patterns.valueArray();
  // kArray = patterns.keyArray();
  println(patterns[0]);
  // set maximum Range
  var chooseMax = max(vArray);
  // choose Random Number for chooseFunction
  choose = round(map(noise(xoff), 0, 1, 0, chooseMax));

  // choose function for keys in array
  chooseFunction();

  // Paragraph Overflow or move X
  if (x + uW > width - padding * 2 - 1) {
    // random Unitheight
    x = 0;
    y += uH;
    uH = round(random(uHmin, uHmax));
  } else {
    x += uW;
  }

  // NOISE increment
  xoff += incr;
  yoff += yincr;


  // SCROLL screencontent
  scrollScreen();

}

// ----------------------------------------------------------
// CORE FUNCTIONS


// search for function
function chooseFunction() {
  for (var i = 0; i < patterns.size(); i++) {
    var foundOne = false;
    if (choose < patterns[i].keyValue) {
      if (patterns[i].name == "cross") {
        cross();
        foundOne = true;
      } else if (patterns[i].name == "horizontLines") {
        horizontLines();
        foundOne = true;
      } else if (patterns[i].name == "triangleDraw") {
        triangleDraw();
        foundOne = true;
      } else if (patterns[i].name == "circle") {
        circle();
        foundOne = true;
      } else if (patterns[i].name == "diagLine") {
        diagLine();
        foundOne = true;
      } else if (patterns[i].name == "diagLine2") {
        diagLine2();
        foundOne = true;
      } else if (patterns[i].name == "curves") {
        curves();
        foundOne = true;
      } else if (patterns[i].name == "space") {
        space();
        foundOne = true;
      } else if (patterns[i].name == "lineFigures") {
        lineFigures();
        foundOne = true;
      } else if (patterns[i].name == "sineWave") {
        sineWave();
        foundOne = true;
      }
      // exit condition
      if (foundOne) {
        break;
      }
    }
  }
}


function setPatternNoise() {
  patterns[0] = {
    "name": "cross",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
  patterns[1] = {
    "name": "horizontLines",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
  patterns[2] = {
    "name": "triangleDraw",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
  patterns[3] = {
    "name": "circle",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
  patterns[4] = {
    "name": "diagLine",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
  patterns[5] = {
    "name": "diagLine2",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
  patterns[6] = {
    "name": "curves",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
  patterns[7] = {
    "name": "space",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
  patterns[8] = {
    "name": "lineFigures",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
  patterns[8] = {
    "name": "sineWave",
    "keyValue": map(random(1), 0, 1, 0, 100)
  }
}

function scrollScreen() {
  if (y + uH >= height) {
    copy(0, 0, width, y, 0, int(-uH), width, y);
    fill(bgndColor);
    noStroke();
    rect(0 - padding, y - uH, width, uHmax);
    y = y - int(uH);
  }
}

function clearSides() {
  fill(bgndColor);
  noStroke();
  rect(0, 0, padding, y);
  rect(width - padding, 0, padding, y);
  translate(padding, 0);
}

// ----------------------------------------------------------
// PATTERN FUNCTIONS

function diagLine() {
  // STYLING
  stroke(sColor);
  strokeWeight(sWeight);
  strokeCap(sCap);
  strokeJoin(sJoin);
  noFill();

  // PATTERN
  choose = round(random(1));
  if (choose == 0) {
    line(x, y + sOff, x + uW, y + uH - sOff);
  } else {
    line(x, y + uH - sOff, x + uW, y + sOff);
  }
}

function triangleDraw() {
  choose = round(random(1));

  // STYLING
  if (choose < 2) {
    fill(fColor);
    noStroke();
  } else {
    noFill();
    stroke(sColor);
    strokeWeight(sWeight);
  }

  // PATTERN
  if (choose == 0) {
    triangle(x, y, x + uW, y, x, y + uH);
  } else if (choose == 1) {
    triangle(x + uW, y, x + uW, y + uH, x, y + uH);
    // } else if (choose == 2) {
    //   unfilled shapes
    //   triangle(x, y, x+uW, y, x, y+uH);
    // } else if (choose == 3) {
    //   triangle(x+uW, y, x+uW, y+uH, x, y+uH);
  }
}

function curves() {
  choose = round(random(7));

  // STYLING
  if (choose < 4) {
    noFill();
    stroke(sColor);
    strokeWeight(sWeight);
    strokeCap(sCap);
    strokeJoin(sJoin);
  } else {
    fill(fColor);
    noStroke();
  }

  // PATTERN
  if (choose == 0) {
    bezier(x, y + uH / 2, // point 1 mid-left
      x + uW / 2, y + uH / 2, // handle 1
      x + uW / 2, y + uH - sOff, // handle 2
      x + uW, y + uH - sOff); // point 2 down-right
  } else if (choose == 1) {
    bezier(x + uW, y + uH / 2, // point 1 mid-right
      x + uW / 2, y + uH / 2, // handle 1
      x + uW / 2, y + uH - sOff, // handle 2
      x, y + uH - sOff); // point 2 down-left
  } else if (choose == 2) {
    bezier(x + uW, y + uH / 2, // point 1 mid-right
      x + uW / 2, y + uH / 2, // handle 1
      x + uW / 2, y + sOff, // handle 2
      x, y + sOff); // point 2 up-left
  } else if (choose == 3) {
    bezier(x + uW, y + uH / 2, // point 1 mid-right
      x + uW / 2, y + uH / 2, // handle 1
      x + uW / 2, y + sOff, // handle 2
      x, y + sOff); // point 2 up-left
  } else if (choose == 4) {
    // Filled shapes
    beginShape();
    vertex(x, y + uH / 2); // vertex 1 mid-left
    bezierVertex(x + uW / 2, y + uH / 2, // handle 1
      x + uW / 2, y + uH, // handle 2
      x + uW, y + uH); // vertex 2 down-right
    bezierVertex(x + uW, y + uH, // handle 1 (sharp)
      x, y + uH, // handle 2 (sharp)
      x, y + uH); // vertex 3 down-left
    endShape();
  } else if (choose == 5) {
    beginShape();
    vertex(x + uW, y + uH / 2); // vertex 1 mid-right
    bezierVertex(x + uW / 2, y + uH / 2, // handle 1
      x + uW / 2, y + uH, // handle 2
      x, y + uH); // vertex 2 down-left
    bezierVertex(x, y + uH, // handle 1 (sharp)
      x + uW, y + uH, // handle 2 (sharp)
      x + uW, y + uH); // vertex 3 down-left
    endShape();
  } else if (choose == 6) {
    beginShape();
    vertex(x + uW, y + uH / 2); // vertex 1 mid-right
    bezierVertex(x + uW / 2, y + uH / 2, // handle 1
      x + uW / 2, y, // handle 2
      x, y); // vertex 2 up-left
    bezierVertex(x, y, // handle 1 (sharp)
      x + uW, y, // handle 2 (sharp)
      x + uW, y); // vertex 3 up-right
    endShape();
  } else if (choose == 7) {
    beginShape();
    vertex(x, y + uH / 2); // vertex 1 mid-left
    bezierVertex(x + uW / 2, y + uH / 2, // handle 1
      x + uW / 2, y, // handle 2
      x + uW, y); // vertex 2 up-right
    bezierVertex(x + uW, y, // handle 1 (sharp)
      x, y, // handle 2 (sharp)
      x, y); // vertex 3 up-left
    endShape();
  }
}

function horizontLines() {
  // STYLING
  stroke(sColor);
  strokeWeight(sWeight);
  strokeCap(PROJECT);
  strokeJoin(sJoin);
  noFill();

  var lineMax = int(random(3, 6));
  // PATTERN
  choose = 0;
  if (choose == 0) {
    for (var i = 1; i <= lineMax; i++) {
      line(x + sOff, y + i * uH / (lineMax + 1), x + uW - sOff, y + i * uH / (lineMax + 1));
    }
  }
}

function sineWave() {
  // STYLING
  stroke(sColor);
  strokeWeight(sWeight);
  strokeCap(sCap);
  strokeJoin(sJoin);
  noFill();

  // PATTERN
  beginShape();
  for (var i = 0; i < uW; i++) {
    scaleVal = map(noise(sineOff + 60000), 0, 1, 0, uH / 2);
    sineInc = map(noise(sineOff), 0, 1, PI / 180, PI / 6);
    var tempY = uH / 2 + (sin(sineAngle) * scaleVal);
    vertex(x + i, y + tempY);
    // increment noise for sine
    sineAngle += sineInc;
    sineOff += sineOffInc;
  }
  endShape();
}

function diagLine2() {
  // STYLING
  stroke(sColor);
  strokeWeight(sWeight);
  strokeCap(sCap);
  strokeJoin(sJoin);
  noFill();

  // PATTERN
  choose = round(random(1));
  if (choose == 0) {
    beginShape();
    vertex(x, y + sOff);
    vertex(x + uW / 3, y + uH / 3);
    vertex(x + uW - uW / 3, y + uH / 3);
    vertex(x + uW, y + uH - sOff);
    endShape();
  } else if (choose == 1) {
    beginShape();
    vertex(x + uW, y + sOff);
    vertex(x + uW - uW / 3, y + uH - uH / 3);
    vertex(x + uW / 3, y + uH - uH / 3);
    vertex(x, y + uH - sOff);
    endShape();
  }
}

function cross() {
  choose = round(random(1));

  // STYLING
  stroke(sColor);
  strokeWeight(sWeight);
  strokeCap(sCap);
  strokeJoin(sJoin);
  noFill();

  // PATTERN
  if (choose == 0) {
    line(x + uW / 5, y + uH / 5, x + (uW - uW / 5), y + (uH - uH / 5));
    line(x + uW / 5, y + (uH - uH / 5), x + (uW - uW / 5), y + uH / 5);
  } else {
    line(x + uW / 2, y, x + uW / 2, y + uH);
    line(x, y + uH / 2, x + uW, y + uH / 2);
  }
}

function circle() {
  choose = round(random(1));
  // LOCAL VARIABLES
  var circleSize = 0;

  // STYLING
  var sChoose = round(random(1));
  if (sChoose == 0) {
    noStroke();
    fill(fColor);
  } else {
    noFill();
    stroke(sColor);
    strokeWeight(sWeight);
  }
  strokeCap(sCap);
  strokeJoin(sJoin);

  // PATTERN
  if (choose == 0) {
    if (uW < uH) {
      circleSize = random(uW / 8, uW);
    } else {
      circleSize = random(uH / 8, uH);
      ellipse(x + uW / 2, y + uH / 2, circleSize, circleSize);
    }
  } else {
    // set arc to 180 degrees
    var arcStart = radians(0);
    var arcEnd = radians(180);
    // Offset rotation
    var arcOffset = radians(map(int(random(8)), 0, 8, 0, 360));
    if (uW < uH) {
      circleSize = random(uW / 8, uW);
      arc(x + uW / 2, y + uH / 2, circleSize, circleSize, arcStart + arcOffset, arcEnd + arcOffset, PIE);
    } else {
      circleSize = random(uH / 8, uH);
      arc(x + uW / 2, y + uH / 2, circleSize, circleSize, arcStart + arcOffset, arcEnd + arcOffset, PIE);
    }
  }
}

function space() {}

function dotGrid() {
  // STYLING
  stroke(sColor);
  strokeWeight(sWeight);
  strokeCap(sCap);
  strokeJoin(sJoin);
  noFill();
  var dotDensity = int(random(3, 10));

  // Punktraster zeichnen
  for (var i = 1; i < dotDensity; i++) {
    for (var j = 1; j < dotDensity; j++) {
      point(x + (i * (uW / dotDensity)), y + (j * (uH / dotDensity)));
    }
  }
}

function lineFigures() {
  // VARIABLES
  var lnNumMin = 3;
  var lnNumMax = 7;
  var lnNumber = int(random(lnNumMin, lnNumMax));
  var xTemp, yTemp;
  // STYLING
  noFill();
  stroke(sColor);
  strokeWeight(sWeight);

  beginShape();
  for (var i = 0; i < lnNumber; i++) {
    var cycle = round(random(0, 1));
    if (cycle == 0) {
      // x = 0 or 100
      choose = round(random(0, 1));
      if (choose == 0) {
        xTemp = uW / 6;
      } else {
        xTemp = uW - uW / 6;
      }
      yTemp = round(random(uH));
    } else {
      // y = 0 or 100
      choose = round(random(0, 1));
      if (choose == 0) {
        yTemp = uH / 6;
      } else {
        yTemp = uH - uH / 6;
      }
      xTemp = round(random(uW));
    }
    // draw Points
    vertex(x + xTemp, y + yTemp);
  }
  endShape();
}