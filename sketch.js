var p;
var l = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new player();
}

function draw() {
  background(220);
  frameRate(60);
  for (var i = 1; i < l; i++) {
    renderPlayer(i);
  }
}

function player() { 
  this.pos = createVector(width / 2, height / 2);
  this.size = createVector(15, 12.5);
  this.dir = 0;
  this.y_R = 10;
  this.y_L = -10;
  this.x = 0;
  this.ad = 0;
  this.mode = 1;
  this.k = false;
  
  this.render = function(i) {
      fill(150);
      strokeWeight(0);
      if (i > l / 1.3) {
        //Head
          push();
            translate(this.pos.x, this.pos.y - (i * 10) / (l / 7));
            rotate(-this.dir);
            fill(255, 255, 0);
            rect(-this.size.x / 1.5, -this.size.y, this.size.x / 0.75, this.size.y * 2);
          pop();
        }
        if (i > l / 2.2 && i < l / 1.3) {
            //Torso
            push();
              translate(this.pos.x, this.pos.y - (i * 10) / (l / 7));
              rotate(-this.dir);
              fill(0, 0, 255)
              rect(-this.size.x / 2, -this.size.y, this.size.x, this.size.y * 2);
            pop();
              //Arm Right
            push();
              translate(this.pos.x - (this.x * (i / (l / 7))) + this.x * 5, this.pos.y + (this.y_L * (i / (l / 7))) - this.y_L * 5 - 50);
              rotate(-this.dir);
              fill(255, 255, 0);
              rect(-this.size.x / 2, -this.size.y / 2 - this.size.x * 1.25, this.size.x, this.size.y);
          pop();
            //Arm Left
          push();
              translate(this.pos.x + (this.x * (i / (l / 7))) - this.x * 5, this.pos.y - (this.y_R * (i / (l / 7))) + this.y_R * 5 - 50);
              rotate(-this.dir);
              fill(255, 255, 0);
              rect(-this.size.x / 2, -this.size.y / 2 + this.size.x * 1.25, this.size.x, this.size.y);
          pop();
      } if (i < l / 2.2) {
        //Leg Left
        push();
            translate(this.pos.x - (this.x * (i / (l / 7))) + this.x * 3, this.pos.y + (this.y_L * (i / (l / 7))) - this.y_L * 3 - 30);
            rotate(-this.dir);
            fill(0, 255, 0);
            rect(-this.size.x / 2, -this.size.y / 2 + this.size.y / 2, this.size.x, this.size.y);
        pop();
        //Leg Left
        push();
            translate(this.pos.x + (this.x * (i / (l / 7))) - this.x * 3, this.pos.y - (this.y_R * (i / (l / 7))) + this.y_R * 3 - 30);
            rotate(-this.dir);
            fill(0, 255, 0);
            rect(-this.size.x / 2, -this.size.y / 2 - this.size.y / 2, this.size.x, this.size.y);
        pop();
    }
  }
  
  this.keys = function() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW)) {
      this.k = true;
    } else {
      this.k = false;
    }
    if (keyIsDown(UP_ARROW)) {
      this.pos.x += 0.25 * cos(-this.dir - PI);
      this.pos.y += 0.25 * sin(-this.dir - PI);
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.dir += 0.005;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.dir -= 0.005;
    }
  }
  
  this.update = function() {
    if (this.ad >= 10) {
      this.mode = -1;
    }
    if (this.ad <= -10) {
      this.mode = 1;
    }
    if (this.k) {
      this.y_R = this.ad * sin(this.dir) + 8;
      this.y_L = this.ad * sin(-this.dir - PI) - 8;
      this.x = this.ad * cos(this.dir);
      this.ad += this.mode / 25;
    } else {
      this.ad = 0;
      this.y_R = 10;
      this.y_L = -10;
      this.mode = 1;
      this.x = 0;
    }
  }
}

function renderPlayer(i) {
  p.render(i);
  p.update();
  p.keys();
}

function mousePressed() {
  console.log(frameRate());
}