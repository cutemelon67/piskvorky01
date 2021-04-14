'use strict';

// 4
let playerTurn = 'circle';

//5
const hracElm = document.querySelector('#hrac');
const btnElm = document.querySelectorAll('.board__field');

const playerChange = () => {
  if (playerTurn === 'circle') {
    playerTurn = 'cross';
    hracElm.src = 'cross.svg';
  } else {
    playerTurn = 'circle';
    hracElm.src = 'circle.svg';
  }
};

btnElm.forEach((field) => {
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
    }
  });
});

//btnElm.addEventListener ('click', (e) => {

//})

/*

document.querySelectorAll('button').forEach((element) => {
  element.addEventListener('click', (e) => {
    console.log(element);
  });
});

*/
