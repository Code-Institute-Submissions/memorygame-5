//game-card for all images. Images are appended to this.
let cardElements = document.getElementsByClassName('game-card');
let cardElementsArray = [...cardElements];


//this array contains all of the images
var allImages = [
    "assets/images/island.png",
    "assets/images/cat-reading.png",
    "assets/images/cuty-cats.png",
    "assets/images/sleeping-kitty.png",
    "assets/images/little-cat.png",
    "assets/images/cat.png",
    "assets/images/pirate.png",
    "assets/images/ship.png",

];

//an empty array that the images will be placed in, depending on the difficulty level. So 4 images for easy,6 images for medium and 8 for
//hard. This will change depending on which button is clicked (see changeLevel function)
var selection=[];

//these variables will be used to match the cards
var counter = 0;
var card1;
var card2;

//these variables will be used to keep track of how many moves have been made
var score = 0;
var totalGameMoves=document.getElementById('totalGameMoves');
//variables for the different buttons: changing difficulty level, buttons on modals and restarting game
var restartButton = document.getElementById('restartButton');
var playAgainButton = document.getElementById('playAgain');

var easyButton= document.getElementById('easy-button');
var mediumButton= document.getElementById('medium-button');
var hardButton= document.getElementById('hard-button');
var modalEasyButton= document.getElementById('modal-easy-button');
var modalMediumButton= document.getElementById('modal-medium-button');
var modalHardButton= document.getElementById('modal-hard-button');


//array for medium cards to be used when changing levels.
var mediumRow=document.getElementsByClassName('row-medium');
let mediumRowArray = [...mediumRow];
var easyRow=document.getElementsByClassName('row-easy');
//array to be used when changing to hard difficulty level
var hardRow=document.getElementsByClassName('row-hard');
let hardRowArray = [...hardRow];

var numberOfImages;

//variable to keep track of number of matches. This will later be used to determine when player has won.
var numberOfMatches = 0;

//add event listeners to the difficulty buttons both in the game and modal in order to ascertain how many cards will appear and be shuffled
easyButton.addEventListener('click', changeToEasy);
modalEasyButton.addEventListener('click',changeToEasy);


//player will firstly select their difficulty level, and then the correct rows will be loaded depending on difficulty level using the changeToEasy, changeToMedium and changeToHard functions.
//changeLevel function will then take 

function changeToEasy(){

    for (let i = 0; i < mediumRowArray.length; i++) {
        mediumRowArray[i].classList.add('hidden');}
    for (let i = 0; i < hardRowArray.length; i++) {
        hardRowArray[i].classList.add('hidden');}



         changeLevel(0,4)




    if (score>=1){
        score=0;
        totalGameMoves.innerHTML=score;
    }
    console.log(selection.length)
}

mediumButton.addEventListener('click', changeToMedium);
modalMediumButton.addEventListener('click', changeToMedium);



function changeToMedium(){
    for (let i = 0; i < mediumRowArray.length; i++) {
        mediumRowArray[i].classList.remove('hidden');}
    for (let i = 0; i < hardRowArray.length; i++) {
        hardRowArray[i].classList.add('hidden');}
    
    changeLevel(0,6);

    if (score>=1){
        score=0;
        totalGameMoves.innerHTML=score;
    }
}

hardButton.addEventListener('click', changeToHard);
modalHardButton.addEventListener('click', changeToHard);


function changeToHard(){

    for (let i = 0; i < mediumRowArray.length; i++) {
        mediumRowArray[i].classList.remove('hidden');}
    for (let i = 0; i < hardRowArray.length; i++) {
        hardRowArray[i].classList.remove('hidden');}



    changeLevel(0,8)




    if (score>=1){
        score=0;
        totalGameMoves.innerHTML=score;
    }
}

//select and shuffle cards based on difficulty level
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;


}
//cut the array and put only 4 cards into the selection array, duplicate those cards into a new array, concat both arrays into
//a new array - this new array will be used in the createImages function
function changeLevel(x,y){

    for(i=0; i<cardElementsArray.length; i++){
        cardElementsArray[i].innerHTML="";
    }
    shuffle(allImages);
    var selection1=allImages.slice(x,y);
    var selection2=selection1.slice(x,y);
    var selection = selection1.concat(selection2);
    shuffle(selection);

    createImages(selection);
    
}

