'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNewEl = document.querySelector('.btn--new');
const btnRollDiceEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

// Start conditions
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // 2. Set player 1 as start player
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const swichPlayer = () => {
  let currentActivePlayerEl = document.getElementById(
    `current--${activePlayer}`
  );
  currentActivePlayerEl.textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// user rolls the dice
btnRollDiceEl.addEventListener('click', () => {
  if (playing) {
    // 1. generate random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice roll
    diceEl.src = `dice-${diceNumber}.png`;
    diceEl.classList.remove('hidden');

    // 3. check if rolled number is 1 and if true switch to another user
    if (diceNumber !== 1) {
      // Add dice to current score
      currentScore += diceNumber;

      let currentActivePlayerEl = document.getElementById(
        `current--${activePlayer}`
      );
      currentActivePlayerEl.textContent = currentScore;
    } else {
      // Swich to next player
      swichPlayer();
    }
  }
});

btnHoldEl.addEventListener('click', () => {
  if (currentScore !== 0 && playing) {
    // 1. add current score to active player
    scores[activePlayer] += currentScore;

    let activePlayerScoreEl = document.getElementById(`score--${activePlayer}`);
    activePlayerScoreEl.textContent = scores[activePlayer];

    currentScore = 0;

    // 2. Check if active player score is > 100
    if (scores[activePlayer] >= 100) {
      //FINISH THE GAME
      playing = false;
      let playerEl = document.querySelector(`.player--${activePlayer}`);
      playerEl.classList.add('player--winner');
      playerEl.classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // 3. If false swich player
      swichPlayer();
    }
  }
});

btnNewEl.addEventListener('click', init);
