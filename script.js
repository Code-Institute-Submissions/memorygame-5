const cards = document.querySelectorAll('.memory-card');

let debug=true;
let shuffleOn=true;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timeStart = "";
let matchCount= 0;
let totalGameMovesElement = document.getElementById('totalGameMoves');
let moves = document.getElementsByClassName('.moves');
let totalGameTimeElement = document.getElementById('totalGameTime');
let finalStarRatingElement = document.getElementById('finalStarRating');
let closeModalBtn = document.getElementById('closeModal');
let modal = document.getElementById('levelCompleteModal');
let movesCount = 0;
let closeBtn = document.getElementsByClassName('closeBtn')[0];
//if ((closeBtn) && (typeof closeModal === "function") ) 
//	closeBtn.addEventListener('click', closeModal());
//else
//	console.log("Could not add listener for element, it does not exist");
assignClickListner(closeModalBtn,closeModal);


//timer 
//let stopTimer = false;//need this for the timer and the reset 
let resetGame = true; //need this for game reset and modal 

let second = 0,
    minute = 0,
    hour = 0,
    interval,
    totalGameTime,
    starRating;

//Add Listners


cards.forEach(card => card.addEventListener('click', flipCard));

let resetBtn = document.getElementById('resetBtn')
resetBtn.addEventListener('click', resetPlay, false)



startNewGame()

function assignClickListner(element,func)
{
	if ((element) && (typeof func === "function") ) 
		element.addEventListener('click', func);
	else
	{
		if(element)
			console.log("Could not add listner, function does not exist");
		else
			console.log("Could not add listener for element " + element + " it does not exist");
	}
}

function flipCard()
{
  if (lockBoard)
    return;
  if (this === firstCard)
    return;

  this.classList.add('flip');
    console.log("Flippen heck");
  if (!hasFlippedCard)
  {
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
        log("game over")
     }
     else
     {
        log("Game continues... matchCount is:" + matchCount);
     }
 }
 else
 {
      unflipCards();
 }

 	log("Matched: " + isMatch);

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
if(shuffleOn)
{			
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
	log("random = " + randomPos);
        card.style.order = randomPos;

    });
}
}

