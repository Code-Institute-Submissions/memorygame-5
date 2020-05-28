const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timeStart = "";
let matchCount = 0; 

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

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

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
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

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

    });
}

let moves = 0;

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;

}
if (hasFlippedCard.length === 2) {
    //checkForMatch(clickTarget);

}
//timer 
//let stopTimer = false;//need this for the timer and the reset 
let resetGame = true; //need this for game reset and modal 

let hour = 0;
let minute = 0;
let second = 0;

function restartGame() {
    if (timeStart) stopTimer();
    resetTimer();
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    shuffle();
    matchCount = 0;
    moves = 0;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
    aroo.play();
}
//restartBtn = document.getElementsByClassName("resetBtn");

// restartBtn.addEventListener('click', function(e) {
// });
//     restartBtn = document.getElementsByClassName("resetBtn");
function startTimer() {
    if (resetGame == true) {
        let timer = 0;
        if (timeStart === "") {
            timeStart = setInterval(() => { //8-30 if i use => timer works, change it per https://www.w3schools.com/js/js_timing.asp it acts like it wants to start but doesnt
                ++timer;
                second = timer % 60;
                minute = Math.floor(timer / 60);
                if (minute < 10) minute = '0' + minute;
                if (second < 10) second = '0' + second;
                //hour = Math.floor(timer / 3600);
                //minute = Math.floor((timer - hour * 3600) / 60);
                //second = timer - hour * 3600 - minute * 60;
                //if (hour < 10) hour = '0' + hour;
                //if (minute < 10) minute = '0' + second;
                document.querySelector(".timer").innerHTML = minute + ':' + second;
                document.querySelector(".clock").innerHTML = minute + ':' + second;
            }, 1000);
        }
    }
}

function resetTimer() {
    document.querySelector(".timer").innerHTML = '00:00';
    [hour, minute, second] = [0, 0, 0];
}

function stopTimer() {
    clearInterval(timeStart); //clearInterval needs to use the variable from the setInterval 
    timeStart = '';
}
cards.forEach(card => card.addEventListener('click', flipCard));
