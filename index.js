'use strict';

// ÚKOL 4

// 4
let playerTurn = 'circle';

//5
const hracElm = document.querySelector('#hrac');
const fields = document.querySelectorAll('.board__field');

const playerChange = () => {
  if (playerTurn === 'circle') {
    playerTurn = 'cross';
    hracElm.src = 'cross.svg';
  } else {
    playerTurn = 'circle';
    hracElm.src = 'circle.svg';
  }
};

fields.forEach((field) => {
  field.addEventListener('click', (e) => {
    if (
      !e.target.classList.contains('board__field--circle') &&
      !e.target.classList.contains('board__field--cross')
    ) {
      if (playerTurn === 'circle') {
        e.target.classList.add('board__field--circle');
      } else {
        e.target.classList.add('board__field--cross');
      }
      e.target.setAttribute('disabled', '');
      playerChange();
      isWinningMove(e.target);
      if (isWinningMove(e.target) === true) {
        if (getSymbol(e.target) === 'circle') {
          setTimeout(() => {
            winner('Gratulujeme! Vítězem je kolečko. Nová hra?');
          }, 150);
        } else if (getSymbol(e.target) === 'cross') {
          setTimeout(() => {
            winner('Gratulujeme! Vítězem je křížek. Nová hra?');
          }, 150);
        }
      }
    }
  });
});

// ÚKOL 5

// 3 i

const boardSize = 10; // 10x10

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

// 3 ii

const getField = (row, column) => fields[row * boardSize + column];

// 3 iii

const getSymbol = (field) => {
  // Název třídy přizpůsob tvému kódu.
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

// 4 i

const symbolsToWin = 5;

const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko

  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;

  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  // Diagonála

  let y;
  let diagonalUpLeft = 1;

  // koukni nahoru a doleva:
  i = origin.row;
  y = origin.column;

  while (i > 0 && y > 0 && symbol === getSymbol(getField(i - 1, y - 1))) {
    diagonalUpLeft++;
    i--;
    y--;
  }

  // koukni dolů a doprava:
  i = origin.row;
  y = origin.column;
  while (
    i < boardSize - 1 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, y + 1))
  ) {
    diagonalUpLeft++;
    i++;
    y++;
  }

  if (diagonalUpLeft >= symbolsToWin) {
    return true;
  }

  let diagonalUpRight = 1;

  // koukni nahoru a doprava:
  i = origin.row;
  y = origin.column;

  while (
    i > 0 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(i - 1, y + 1))
  ) {
    diagonalUpRight++;
    i--;
    y++;
  }

  // koukni dolů a doleva:
  i = origin.row;
  y = origin.column;
  while (
    i < boardSize - 1 &&
    y > 0 &&
    symbol === getSymbol(getField(i + 1, y - 1))
  ) {
    diagonalUpRight++;
    i++;
    y--;
  }

  if (diagonalUpRight >= symbolsToWin) {
    return true;
  }

  return false;
};

const winner = (message) => {
  let yes = confirm(message);
  if (yes === true) {
    location.reload();
  }
};
