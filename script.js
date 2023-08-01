const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ball variables
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Paddle variables
const paddleHeight = 100;
const paddleWidth = 10;
const leftPaddleY = canvas.height / 2 - paddleHeight / 2;
const rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let leftPaddleYPos = leftPaddleY;
let rightPaddleYPos = rightPaddleY;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw left paddle
    drawRect(10, leftPaddleYPos, paddleWidth, paddleHeight, "#000");

    // Draw right paddle
    drawRect(canvas.width - paddleWidth - 10, rightPaddleYPos, paddleWidth, paddleHeight, "#000");

    // Draw the ball
    drawCircle(ballX, ballY, 10, "#000");

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= 20 && ballY > leftPaddleYPos && ballY < leftPaddleYPos + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= canvas.width - 20 && ballY > rightPaddleYPos && ballY < rightPaddleYPos + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // AI movement (right paddle)
    rightPaddleYPos = ballY - paddleHeight / 2;

    requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", function (e) {
    // Player movement (left paddle)
    const mousePos = e.clientY - canvas.getBoundingClientRect().top - paddleHeight / 2;
    leftPaddleYPos = Math.min(Math.max(0, mousePos), canvas.height - paddleHeight);
});

draw();
