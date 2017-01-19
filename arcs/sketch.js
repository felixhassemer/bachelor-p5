var border = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(153, 37, 68);
  frameRate(60);
  colorMode(RGB);
  noFill();
  stroke(59, 181, 155);
  strokeWeight(3);
}

function draw() {
  background(153, 37, 68);
  var arcStart = radians(map(mouseX, 0, windowWidth, 0, 360));
  var arcStop = radians(map(mouseY, 0, windowHeight, 0, 360));
  for (let x = border; x < windowWidth-border; x+=100) {
    for (let y = border; y < windowHeight-border; y+=100) {
      arc(x, y, 130, 130, arcStart, arcStop, OPEN);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
