var xoff = 0;
var xstart = 0;
var xincr = 0.01;
var x = 0, y = 0;


function setup() {
  createCanvas(800, 800);
  frameRate(60);
  strokeWeight(3);
  stroke(255);
  noFill();
}

function draw() {
  background(0);
  xoff = xstart;
  for (let x=0; x<canvas.width; x++) {
    var y = (noise(xoff) * canvas.height);
    point(x, y);
    xoff += xincr;
  }
  xstart += xincr;


}
