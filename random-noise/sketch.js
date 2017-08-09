"use strict";
p5.disableFriendlyErrors = true;


var xR=0, yR=0;
var xN=0, yN=0;
var xOff = 0;
var start = 0;
var xincr = 0.02;
var pDist = 3;

var c = {
  width: 800,
  height: 800
}

var col = {
  bgnd: 235,
  f: 235,
  s: 0
}


function setup() {
  createCanvas(c.width, c.height);
  frameRate(30);
  strokeWeight(4);
  stroke(col.s);
  noFill();
  background(col.bgnd);
}

function draw() {
  graphNoise();
}



function graphNoise() {
  noStroke();
  fill(col.f);
  rect(c.width/2, 0, c.width/2, c.height);

  noFill();
  stroke(col.s);

  xOff = start;
  for (xN=canvas.width/2+2; xN<canvas.width; xN+=pDist) {
    yN = floor(noise(xOff) * canvas.height);
    point(xN, yN);
    xOff += xincr;
  }
  start += xincr;
}
