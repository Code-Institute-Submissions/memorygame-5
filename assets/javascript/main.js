import { playGame } from './gameengine.js';
import { createBoard } from './createboard.js';
import * as sound from './sound.js';
import * as debug from './debug.js';



window.enableMusic = enableMusic;
window.disableMusic = disableMusic;
window.openHelpModal = openHelpModal;
window.closeHelpModal = closeHelpModal;
window.startGame = startGame;


  export function startGame()
  {
    debug.log("startGame");
    createBoard();
    playGame();
    
  }

  export function test()
  {
    debug.log("test function");
  
    
  }

  export function enableMusic()
  {

    sound.playMusic();
    
  }

  export function disableMusic()
  {

    sound.stopMusic();
    
  }

  //Retrieves Help Modal 

function openHelpModal() {
    const helpModal = document.getElementById('helpModal');
    helpModal.classList.add('show-modal');
    debug.log("opening modal test");
}

//closes help modal
function closeHelpModal() {
    const helpModal = document.getElementById('helpModal');
    helpModal.classList.remove('show-modal');
    debug.log("closing modal test");
}