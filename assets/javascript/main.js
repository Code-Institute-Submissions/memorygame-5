import * as debug from './debug.js';
import * as utils from './utils.js';
import * as sound from './sound.js';

window.toggleSound = sound.toggleSound;
window.openHelpModal = utils.openHelpModal;
window.closeHelpModal = utils.closeHelpModal;
window.openLevelsModal = utils.openLevelsModal;
window.closeLevelsModal = utils.closeLevelsModal;
window.startLevel = startLevel;

export function test() {
  debug.log("test function");
}

//stores the choosen level in the session
export function startLevel(level) {
  sessionStorage.setItem("level", level);
  window.location.href = "./game.html";
}


