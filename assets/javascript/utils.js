import * as sound from './sound.js';
import * as debug from './debug.js';

export function validateElement(elementName) {

  if (elementName) {

  } else {
    log("ERROR: Element " + elementName + " is not defined");
  }

}

//listeners for clicks in order to execute functions
export function assignClickListner(element, func) {
  if ((element) && (typeof func === "function"))
    element.addEventListener('click', func);
  else {
    if (element)
      console.log("Could not add listner, function does not exist");
    else
      console.log("Could not add listener for element " + element + " it does not exist");
  }
}

//plays music
export function enableMusic() {
  sound.playMusic();
}

//turns off music
export function disableMusic() {
  sound.stopMusic();
}

//Retrieves Help Modal 
export function openHelpModal() {
  const helpModal = document.getElementById('helpModal');
  helpModal.classList.add('show-modal');
  debug.log("opening modal test");
}

//closes help modal
export function closeHelpModal() {
  const helpModal = document.getElementById('helpModal');
  helpModal.classList.remove('show-modal');
  debug.log("closing modal test");
}

//Retrieves Levels Modal 
export function openLevelsModal() {
  const levelsModal = document.getElementById('levelsModal');
  levelsModal.classList.add('show-modal');
  debug.log("opening modal test");
}

//closes Levels modal
export function closeLevelsModal() {
  const levelsModal = document.getElementById('levelsModal');
  levelsModal.classList.remove('show-modal');
  debug.log("closing modal test");
}

// shuffles images so they appear in random order
export function shuffleImages(images) {
  let randomPos = 0
  let attempts = 0;
  let numberOfImages = images.length
  for (var i = 0; i < numberOfImages; i++) {
    do {
      randomPos = Math.floor(Math.random() * (numberOfImages + 1));
      attempts++;
      if (attempts > 40) {
        debug.log("Giving up");
        break;
      }
    }
    while (IsNumberAllocated(randomPos, images))
    attempts = 0;
    imagesAllocation[i] = randomPos;
  }
}

// checks to see image hasn't already been allocated - so that only two of each image appears
function IsNumberAllocated(number, images) {
  for (var i = 0; i < images.length; i++) {
    if (number === images[i])
      return true;
  }
  return false;
}

// images appear beside each other for testing
export function shuffleImagesTest(images) {

  for (var i = 0; i < images.length; i++) {
    images[i] = i + 1;
    //log("Assigning values to image: " + i + " image = " + imagesAllocation[i] + " randomPos = " + randomPos);
  }
}