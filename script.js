/**@type{HTMLCanvasElement} */
const title = document.getElementById("text");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
let numberOfParticles = 150;
let titleMeasurement = title.getBoundingClientRect();
console.log(titleMeasurement);

let titleBox = {
  x: titleMeasurement.left,
  y: titleMeasurement.top,
  width: titleMeasurement.width,
  height: 10,
};

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
}
init();
function connect() {
  // let hue = Math.floor(Math.random()* 360 + 1) * .4;
  for (let a = 0; a < particlesArray.length; a++) {
    const particle = particlesArray[a];

    for (let b = a + 1; b < particlesArray.length; b++) {
      const other = particlesArray[b];

      let dx = particle.x - other.x;
      let dy = particle.y - other.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 90) {
        ctx.strokeStyle = 'hsl(278, 50%, 50%)'
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
        ctx.closePath;
      }
    }
  }
}

function animate() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  connect();
  ctx.fillRect(titleBox.x, titleBox.y, titleBox.width, titleBox.height);
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
