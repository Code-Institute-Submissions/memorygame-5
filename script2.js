const cards = document.querySelectorAll('.memory-card');

let debug=true;
let cardState = [];
let shuffleOn=true;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timeStart = "";
let matchCount= 0;
let resetGame = true;
let elaspedTime = 0;
let totalGameMovesElement = document.getElementById('totalGameMoves');
let moves = document.getElementsByClassName('.moves');
let totalGameTimeElement = document.getElementById('totalGameTime');
let timer = document.getElementById('timer')
let closeModalBtn = document.getElementById('closeModal');
let modal = document.getElementById('levelCompleteModal');
let movesCount = 0;
let closeBtn = document.getElementsByClassName('closeBtn')[0];
let imagesCollection = [];
let imagesAllocation = [];
let fruitCollection = [ "banana","banana","apple","apple","avocado",
			 "avocado","grapes","grapes","pinapple","pinapple","strawberry","strawberry", 
             "watermelon","watermelon", "lemon","lemon"];
	
	

//Add Event Listners 

 assignClickListner(closeModalBtn,closeModal);

if(cards)
	cards.forEach(card => card.addEventListener('click', flipCard));
else
	log("Cards not defined");



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

//main game play

function assignPictures()
{

	getImagesCollection();
	clearImagesAllocation();
	logImagesCollection();
	//shuffleImages();
	shuffleImagesTest();
	setImageSources();
	logImagesCollection();

}

// retrieves images and randomly allocates them to the game board
function getImagesCollection()
{

	imagesCollection = document.querySelectorAll('img.front-face');
	
}

function allocateImage(imageIndex,value)
{
	imagesAllocation[imageIndex] = value;
}


function setImageSource(imageIndex,srcIndex)
{
	imagesCollection[imageIndex].src = srcsCollection[allocationIndex[srcIndex]];
}

function IsNumberAllocated(number)
{
	for (var i = 0; i < imagesAllocation.length; i++) {

		if( number === imagesAllocation[i])
			return true;		
	}
	return false;
}

function shuffleImages()
{
	let randomPos=0
	let attempts=0;
	for (var i = 0; i < imagesAllocation.length; i++) {
		do
		{
			randomPos = Math.floor(Math.random() * 13);
	
			//log("randomPos = " + randomPos);
			attempts++;
			if(attempts > 40)
			{
				log("Giving up");
				break;
			}
		}		
		while (IsNumberAllocated(randomPos))
		attempts = 0;
		imagesAllocation[i] = randomPos;
		log("Assigning values to image: " + i + " image = " + imagesAllocation[i] + " randomPos = " + randomPos);
	}
}


function shuffleImagesTest()
{
	let randomPos=0
	let attempts=0;
	for (var i = 0; i < imagesAllocation.length; i++) {
		imagesAllocation[i] = i+1;
		log("Assigning values to image: " + i + " image = " + imagesAllocation[i] + " randomPos = " + randomPos);
	}
}



//sets the source png for an image, also sets the alt and dataset to same name
function setImageSources()
{
	for (var i = 0; i < imagesAllocation.length; i++) {
		let index = imagesAllocation[i] -1;
		//log("Index " + index + " fruit" + fruitCollection[index]);
		imagesCollection[i].src="../img/" + fruitCollection[index] + ".png";
		imagesCollection[i].alt= fruitCollection[index];
		imagesCollection[i].parentElement.dataset.framework = fruitCollection[index] ;	
		log("Assigning " + fruitCollection[index] + " to image ID " + imagesCollection[i].id + " i=" + i + " allocation= " + index );
	}
	return false;
}

 function unflipCards() {
    for (var i = 0; i < cards.length; i++) 
        {
		
		cards[i].classList.remove('flip');
		
	}
}

// flashes cards for 600 milliseconds to give game player a hint
function hint() {
    for (var i = 0; i < cards.length; i++) {
          if(cards[i].dataset.state === "unflipped")
		  cards[i].classList.add('flip');
}
setTimeout(hide, 600)
}


function hide()
{

	for (var i = 0; i < cards.length; i++) {
		if(cards[i].dataset.state === "unflipped")
		cards[i].classList.remove('flip');
		
	}
}


//image in an index into the collection of images
function logImageDetails(imageIndex)
{
	
	log("src = " + imagesCollection[imageIndex].src + " Allocation = " + imagesAllocation[imageIndex]);

} 

function clearImagesAllocation()
{
		for (var i = 0; i < imagesCollection.length; i++) {
		
		imagesAllocation[i] = 0;
		
	}
}

//creates a collection of images with front faces
function logImagesCollection()
{
	for (var i = 0; i < imagesCollection.length; i++) {
		
		log(imagesCollection[i]);
		
	}
}


function restoreCards()
{
	for (var i = 0; i < cards.length; i++) {
		
		cards[i].classList.add('flip');
		
	}

;
}

function readFlip () {
    for (var i = 0; i < cards.length; i++) {
        log("flipped state " + cards[i].dataset.state );
    }
}
// flips cards to reveal image
function flipCard()
{
  if (lockBoard)
    return;
  if (this === firstCard)
    return;

  this.classList.add('flip');
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
// checks to see if both images match
function checkForMatch() {
  let isMatch = (firstCard.dataset.framework === secondCard.dataset.framework);
	log("Datasets first " + firstCard.parentElement + " second  " + secondCard.parentElement);
 if ( isMatch) 
 { 
     disableCards();
     matchCount = matchCount +1
     if(matchCount >= 8)
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
  firstCard.dataset.state= "flipped";
  secondCard.dataset.state= "flipped";

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

(function start() {
  assignPictures();

})();


// adds move to counter
function addMove() {
    movesCount++;
    log(moves.innerHTML + " Adding " + movesCount + " to " + moves);
    document.querySelector(".moves").innerHTML = movesCount;

}

function log(textToLog)
{
	if(debug)
		console.log(textToLog);
}


// GAME OVER
function gameOver() {


    //show modal on game end
    openModal();
    stopTimer();
   
}


function closeModal() {
   
	log("Closing Model");
    	modal.style.display = 'none'; //element will not be displayed 
	;
}


function openModal() {
    modal.style.display = 'block'; // this is rendered as a block level element 

    totalGameTimeElement.innerHTML = elaspedTime;
    totalGameMoves.innerHTML = movesCount +1;
}

// game timer 
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
                elaspedTime = minute + ':' + second;
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

//resets
function resetPlay() {
    stopTimer();
    resetTimer();
    resetMoves();
    

}

function resetMoves() {
    
    movesCount = 0;
    moves.innerHTML = movesCount;


}
