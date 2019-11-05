let field = document.createElement('div');
let main = document.querySelector('.main');
field.classList.add('field')
main.appendChild(field);

for (let i = 1; i <= 100; i++) {
  let excel = document.createElement('div');
  excel.classList.add('excel');
  field.appendChild(excel);
}

let excel = document.getElementsByClassName('excel')
let x = 1;
let y = 10;

for (let i = 0; i < excel.length; i++) {

  if (x > 10) {
    x = 1;
    y--;
  }

  excel[i].setAttribute('posX', x);
  excel[i].setAttribute('posY', y);
  x++;
}

function generateSnake() {
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  let posY = Math.round(Math.random() * 9 + 1);
  return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [
    document.querySelector('[posX="' + coordinates[0] + '"][posY="' + coordinates[1] + '"]'),
    document.querySelector('[posX="' + (coordinates[0] - 1) + '"][posY="' + coordinates[1] + '"]'),
    document.querySelector('[posX="' + (coordinates[0] - 2) + '"][posY="' + coordinates[1] + '"]')
  ];

for (let i = 0; i < snakeBody.length; i++) {

  if (i == 0) {
    snakeBody[i].classList.add('head');
  }

  snakeBody[i].classList.add('snakebody');
}

let mouse;

function createMouse() {
  function generateMouse() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY]
  }

  let mouseCoordinates = generateMouse()
  mouse = document.querySelector('[posX="' + mouseCoordinates[0] + '"][posY="' + mouseCoordinates[1] + '"]');

  while (mouse.classList.contains('snakebody')) {
    let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX="' + mouseCoordinates[0] + '"][posY="' + mouseCoordinates[1] + '"]');
  }

  mouse.classList.add('mouse');
}

createMouse()

let direction = 'right';
let steps = false;

let input = document.querySelector('.main-input');
let score = 0;
input.value = `очки: ${score}`;

function move() {
  let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
  snakeBody[0].classList.remove('head');
  snakeBody[snakeBody.length - 1].classList.remove('snakebody');
  snakeBody.pop();

  if (direction == 'right') {
    if (snakeCoordinates[0] < 10) {
      snakeBody.unshift(document.querySelector('[posX="' + (+snakeCoordinates[0] + 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
    } else {
      snakeBody.unshift(document.querySelector('[posX="1"][posY="' + snakeCoordinates[1] + '"]'));
    }
  } else if (direction == 'left') {
    if (snakeCoordinates[0] > 1) {
      snakeBody.unshift(document.querySelector('[posX="' + (+snakeCoordinates[0] - 1) + '"][posY="' + snakeCoordinates[1] + '"]'));
    } else {
      snakeBody.unshift(document.querySelector('[posX="10"][posY="' + snakeCoordinates[1] + '"]'));
    }
  } else if (direction == 'up') {
    if (snakeCoordinates[1] < 10) {
      snakeBody.unshift(document.querySelector('[posX="' + snakeCoordinates[0] + '"][posY="' + (+snakeCoordinates[1] + 1) + '"]'));
    } else {
      snakeBody.unshift(document.querySelector('[posX="' + snakeCoordinates[0] + '"][posY="1"]'));
    }
  } else if (direction == 'down') {
    if (snakeCoordinates[1] > 1) {
      snakeBody.unshift(document.querySelector('[posX="' + snakeCoordinates[0] + '"][posY="' + (snakeCoordinates[1] - 1) + '"]'));
    } else {
      snakeBody.unshift(document.querySelector('[posX="' + snakeCoordinates[0] + '"][posY="10"]'));
    }
  }

  if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
    mouse.classList.remove('mouse');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
    createMouse();
    score++;
    input.value = `очки: ${score}`;
  }

  if (snakeBody[0].classList.contains('snakebody')) {
    alert('Игра окончена');
    clearInterval(interval);
  }

  snakeBody[0].classList.add('head');

  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakebody');
  }

  steps = true;
};

let interval = setInterval(move, 300)

window.addEventListener('keydown', function (evt) {
  if (steps == true) {
    if (evt.keyCode == 37 && direction != 'right') {
      direction = 'left';
      steps = false;
    }

    if (evt.keyCode == 38 && direction != 'down') {
      direction = 'up';
      steps = false;
    }

    if (evt.keyCode == 39 && direction != 'left') {
      direction = 'right';
      steps = false;
    }

    if (evt.keyCode == 40 && direction != 'up') {
      direction = 'down';
      steps = false;
    }
  }
});
