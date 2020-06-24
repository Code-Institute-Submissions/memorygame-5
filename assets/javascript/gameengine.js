import * as debug from './debug.js';
import * as utils from './utils.js';
import {cards, imagesAllocation, subjectCollection} from './createboard.js'

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timeStart = "";
let matchCount = 0;
let resetGame = true;
let elaspedTime = 0;
let moves = document.getElementsByClassName('.moves');
let totalGameTimeElement = document.getElementById('totalGameTime');
let hintsUsed = 0;
let closeModalBtn = document.getElementById('closeModal');
let modal = document.getElementById('levelCompleteModal');
let maxHintsLevel = 0;
let movesCount = 0;

//MAIN GAME PLAY

//uses the level set in session storage to determine hints allowed per game
export function playGame() {
  let level = sessionStorage.getItem("level");
  debug.log("level" + level);
  if (level === "1") {
    maxHintsLevel = 1;
  } else if (level === "2") {
    maxHintsLevel = 2;
  } else if (level === "3") {
    maxHintsLevel = 3;
  } else {
    debug.log("Unknown Level [" + level + "]");
  }
  debug.log("maxhintslevel " + maxHintsLevel + " level [" + level + "]");

//Test to see if element defined 
  utils.validateElement(moves);

//Add Event Listners 
  utils.assignClickListner(closeModalBtn, closeModal);

  if (cards) {
    debug.log("Assigning Listner for " + cards.length + " cards");
    for (var i = 0; i < cards.length; i++) {

      debug.log("Assigning Lister for card " + cards[i]);
      cards[i].addEventListener('click', flipCard);
    }

  } else {
    utils.log("Cards not defined");

  utils.shuffleImages(imagesAllocation)
    };

}

//opens modal which explains all hints are used
function openHintsModal() {
  const hintsModal = document.getElementById('hintsModal');
  hintsModal.classList.add('show-modal');
}

//closes hints used modal
export function closeHintsModal() {
  const hintsModal = document.getElementById('hintsModal');
  hintsModal.classList.remove('show-modal');
}

// flashes cards for 600 milliseconds to give game player a hint
export function hint() {
  debug.log("Hint function:");
  hintsUsed++;
  debug.log("hints " + hintsUsed + " max hints " + maxHintsLevel);
  if (hintsUsed > maxHintsLevel) {
    openHintsModal();
  } else {
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].dataset.state === "unflipped")
        cards[i].classList.add('flip');

    }
    setTimeout(hide, 600)
  }

  // allows cards to flash for hint for certain length of time
  function hide() {

    for (var i = 0; i < cards.length; i++) {
      if (cards[i].dataset.state === "unflipped")
        cards[i].classList.remove('flip');

    }
  }
}

// flips cards to reveal image
function flipCard() {
  if (lockBoard)
    return;
  if (this === firstCard)
    return;

  this.classList.add('flip');
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    startTimer();

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
  addMove();
}

// checks to see if both images match
function checkForMatch() {
  let isMatch = (firstCard.dataset.framework === secondCard.dataset.framework);
  debug.log("Datasets first " + firstCard.parentElement + " second  " + secondCard.parentElement + " collection length" + subjectCollection.length);
  if (isMatch) {
    disableCards();
    matchCount = matchCount + 1
    if (matchCount >= (subjectCollection.length / 2)) {
      gameOver();
      debug.log("game over")
    } else {
      debug.log("Game continues... matchCount is:" + matchCount);
    }
  } else {
    unflipCardPair();
  }

  debug.log("Matched: " + isMatch);

}
// removes event listener from matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.dataset.state = "flipped";
  secondCard.dataset.state = "flipped";

  resetBoard();
}

function unflipCardPair() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// adds move to counter
function addMove() {
  movesCount++;
  debug.log(moves.innerHTML + " Adding " + movesCount + " to " + moves);
  document.querySelector(".moves").innerHTML = movesCount;

}

// GAME OVER
function gameOver() {

  //show modal on game end and stops timer
  openModal();
  stopTimer();

}

//closes game over modal and displays level options modal
export function levelOptionsModal() {
  closeModal();
  openLevelsModal();

}

// allows game over modal to be closed
function closeModal() {

  debug.log("Closing Model");
  modal.style.display = 'none'; 
  ;
}

// allows game over modal to be opened
function openModal() {
  modal.style.display = 'block'; 
  totalGameTimeElement.innerHTML = elaspedTime;
  totalGameMoves.innerHTML = movesCount + 1;
}

// game timer 
function startTimer() {
  if (resetGame == true) {
    let timer = 0;
    if (timeStart === "") {
      timeStart = setInterval(() => { 
        ++timer;
        var second = timer % 60;
        var minute = Math.floor(timer / 60);
        if (minute < 10) minute = '0' + minute;
        if (second < 10) second = '0' + second;
        elaspedTime = minute + ':' + second;
        if (elaspedTime != null) {
          document.querySelector(".timer").innerHTML = elaspedTime;
        }

      }, 1000);
    }
  }
}

// stops times to allow total game time to be read
function stopTimer() {
  clearInterval(timeStart); 
  timeStart = '';
}