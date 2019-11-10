const field = document.createElement(`div`);
const main = document.querySelector(`.main`);
const scoreInput = document.querySelector(`.main-input`);
const startButtons = document.querySelectorAll(`[data-level]`);
const modal = document.querySelector(`.modal--start`);
const modalRestart = document.querySelector(`.modal--again`);
const modalCount = document.querySelector(`.modal__count`);
const restartButton = document.querySelector(`[data-restart]`);

const cellQuantity = 100;
let score = 0;
let isStart = false;
let direction;
let steps;
let speed;
let interval;
let snakeBody;
let mouse;
let x;
let y
let KeyCode = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

function init() {
  for (let i = 0; i < startButtons.length; i++ ) {
    startButtons[i].addEventListener(`click`, (evt) => {
      speed = startButtons[i].dataset.level;
      isStart = true;
      startGame();
    })
  };
}

init();

function startGame() {
  if (isStart) {
  snakeBody = null;
  modal.classList.add(`hidden`);
  scoreInput.value = `очки: ${score}`;
  field.classList.add(`field`);
  main.appendChild(field);
  x = 1;
  y = 10;  
  direction = 'right';
  steps = false;
  createField();
  createSnake();
  createMouse();
  interval = setInterval(move, speed);
  snakeControl();
  }
}

function restartGame() {
  modalRestart.classList.add(`hidden`);
  modal.classList.remove(`hidden`);
  score = 0;
  scoreInput.value = score;
  restartButton.removeEventListener(`click`, restartGame);
}

function createField() {
  for (let i = 1; i <= cellQuantity; i++) {
    let cell = document.createElement(`div`);
    cell.classList.add(`excel`);
    field.appendChild(cell);
  };

  let excel = document.getElementsByClassName(`excel`);


  for (let i = 0; i < excel.length; i++) {
    if (x > 10) {
      x = 1;
      y--;
    }

    excel[i].setAttribute(`posX`, x);
    excel[i].setAttribute(`posY`, y);
    x++;
  }
}

function generateSnake() {
  let posX = Math.round(Math.random() * 7 + 3);
  let posY = Math.round(Math.random() * 9 + 1);
  return [posX, posY];
}

function createSnake() {

  let coordinates = generateSnake();
  snakeBody = [
    document.querySelector(`[posX="${coordinates[0]}"][posY="${coordinates[1]}"]`),
    document.querySelector(`[posX="${coordinates[0] - 1}"][posY="${coordinates[1]}"]`),
    document.querySelector(`[posX="${coordinates[0] - 2}"][posY="${coordinates[1]}"]`)
  ];

  for (let i = 0; i < snakeBody.length; i++) {
    if (i === 0) {
      snakeBody[i].classList.add(`head`);
    }
    snakeBody[i].classList.add(`snakebody`);
  }
}

function createMouse() {
  function generateMouse() {
    let posX = Math.round(Math.random() * 7 + 3);
    let posY = Math.round(Math.random() * 9 + 1);
    return [posX, posY];
  }

  let mouseCoordinates = generateMouse();
  mouse = document.querySelector(`[posX="${mouseCoordinates[0]}"][posY="${mouseCoordinates[1]}"]`);

  while (mouse.classList.contains(`snakebody`)) {
    let mouseCoordinates = generateMouse();
    mouse = document.querySelector(`[posX="${mouseCoordinates[0]}"][posY="${mouseCoordinates[1]}"]`);
  }

  mouse.classList.add(`mouse`);
}

function move() {
  let snakeCoordinates = [snakeBody[0].getAttribute(`posX`), snakeBody[0].getAttribute(`posY`)];
  snakeBody[0].classList.remove(`head`);
  snakeBody[snakeBody.length - 1].classList.remove(`snakebody`);
  snakeBody.pop();

  if (direction === `right`) {
    if (snakeCoordinates[0] < 10) {
      snakeBody.unshift(document.querySelector(`[posX="${(+snakeCoordinates[0] + 1)}"][posY="${snakeCoordinates[1]}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX="1"][posY="${snakeCoordinates[1]}"]`));
    }
  } else if (direction === `left`) {
    if (snakeCoordinates[0] > 1) {
      snakeBody.unshift(document.querySelector(`[posX="${(+snakeCoordinates[0] - 1)}"][posY="${snakeCoordinates[1]}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX="10"][posY="${snakeCoordinates[1]}"]`));
    }
  } else if (direction === `up`) {
    if (snakeCoordinates[1] < 10) {
      snakeBody.unshift(document.querySelector(`[posX="${snakeCoordinates[0]}"][posY="${(+snakeCoordinates[1] + 1)}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX="${snakeCoordinates[0]}"][posY="1"]`));
    }
  } else if (direction === `down`) {
    if (snakeCoordinates[1] > 1) {
      snakeBody.unshift(document.querySelector(`[posX="${snakeCoordinates[0]}"][posY="${(snakeCoordinates[1] - 1)}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX="${snakeCoordinates[0]}"][posY="10"]`));
    }
  }

  if (snakeBody[0].getAttribute(`posX`) === mouse.getAttribute(`posX`) && 
  snakeBody[0].getAttribute(`posY`) === mouse.getAttribute(`posY`)) {
    mouse.classList.remove(`mouse`);
    createMouse();

    let a = snakeBody[snakeBody.length - 1].getAttribute(`posX`);
    let b = snakeBody[snakeBody.length - 1].getAttribute(`posY`);
    snakeBody.push(document.querySelector(`[posX = "${a}"][posY = "${b}"]`));
  
    score++;
    scoreInput.value = `очки: ${score}`;
  }

  if (snakeBody[0].classList.contains(`snakebody`)) {
    isStart = false;
    modalRestart.classList.remove(`hidden`);
    modalCount.textContent = score;
    clearInterval(interval);
    main.innerHTML = ``;
    field.innerHTML = ``;
    restartButton.addEventListener(`click`, restartGame);
    return
  }

  snakeBody[0].classList.add(`head`);

  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add(`snakebody`);
  }

  steps = true;
}

function snakeControl() {
  document.addEventListener(`keydown`, function (evt) {
    if (steps === true) {
      if (evt.keyCode === KeyCode.left && direction !== `right`) {
        direction = `left`;
        steps = false;
      }
  
      if (evt.keyCode == KeyCode.up && direction != 'down') {
        direction = 'up';
        steps = false;
      }
  
      if (evt.keyCode == KeyCode.right && direction != 'left') {
        direction = 'right';
        steps = false;
      }
  
      if (evt.keyCode == KeyCode.down && direction != 'up') {
        direction = 'down';
        steps = false;
      }
    }
  });
}
