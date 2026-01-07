const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const xSize = 800;
const ySize = 600;

const squareX = 200;
const squareY = 150;

const bullets = [];
const enemies = [];

const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* ================= BULLET ================= */
class Bullet {
  static SIZE = 5;

  constructor(mouseX, mouseY) {
    this.x = squareX + 5;
    this.y = squareY + 5;

    const vx = mouseX - this.x;
    const vy = mouseY - this.y;
    const len = Math.hypot(vx, vy);

    this.dx = vx / len;
    this.dy = vy / len;
  }

  update() {
    this.x += this.dx * 5;
    this.y += this.dy * 5;
  }

  draw() {
    ctx.fillRect(this.x, this.y, Bullet.SIZE, Bullet.SIZE);
  }

  bounds() {
    return { x: this.x, y: this.y, w: Bullet.SIZE, h: Bullet.SIZE };
  }
}

/* ================= ENEMY ================= */
class Enemy {
  static SIZE = 10;
  static SPEED = 2;

  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.randomDirection();
  }

  randomDirection() {
    this.dx = rand(-Enemy.SPEED, Enemy.SPEED);
    this.dy = rand(-Enemy.SPEED, Enemy.SPEED);
    if (this.dx === 0 && this.dy === 0) this.dx = Enemy.SPEED;
  }

  update() {
    if (rand(0, 59) === 0) this.randomDirection();

    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > xSize - Enemy.SIZE) this.dx *= -1;
    if (this.y < 0 || this.y > ySize - Enemy.SIZE) this.dy *= -1;
  }

  draw() {
    ctx.fillRect(this.x, this.y, Enemy.SIZE, Enemy.SIZE);
  }

  bounds() {
    return { x: this.x, y: this.y, w: Enemy.SIZE, h: Enemy.SIZE };
  }
}

/* ================= COLLISION ================= */
function intersects(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

/* ================= SETUP ================= */
for (let i = 0; i < 10; i++) {
  enemies.push(
    new Enemy(
      rand(0, xSize - Enemy.SIZE),
      rand(0, ySize - Enemy.SIZE),
      i
    )
  );
}

/* ================= INPUT ================= */
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  bullets.push(new Bullet(mx, my));
});

/* ================= GAME LOOP ================= */
function update() {
  bullets.forEach((b) => b.update());
  enemies.forEach((e) => e.update());

  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (intersects(bullets[i].bounds(), enemies[j].bounds())) {
        console.log("*******COLLISION******* Enemy", enemies[j].id);
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        break;
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, xSize, ySize);

  // Player
  ctx.fillStyle = "blue";
  ctx.fillRect(squareX, squareY, 10, 10);

  // Bullets
  ctx.fillStyle = "red";
  bullets.forEach((b) => b.draw());

  // Enemies
  ctx.fillStyle = "yellow";
  enemies.forEach((e) => e.draw());
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
