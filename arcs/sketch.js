var border = 300;
var sWeight = 10;

var arcs = {
  space: null,
  diam: null
}

var w = {
  width: 4200,
  height: 4200
}

var col = {
  bgnd: 0,
  s: 255
}


function setup() {
  arcs.diam = w.width / 10;
  arcs.space = w.width / 13;
  // createCanvas(windowWidth, windowHeight);
  // background(153, 37, 68);
  createCanvas(w.width, w.height);
  background(col.bgnd);
  frameRate(60);
  colorMode(RGB);
  noFill();
  stroke(col.s);
  // stroke(47, 214, 169);
  strokeWeight(sWeight);
}

function draw() {
  background(col.bgnd);

  var arcStart = radians(map(mouseX, 0, w.width, 0, 360));
  var arcStop = radians(map(mouseY, 0, w.height, 0, 360));

  if (arcStart < arcStop) {
    for (let x = border; x < w.width-border; x+=arcs.space) {
      for (let y = border; y < w.height-border; y+=arcs.space) {
        arc(x, y, arcs.diam, arcs.diam, arcStart, arcStop, OPEN);
      }
    }
  }
  if (arcStart > arcStop) {
    for (let x = border; x < w.width-border; x+=arcs.space) {
      for (let y = border; y < w.height-border; y+=arcs.space) {
        arc(x, y, arcs.diam, arcs.diam, arcStop, arcStart, OPEN);
      }
    }
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyTyped() {
  if (key === 's') {
    saveCanvas('floweroflife', 'png');
  }
}
