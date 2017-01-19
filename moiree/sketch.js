var i = 1;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(1);
}

function draw() {
  background(0);

  // load Pixelarray
  loadPixels();
  if (i < 1000) {
    i ++;
    for (let j=0; j<1000*1000; j+=i) {
      pixels[i] = color(255);
    }
  }
  updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
