"use strict";

// global
// line variables
var ln = {
  min: 3,
  max: 7,
  num: 0
}

var x, y;
var cycle;
var choose;

var grid = {
  x: 0,
  y: 0,
  size: 0,
  num: 3
}

// c is Canvas
var c = {
  width: 600,
  height: 600
}

// color variables
var col = {
  bgnd: 0,
  f: 0,
  s: 255
}

function setup() {
  // make canvas square
  if (windowWidth < windowHeight) {
    c.height = windowWidth-windowWidth/5;
    c.width = c.height;
  } else {
    c.width = windowHeight-windowHeight/5;
    c.height = c.width;
  }
  createCanvas(c.width, c.height);
  grid.size = canvas.width / grid.num;
  frameRate(1);
  background(col.bgnd);
  noFill();
  stroke(col.s);
  strokeWeight(3);
  strokeJoin(ROUND);
}

function draw() {
  translate(grid.size/4, grid.size/4);
  background(col.bgnd);

  // draw the linefigures
  for (grid.x=0; grid.x < c.width; grid.x += grid.size) {
    for (grid.y=0; grid.y < c.height; grid.y += grid.size) {
      beginShape();
      ln.num = int(random(ln.min, ln.max));

      for (let i=0; i < ln.num; i++) {
        cycle = round(random(0, 1));
        if (cycle == 0) {
          // make x either 0 or 100
          choose = round(random(0, 1));
          if (choose == 0) {
            x = 0;
          } else {
            x = 100;
          }
          y = round(random(100));
        } else {
          // make y either 0 or 100
          choose = round(random(0, 1));
          if (choose == 0) {
            y = 0;
          } else {
            y = 100;
          }
          x = round(random(100));
        }
        // draw the vertices
        vertex(grid.x + x, grid.y + y);
      }

      endShape();

      // draw circle
      fill(col.f);
      var circleSize = round(random(15, 50));
      ellipse(grid.x + random(25, 75), grid.y + random(25, 75), circleSize, circleSize);
      noFill();
    }
  }
}

function windowResized() {
  // make canvas square
  if (windowWidth < windowHeight) {
    c.height = windowWidth-windowWidth/5;
    c.width = c.height;
  } else {
    c.width = windowHeight-windowHeight/5;
    c.height = c.width;
  }
  resizeCanvas(c.width, c.height);
  background(col.bgnd);
}
