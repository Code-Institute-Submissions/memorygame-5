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
assignClickListner(resetBtn,resetPlay);

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

if(cards)
	cards.forEach(card => card.addEventListener('click', flipCard));
else
	log("Cards not defined");






initGame()

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

function assignPictures()
{
	var img = document.getElementsByTagName("img");
	var imgSrcs = [];
	let images = [];

	for (var i = 0; i < img.length; i++) {
		imgSrcs.push(img[i].src);
		log(img[i].src);
		//img[i].src = "http://192.168.1.15/img/pug.png"
	}

	for (var i = 1; i < 13; i++) {
		images.push(document.getElementById("img" + i));
		log("Image id = " + images[i-1].src);
	}
	
	//return imgSrcs;

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

(function shuffle() {
  assignPictures();
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    log("Assigning values to cards: " + randomPos);	
  });
})();



function addMove() {
    movesCount++;
    moves.innerHTML = movesCount;

}


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


function log(textToLog)
{
	if(debug)
		console.log(textToLog);
}

function initGame()
{
	
	hasFlippedCard = false;
	lockBoard = false;
	timeStart = "";
	matchCount= 0;
	moves=0;
	resetPlay();
	log("Staring new Game");
}

function gameOver() {
    //totalGameTime = timer.innerHTML;
    

    //show modal on game end
    openModal();
    
    //show totalGameTime, moves
   // if( totalGameTime != null)
        //totalGameTimeElement.innerHTML = totalGameTime;
    //if(moves != null)
        totalGameMovesElement.innerHTML = movesCount;
   

  //  matchedCards = [];
    //closeModal();
}


function closeModal() {
	log("Closing Model");
    	modal.style.display = 'none'; //element will not be displayed 
	initGame();
}


function openModal() {
    modal.style.display = 'block'; // this is rendered as a block level element 
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




function resetPlay() {
    stopTimer();
    resetTimer();
    resetMoves();
    

}

function resetMoves() {
    
    movesCount = 0;
    moves.innerHTML = movesCount;


}



