"use strict";
p5.disableFriendlyErrors = true;

var border = 50;
var sWeight = 2;

var arcs = {
  space: null,
  diam: null
}

var col = {
  bgnd: 0,
  s: 255
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  arcs.diam = canvas.width / 10;
  arcs.space = canvas.width / 13;
  background(col.bgnd);
  frameRate(60);
  colorMode(RGB);
  noFill();
  stroke(col.s);
  strokeWeight(sWeight);
}

function draw() {
  background(col.bgnd);
  translate(arcs.diam/4, arcs.diam/4);

  var arcStart = radians(map(mouseX, 0, canvas.width, 0, 360));
  var arcStop = radians(map(mouseY, 0, canvas.height, 0, 360));

  if (arcStart < arcStop) {
    for (let x = border; x < canvas.width-border; x+=arcs.space) {
      for (let y = border; y < canvas.height-border; y+=arcs.space) {
        arc(x, y, arcs.diam, arcs.diam, arcStart, arcStop, OPEN);
      }
    }
  }
  if (arcStart > arcStop) {
    for (let x = border; x < canvas.width-border; x+=arcs.space) {
      for (let y = border; y < canvas.height-border; y+=arcs.space) {
        arc(x, y, arcs.diam, arcs.diam, arcStop, arcStart, OPEN);
      }
    }
  }
}

function windowResized() {
  setup();
}
