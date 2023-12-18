"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let dice = Math.trunc(Math.random() * 6) + 1;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const swtichPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

btnRoll.addEventListener("click", function () {
  if (playing) {
    // roll the dice
    dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");
    // add number to current score if score != 1
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swtichPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    currentScore = 0;
    if (scores[activePlayer] < 10) {
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
      swtichPlayer();
    } else {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(".dice").classList.add("hidden");
    }
  }
});

btnNew.addEventListener("click", function () {
  playing = true;
  currentScore = 0;
  document.querySelector(".dice").classList.remove("hidden");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;
  activePlayer = 0;
  scores = [0, 0];
});
