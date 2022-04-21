/**@type{HTMLCanvasElement} */
const title = document.getElementById("text");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
let headShot = new Image()
headShot.src = 'Vicky head shot.jpeg'
let particlesArray = [];
let photoParticlesArray = [];
let numberOfParticles = 150;
let numberOfPhotoParticles = 4;
let titleMeasurement = title.getBoundingClientRect();

let titleBox = {
  x: titleMeasurement.left,
  y: titleMeasurement.top,
  width: titleMeasurement.width,
  height: 10,
};

class PhotoParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 16 + 1;
    this.weight = Math.random() * .005 + .005;
    this.directionX = -2.2
    this.hue = Math.random() * 360 + 1;
  }
  update() {
    if (this.y > canvas.height) {
      this.y = 0;
      this.weight = Math.random() * 1 + 1;
      this.x = Math.random() * canvas.width * 1.2;
    }
    this.weight += 0.005;
    this.y += this.weight;
    this.x += this.directionX;

    if (this.x + (this.size + 100) > canvas.width || this.x < 0) {
      this.directionX *= -1;
    }
  }

  draw() {
    ctx.drawImage(headShot, this.x, this.y, 100, 100);
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 16 + 1;
    this.weight = Math.random() * 1 + 1;
    this.directionX = -2.2;
    this.hue = Math.random() * 360 + 1;
  }
  update() {
    if (this.y > canvas.height) {
      this.y = 0;
      this.weight = Math.random() * 1 + 1;
      this.x = Math.random() * canvas.width * 1.2;
    }
    this.weight += 0.05;
    this.y += this.weight;
    this.x += this.directionX;

    if (this.x > canvas.width || this.x < 0) {
      this.directionX *= -1;
    }

    //collision detection
    if (
      this.x < titleBox.x + titleBox.width &&
      this.x + this.size > titleBox.x &&
      this.y < titleBox.y + titleBox.height &&
      this.y + this.size > titleBox.y
    ) {
      this.y -= 3;
      this.weight *= -0.7;
    }
  }
  draw() {
    ctx.fillStyle = "hsl(" + this.hue + ", 50%, 50%)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particlesArray.push(new Particle(x, y));
  }
   photoParticlesArray = [];
   for (let i = 0; i < numberOfPhotoParticles; i++) {
     let x = Math.random() * canvas.width;
     let y = Math.random() * canvas.height;
     photoParticlesArray.push(new PhotoParticle(x, y));
   }
}

init();

function animate() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  for (let i = 0; i < photoParticlesArray.length; i++) {
    photoParticlesArray[i].update();
    photoParticlesArray[i].draw();
  }
  
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  titleMeasurement = title.getBoundingClientRect();

  titleBox = {
    x: titleMeasurement.left,
    y: titleMeasurement.top,
    width: titleMeasurement.width,
    height: 10,
  };
  init();
});
