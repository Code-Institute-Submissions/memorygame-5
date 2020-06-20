// create an array with n images
// everytime we draw a card we remove that image from list
// image|use_count
// use_count = usecount-1;
//if useCount=o
//image is usedup

import * as debug from './debug.js';
import * as utils from './utils.js';
//import { level } from './game.js';

//For Level 1
let numberRows = 3;
let cardsPerRow =4;
let gameBoard = document.getElementById('game-board');
let cardHolderDiv =  document.createElement('div');

// testing function


export let cards = [];
export let imagesCollection = []; //populated as we create each imageCard, we push the front face image into this array
export let imagesAllocation =  Array(numberRows * cardsPerRow).fill(0);
export let subjectCollection = [];





let dogsCollection = [ "frenchie","sausage","yorkie","pug","maltease", "spotty"];

let dogsCollectionFull = dogsCollection.concat(dogsCollection);

let fruitCollection = ["banana","apple","avocado","grapes","pinapple","strawberry", 
             "watermelon","lemon"];	

let fruitCollectionFull = fruitCollection.concat(fruitCollection);             

let travelCollection = ["flipflops","globe", "map", "neckpillow", "passport", "plane", "snorkel", "suitcase", "surfboard", "glasses"
];     

let travelCollectionFull = travelCollection.concat(travelCollection);

subjectCollection = dogsCollection;


export function createBoard(level)
{
    debug.log("requested level " + level);
    //clearGameBoard();
    if(level === "1")
    {
        numberRows = 3;
        subjectCollection = dogsCollectionFull;
    }
    else if(level === "2")
    {
        numberRows = 4;
        subjectCollection = fruitCollectionFull;
    }
    else
    {
        numberRows = 4;
        cardsPerRow = 5;
        subjectCollection = travelCollectionFull;
    }
    imagesAllocation =  Array(numberRows * cardsPerRow).fill(0);
    debug.log("Creating Game Board for " + numberRows +  " rows and " + cardsPerRow + " cards per row");
    utils.shuffleImagesTest(imagesAllocation); //randomize allocations
    
    //createCardHolderDiv();
    
    var i = 0;    
    for (i = 0; i < numberRows; i++)
    {
        debug.log("Generating card row " + i);
        createCardRow(i);
    }
    setImageSources();


}

function createCardHolderDiv()
{
    
    cardHolderDiv.className = "card-holder";
    cardHolderDiv.setAttribute("id", "card_holder");
    gameBoard.appendChild(cardHolderDiv); 
}

/*

               <div class="box">
                  <div class="memory-card" data-framework="frenchie" data-state="unflipped">
                     <img id ="img1" class="front-face" src="assets/img/frenchie.png" alt="frenchie" />
                     <img class="back-face" src="assets/img/blank.png" alt="blank" />
                  </div>
               </div>


*/
function createCardRow(rowNumber)
{
    //we create some dynamic elements
    //var row = "<div class='row' id = '" + rowNumber + "'>\n<div class='box'>In the Box</div></div>";
    if(gameBoard)
    {
        var i = 0; 
        let rowDiv =  document.createElement('div');
        rowDiv.className = "row";
        rowDiv.setAttribute("id", "row_" + rowNumber);
        gameBoard.appendChild(rowDiv);  
        //cardHolderDiv.appendChild(rowDiv);
        for (i = 0; i < cardsPerRow; i++)
        {
            debug.log("Generating card " + i + " on row " + rowNumber);
            createBox(rowDiv, i);
        }

        debug.log("Created new element " + rowDiv);
    }
    else
        debug.log("Could not create new element in " + gameboard) + " It may not exist";

    // for number of cards
        //create card
}




/*
<div class="box">
                  <div class="memory-card" data-framework="frenchie" data-state="unflipped">

                  </div>
               </div>
*/
// creates card element
// takes a div reference (object) and a card number
function createBox(rowDiv,cardNumber)
{
    // for number of images
        // createCardImage
    let boxDiv =  document.createElement('div');
    boxDiv.className = "box";
    boxDiv.setAttribute("id", "box_" + cardNumber);
    rowDiv.appendChild(boxDiv); 
    createMemoryCard(boxDiv,cardNumber);
    
}


function createMemoryCard(boxDiv,cardNumber)
{
    let cardDiv =  document.createElement('div');
    cardDiv.className = "memory-card";
    cardDiv.setAttribute("id", "card_" + cardNumber);
    cardDiv.setAttribute("data-framework", "not set");
    cardDiv.setAttribute("data-state", "unflipped");
    boxDiv.appendChild(cardDiv);
    cards.push(cardDiv);
    createCardImage(cardDiv, cardNumber);
}

/*

                     <img id ="img1" class="front-face" src="assets/img/frenchie.png" alt="frenchie" />
                     <img class="back-face" src="assets/img/blank.png" alt="blank" />
                     */

function createCardImage(cardDiv, cardNumber)
{
    let frontImage = document.createElement('img');
    let backImage = document.createElement('img');
    frontImage.className = "front-face";
    backImage.className = "back-face";
    frontImage.setAttribute("id", "img" + cardNumber);
    frontImage.setAttribute("src", "assets/img/blank.png");
    frontImage.setAttribute("alt", "worry later");
    backImage.setAttribute("src", "assets/img/blank.png");
    backImage.setAttribute("alt", "blank");
    cardDiv.appendChild(frontImage);
    cardDiv.appendChild(backImage);
    imagesCollection.push(frontImage);
    debug.log("creteCardImage: increment");
    


}

//sets the source png for an image, also sets the alt and dataset to same name
function setImageSources()
{
    debug.log("imagesAllocation.Length is " + imagesAllocation.length);
	for (var i = 0; i < imagesAllocation.length; i++) {
		let index = imagesAllocation[i] -1;
		debug.log("setImagesSources: Index " + index + " card " + subjectCollection[index]);
		imagesCollection[i].src="assets/img/" + subjectCollection[index] + ".png";
		imagesCollection[i].alt= subjectCollection[index];
		imagesCollection[i].parentElement.dataset.framework = subjectCollection[index] ;	
		//log("Assigning " + subjectCollection[index] + " to image ID " + imagesCollection[i].id + " i=" + i + " allocation= " + index );
	}
	return false;
}


