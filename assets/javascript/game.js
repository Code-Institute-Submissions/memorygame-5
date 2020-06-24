import {playGame, hint, closeHintsModal,levelOptionsModal} from './gameengine.js';
import {createBoard, imagesAllocation} from './createboard.js';
import {startLevel} from './main.js'
import * as debug from './debug.js';
import * as sound from './sound.js';
import * as utils from './utils.js';

window.toggleSound = sound.toggleSound;
window.openHelpModal = utils.openHelpModal;
window.closeHelpModal = utils.closeHelpModal;
window.openLevelsModal = utils.openLevelsModal;
window.closeLevelsModal = utils.closeLevelsModal;
window.openLevelsModal = utils.openLevelsModal;
window.levelOptionsModal = levelOptionsModal;
window.closeHintsModal = closeHintsModal;
window.hint = hint;
window.setLevel = setLevel;
window.startGame = startGame;

//starts game and 
(function start() {
  startGame();
})();

//Sets selected level 
function setLevel(selectedLevel) {
  sessionStorage.setItem("level", selectedLevel);
  debug.log("Setting level to " + selectedLevel);
}

//starts correct level in the start function
export function startGame() {
  debug.log("startGame");
  createBoard(sessionStorage.getItem("level"));
  playGame();

}