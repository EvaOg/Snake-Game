const board = document.getElementById("gameBoard");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const description = document.getElementById("description-start");

let snake = [{ x: 10, y: 10 }];
let food = generateInt();

let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Create game board, snake, food
function draw() {
  board.innerHTML = "";
  createSnake();
  createFood();
  updateScore();
}

// Create snake
function createSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set position of snake/food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function createFood() {
  if (gameStarted) {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
  }
}

function generateInt() {
  const x = Math.floor(Math.random() * 20) + 1;
  const y = Math.floor(Math.random() * 20) + 1;
  return { x, y };
}

// Moving Snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateInt();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

function startGame() {
  gameStarted = true;
  description.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// Key event listener
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === "Space") ||
    (!gameStarted && event.key === " ")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}

function start() {
  if (!gameStarted) {
    startGame();
  }
}

document.addEventListener("keydown", handleKeyPress);

function increaseSpeed() {
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateInt();
  direction = "left";
  gameSpeedDelay = 200;
  updateScore();
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  logo.style.display = "block";
  description.style.display = "block";
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, "0");
}

function moveup() {
  direction = "up";
}

function movedown() {
  direction = "down";
}

function moveleft() {
  direction = "left";
}

function moveright() {
  direction = "right";
}
