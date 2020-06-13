//Retrieves Help Modal 
const helpModal = document.getElementById('helpModal');
function openHelpModal() {
    helpModal.classList.add('show-modal');
    log("show modal test")
}

//closes help modal
function closeHelpModal() {
    helpModal.classList.remove('show-modal');
}

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
let level = document.getElementById('level1');

let dogsCollection = [ "frenchie","frenchie","yorkie","yorkie","maltease",
       "maltease","pug","pug","spotty","spotty","pitbull","pitbull"];

let fruitCollection = [ "banana","banana","apple","apple","avocado",
			 "avocado","grapes","grapes","pinapple","pinapple","strawberry","strawberry", 
             "watermelon","watermelon", "lemon","lemon"];	
let subjectCollection = [];
log("Level " + level);
if (level) {
  subjectCollection = dogsCollection;             
}else {
   subjectCollection = fruitCollection; }

//Test to see if element defined 
validateElement(moves);

function validateElement(elementName)
{

  if(elementName)
  {

  }
  else
  {
    log("ERROR: Element " + elementName + " is not defined");
  }

}

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
// assigns images to cards randomly by using several functions
function assignPictures()
{

	getImagesCollection();
	clearImagesAllocation();
	//logImagesCollection();
	//shuffleImages();
	shuffleImagesTest();
	setImageSources();
	//logImagesCollection();

}

// retrieves images by collecting them from html
function getImagesCollection()
{

	imagesCollection = document.querySelectorAll('img.front-face');
	
}
// Allocates the retreived images to the game board
function allocateImage(imageIndex,value)
{
	imagesAllocation[imageIndex] = value;
}

// sets the src of the image 
function setImageSource(imageIndex,srcIndex)
{
	imagesCollection[imageIndex].src = srcsCollection[allocationIndex[srcIndex]];
}
// checks to see image hasn't already been allocated - so that only two of each image appears
function IsNumberAllocated(number)
{
	for (var i = 0; i < imagesAllocation.length; i++) {

		if( number === imagesAllocation[i])
			return true;		
	}
	return false;
}
// shuffles images so they appear in random order
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
		//log("Assigning values to image: " + i + " image = " + imagesAllocation[i] + " randomPos = " + randomPos);
	}
}

// images appear beside each other for testing
function shuffleImagesTest()
{

	for (var i = 0; i < imagesAllocation.length; i++) {
		imagesAllocation[i] = i+1;
		//log("Assigning values to image: " + i + " image = " + imagesAllocation[i] + " randomPos = " + randomPos);
	}
}



//sets the source png for an image, also sets the alt and dataset to same name
function setImageSources()
{
	for (var i = 0; i < imagesAllocation.length; i++) {
		let index = imagesAllocation[i] -1;
		//log("Index " + index + " dog " + subjectCollection[index]);
		imagesCollection[i].src="assets/img/" + subjectCollection[index] + ".png";
		imagesCollection[i].alt= subjectCollection[index];
		imagesCollection[i].parentElement.dataset.framework = subjectCollection[index] ;	
		//log("Assigning " + subjectCollection[index] + " to image ID " + imagesCollection[i].id + " i=" + i + " allocation= " + index );
	}
	return false;
}
// removes the css class 'flip'
 function unflipCards() {
    for (var i = 0; i < cards.length; i++) 
        {
		
		cards[i].classList.remove('flip');
		
	}
}

// flashes cards for 600 milliseconds to give game player a hint
function hint() {
    log("Hint function:");
    for (var i = 0; i < cards.length; i++) {
          if(cards[i].dataset.state === "unflipped")
		  cards[i].classList.add('flip');
}
setTimeout(hide, 600)
}

// allows cards to flash for hint for certain length of time
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
// reads the dataset state of a card to allow hint function to flash unmatched cards
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
      if(matchCount >= (subjectCollection.length/2))
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
// removes event listener from matched cards
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
// testing function
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

// allows game over modal to be closed
function closeModal() {
   
	log("Closing Model");
    	modal.style.display = 'none'; //element will not be displayed 
	;
}

// allows game over modal to be opened
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
// allows timer to be reset for new game
function resetTimer() {
    document.querySelector(".timer").innerHTML = '00:00';
    [hour, minute, second] = [0, 0, 0];
}
// stops times to allow total game time to be read
function stopTimer() {
    clearInterval(timeStart); //clearInterval needs to use the variable from the setInterval 
    timeStart = '';
}

//resets scoreboard
function resetPlay() {
    stopTimer();
    resetTimer();
    resetMoves();
    

}
//resets the move counter back to 0
function resetMoves() {
    
    movesCount = 0;
    moves.innerHTML = movesCount;


}