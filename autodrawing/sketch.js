"use strict";
p5.disableFriendlyErrors = true;


// global

var saveCount = 0;
var fileType = "png";

// CANVAS
var canv = {
  custom: false,
  width: 3000,
  height: 3000
}

// p is Position
var p = {
  x: null,
  y: null
}

var target = {
  x: null,
  y: null
}

var col = {
  bgnd: 0,
  f: 0,
  s: 255
}

// b is border
var b = {
  w: null,
  h: null
}

var style = {
  sWeight: null,
  rEdge: 5,
  toggle: false
}

var easing = 0.02;

// ----------------------------------------------------------

function setup() {
  if (!canv.custom) {
    if (windowWidth < windowHeight) {
      canv.height = windowWidth-windowWidth/8;
      canv.width = canv.height;
    } else {
      canv.width = windowHeight-windowHeight/8;
      canv.height = canv.width;
    }
  }

  createCanvas(canv.width, canv.height);

  // Initialize Variables
  style.sWeight = round(canv.width/600);
  b.w = canv.width/30;
  b.h = canv.height/30;
  target.x = canv.width/2;
  target.y = canv.height/2;
  p.x = canv.width/2;
  p.y = canv.height/2;


  background(col.bgnd);
  frameRate(60);
  strokeWeight(style.sWeight);
  stroke(col.s);
  fill(col.f);
  rectMode(CENTER);
}

// ----------------------------------------------------------

function draw() {
  if (frameCount % 60 == 1) {
    target.x = random(canv.width-b.w*2) + b.w;
    target.y = random(canv.height-b.h*2) + b.h;
  }

  var dx = target.x - p.x;
  p.x += dx * easing;

  var dy = target.y - p.y;
  p.y += dy * easing;

  // toggle ellipse or rectangle shape
  if (style.toggle) {
    ellipse(p.x, p.y, winMouseX/10, winMouseY/10);
  } else {
    rect(p.x, p.y, winMouseX/10, winMouseY/10);
  }
}

// ----------------------------------------------------------

function mouseClicked() {
  style.toggle = !style.toggle;
}

function keyPressed() {
  if (keyCode == 32) {
    background(col.bgnd);
  }
}

function keyTyped() {
  if (key === 's') {
    saveCount ++;
    var fileName = "autodrawing-" + saveCount;
    console.log(fileName);
    saveCanvas(fileName, fileType);
  }
}

function windowResized() {
  if (!canv.custom) {
    if (windowWidth < windowHeight) {
      canv.height = windowWidth-windowWidth/8;
      canv.width = canv.height;
    } else {
      canv.width = windowHeight-windowHeight/8;
      canv.height = canv.width;
    }
    resizeCanvas(canv.width, canv.height);
    background(col.bgnd);

    // Initialize Variables
    style.sWeight = round(canv.width/600);
    b.w = canv.width/30;
    b.h = canv.height/30;
    target.x = canv.width/2;
    target.y = canv.height/2;
    p.x = canv.width/2;
    p.y = canv.height/2;
  }
}
