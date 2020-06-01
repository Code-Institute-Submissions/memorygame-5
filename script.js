const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timeStart = "";
let matchCount= 0;
let totalGameMovesElement = document.getElementById('totalGameMoves');
let totalGameTimeElement = document.getElementById('totalGameTime');
let finalStarRatingElement = document.getElementById('finalStarRating');
let closeModalIcon = document.getElementById('closeModal');
let modal = document.getElementById('levelCompleteModal');


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
    console.log("Flippen heck");
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
  let isMatch = (firstCard.dataset.framework === secondCard.dataset.framework);

 if ( isMatch) 
 { 
     disableCards();
     matchCount = matchCount +1
     if(matchCount >= 6)
     {
        gameOver();
        console.log("game over")
     }
     else
     {
        console.log("Game continues... matchCount is:" + matchCount);
     }
 }
 else
 {
      unflipCards();
 }

 
  console.log("IS MATCH " + isMatch);
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

let second = 0,
    minute = 0,
    hour = 0,
    interval,
    totalGameTime,
    starRating;

function startTimer() {
    interval = setInterval(function(){
        let currentTime = `${minute} mins ${second} secs`;
        if(currentTime != null)
            timer.innerHTML = currentTime;
        second++;
        if(second == 60) {
            minute++;
            second = 0;
        }
        if(minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000)
}    




function gameOver() {
    //totalGameTime = timer.innerHTML;
    

    //show modal on game end
    openModal();
    
    //show totalGameTime, moves
   // if( totalGameTime != null)
        //totalGameTimeElement.innerHTML = totalGameTime;
    //if(moves != null)
        totalGameMovesElement.innerHTML = moves;
   

  //  matchedCards = [];
    closeModal();
}

function openModal() {
    modal.style.display = 'block'; // this is rendered as a block level element 
}

function closeModal() {
    closeModalIcon.addEventListener("click", function() {
        modalElement.classList.remove("show-modal");
        startGame();
    })
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
                let elaspedTime = minute + ':' + second;
                if(elaspedTime != null)
                {
                       // console.log("elapsedTime " + elaspedTime);
                        document.querySelector(".timer").innerHTML = elaspedTime;
                        //document.querySelector(".clock").innerHTML = elaspedTime;
                }

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

let resetBtn =
    document.getElementById('resetBtn')
resetBtn.addEventListener('click', resetPlay, false)


function resetPlay() {
    stopTimer();
    resetTimer();
    resetMoves();
    

}

function resetMoves() {
    const movesText = document.querySelector('moves');
    let moves = 0;
    movesText.innerHTML = moves;


}
cards.forEach(card => card.addEventListener('click', flipCard));
