"use strict";

var xR=0, yR=0;
var xN=0, yN=0;
var xOff = 0;
var start = 0;
var xincr = 0.02;
var pDist = 3;



function setup() {
  createCanvas(800, 400);
  frameRate(30);
  strokeWeight(3);
  stroke(255);
  noFill();
  background(0);
}

function draw() {
  graphNoise();
  graphRandom();
}

function graphRandom() {
  stroke(255);
  noFill();

  yR = floor(random(canvas.height));
  point(xR, yR);
  if (xR < canvas.width/2) {
    xR+=pDist;
  } else {
    copy(window, 0, 0, canvas.width/2, canvas.height, -pDist, 0, canvas.width/2, canvas.height);
    fill(0);
    noStroke();
    rect(canvas.width/2-pDist, 0, pDist, canvas.height);
    xR = canvas.width/2-pDist;
  }
}

function graphNoise() {
  noStroke();
  fill(0);
  rect(canvas.width/2, 0, canvas.width/2, canvas.height);

  noFill();
  stroke(255);

  xOff = start;
  for (xN=canvas.width/2+2; xN<canvas.width; xN+=pDist) {
    yN = noise(xOff) * canvas.height;
    point(xN, yN);
    xOff += xincr;
  }
  start += xincr;
}
