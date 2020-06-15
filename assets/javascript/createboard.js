// create an array with n images
// everytime we draw a card we remove that image from list
// image|use_count
// use_count = usecount-1;
//if useCount=o
//image is usedup

import * as debug from './debug.js';

//For Level 1
let numberRows = 3;
let cardsPerRow =4;
let gameBoard = document.getElementById('game-board');


// testing function









//creates the gameboard - rows and cards in the row
export function createBoard()
{
    debug.log("Creating Game Board for " + numberRows +  " rows and " + cardsPerRow + " cards per row");
    var i = 0;    
    for (i = 0; i < numberRows; i++)
    {
        debug.log("Generating card row " + i);
        createCardRow(i);
    }


}

//creates the rows for the gameboard
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
        //rowDiv.innerHTML = row;
        //let elemenText  = document.createTextNode("This is some text");
        //rowDiv.appendChild(elemenText);
        gameBoard.appendChild(rowDiv);   
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




// creates card element
// takes a div reference (object) and a card number
function createBox(rowDiv,cardNumber)
{
    // for number of images
        // createCardImage
    var i = 0; 
    let boxDiv =  document.createElement('div');
    boxDiv.className = "box";
    boxDiv.setAttribute("id", "box_" + cardNumber);
    rowDiv.appendChild(boxDiv); 
    createMemoryCard(boxDiv,cardNumber);
    
}

//creates the card div with class of memory-card, this div holds the two images
function createMemoryCard(boxDiv,cardNumber)
{
    let cardDiv =  document.createElement('div');
    cardDiv.className = "memory-card";
    cardDiv.setAttribute("id", "card_" + cardNumber);
    cardDiv.setAttribute("data-framework", "not set");
    cardDiv.setAttribute("data-state", "unflipped");
    boxDiv.appendChild(cardDiv);
    createCardImage(cardDiv, cardNumber);
}

//creates the two image elements - front-face and back-face
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



}
