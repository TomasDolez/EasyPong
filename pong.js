var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var paddle1 = {
  x: 50,
  y: 250,
  width: 20,
  height: 100,
  speed: 5
};

var paddle2 = {
  x: 730,
  y: 250,
  width: 20,
  height: 100,
  speed: 5
};

var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  dx: 5,
  dy: 5
};

function drawPaddle(paddle) {
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
}

function movePaddle(paddle, dy) {
  paddle.y += dy;
  if (paddle.y < 0) {
    paddle.y = 0;
  } else if (paddle.y + paddle.height > canvas.height) {
    paddle.y = canvas.height - paddle.height;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }
  if (ball.x + ball.radius > canvas.width) {
    ball.dx = -ball.dx;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  } else if (ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  }
}

function collisionDetection() {
  if (ball.x + ball.radius > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
    ball.dx = -ball.dx;
  } else if (ball.x - ball.radius < paddle1.x + paddle1.width && ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
    ball.dx = -ball.dx;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(paddle1);
  drawPaddle(paddle2);
  drawBall();
  moveBall();
  collisionDetection();
}

document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp") {
    movePaddle(paddle2, -paddle2.speed);
  } else if (event.code === "ArrowDown") {
    movePaddle(paddle2, paddle2.speed);
  } else if (event.code === "KeyW") {
    movePaddle(paddle1, -paddle1.speed);
  }
