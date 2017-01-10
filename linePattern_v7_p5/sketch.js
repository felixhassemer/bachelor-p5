// VARIABLES
var unit = {
  uWmin: 10,
  uWmax: 140,
  uHmin: 10,
  uHmax: 160,
  uW: 0,
  uH: 0
}

var pos = {
  x: 0,
  y: 0,
}

var padding = 100;

var f = {   // fill
  color: 0,
};

var s = {   // stroke
  color: 0,
  weight: 3,
  off: 0,
  cap: 0,
  join: 0
}


function setup() {
  // INIT
  s.off = s.weight/2;
  s.cap = ROUND;
  s.join = ROUND;

  unit.uW = random(unit.uWmin, unit.uWmax);
  unit.uH = random(unit.uHmin, unit.uHmax);

  console.log(unit.uW, unit.uH);

  createCanvas(800,800);
  frameRate(25);
  background(0);
}

function draw() {

}
