
import { playGame } from './gameengine.js';
import { createBoard } from './createboard.js';
import * as sound from './sound.js';
import * as debug from './debug.js';
import * as utils from './utils.js';



window.enableMusic = utils.enableMusic;
window.disableMusic = utils.disableMusic;
window.openHelpModal = utils.openHelpModal;
window.closeHelpModal = utils.closeHelpModal;
window.openLevelsModal = utils.openLevelsModal;
window.closeLevelsModal = utils.closeLevelsModal;
window.startLevel = startLevel;



  export function test()
  {
    debug.log("test function");
  
    
  }

  export function startLevel(level){
      sessionStorage.setItem("level", level);
      window.location.href = "./game.html";
  }


