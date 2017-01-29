var x=0, y=0;

function setup() {
  createCanvas(800, 800);
  background(0);
  frameRate(60);
  strokeWeight(3);

}

function draw() {
  stroke(255);
  noFill();

  y = floor(random(height));
  point(x, y);
  if (x < canvas.width) {
    x++;
  } else {
    copy(window, 0, 0, canvas.width, canvas.height, -1, 0, canvas.width, canvas.height);
    fill(0);
    noStroke();
    rect(canvas.width-1, 0, 10, canvas.height);
    x = canvas.width-1;
  }
}