//images from the selection made in changeLevel function are shuffled
//img element is created in the html for each game-card, and the selected images are appended to the cards
//class List of 'hidden' is added to each image, so that later in the game they only appear when clicked
function createImages(images){

    // counter
    var i = 0;

    // shuffle array

    shuffle(images);
    
    // start preloading
    for(i=0; i<images.length; i++)
    {
        var imageObj = document.createElement('img');
        imageObj.style.width ="100%";
        imageObj.style.height ="100%";
        imageObj.src=images[i];
        cardElementsArray[i].appendChild(imageObj);
        imageObj.classList.add('hidden');


    }

    numberOfImages=images.length;


startGame();



}


//restart game depending on the level when restart button is clicked


restartButton.addEventListener('click',restartGame);

//the playAgainButton appears when a player has won the game, so the same functionality is used here for the player to restart and play another round
playAgainButton.addEventListener('click',restartGame);

function restartGame(){
    if (numberOfImages===8){
        changeToEasy();
    }
    if (numberOfImages===12){
        changeToMedium();
    }
    if (numberOfImages===16){
        changeToHard();
    }

}

   

//display cards when game starts and initiate move counter
function startGame() {

    for (let i = 0; i < cardElementsArray.length; i++) {
        cardElementsArray[i].addEventListener('click', displayCard)
        cardElementsArray[i].addEventListener('click', countScore)
        cardElementsArray[i].addEventListener('click', flipEvent)


    }

}

//cards flip when clicked

function flipEvent(){
           this.children[0].classList.add('animated', 'flipInY');



}




//this function ensures that only two cards can be flipped at the same time
//when a card is clicked, the classList 'hidden' is removed and 'show-img' is added, so the card appears to flip over.
//two cards, card1 and card2 are created, the values of which are the two cards that have been clicked. These cards will later be evaluated for a match. 
function displayCard() {
    if (counter==0){
        counter=1;
        this.children[0].classList.remove('hidden');
        this.children[0].classList.add('show-img');
        card1=this.children[0];
    }
   else if (counter==1){
        counter=2;
        this.children[0].classList.remove('hidden');
        this.children[0].classList.add('show-img');
        card2=this.children[0];
        checkForMatch();
        counter=0;
    }





}

//moves made counter goes up one every time you click a card

function countScore() {
    score++;
    totalGameMoves.innerHTML=score;
}


//the image element of the two cards turned over are compared
// *bug fix* if they are the same, the ids are subsequently compared to make sure they are different cards. Initially if the same card was clicked twice, the system would read it as a match. Ids have been added to distinguish between the different img elements that have the same .src but are different cards.
// when a match is made, the numberOfMatches counter also goes up. This is so the game can calculate when the player has won. Once the correct number of matches according to the chosen level have been made, the youHaveWon function is triggered.
function checkForMatch() {

       if (card1.src==card2.src){
           if (card1.parentElement.id==card2.parentElement.id){
               mismatched();
           }
           else{
           numberOfMatches = numberOfMatches+1

           match();
           }
           
       }
    else{
        mismatched();
       }
       youHaveWon();
}

//functionality added to announce the player has won. This triggers a modal that tells the player the game is over and resets the numberOfMatches to 0 so that the player can play again.

function youHaveWon(){
    if ((numberOfImages/2) === numberOfMatches){
        
        $('#exampleModal').modal('show');
    //reset counter for next game play
        numberOfMatches = 0;

    }
}
// make sure that when cards flip back over there is a 1 second delay so that player can see both cards. Also initialise 'unflip'
function mismatched(){
    setTimeout(unflipCards,1000);
}

//if two cards have the same src element, remove Event Listener
function match(){
    
    card1.parentElement.removeEventListener('click',displayCard);
    card2.parentElement.removeEventListener('click',displayCard);
}

//un-flip cards that don't match
function unflipCards(){
    card1.classList.remove('show-img');
    card1.classList.add('hidden');

    card2.classList.remove('show-img');
    card2.classList.add('hidden');

}








window.onload = function () {
        setTimeout(function() {
        startGame();
    }, 1200);
}