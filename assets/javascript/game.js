import {
	playGame,
	hint,
	closeHintsModal,
	levelOptionsModal
} from './gameengine.js';
import {
	createBoard
} from './createboard.js';
import {
	startLevel
} from './main.js'
import * as debug from './debug.js';
import * as sound from './sound.js';
import * as utils from './utils.js';

window.enableMusic = utils.enableMusic;
window.disableMusic = utils.disableMusic;
window.openHelpModal = utils.openHelpModal;
window.closeHelpModal = utils.closeHelpModal;
window.openLevelsModal = utils.openLevelsModal;
window.closeLevelsModal = utils.closeLevelsModal;
window.openLevelsModal = utils.openLevelsModal;
window.levelOptionsModal = levelOptionsModal;
window.closeHintsModal = closeHintsModal;
window.hint = hint; //this uses the hint function defined in the gamengine file
window.setLevel = setLevel;

window.startGame = startGame;

//export let level = 1;
//starts game and sets selected level 
(function start() {
	startGame();
})();


function setLevel(selectedLevel) {
	sessionStorage.setItem("level", selectedLevel);
	debug.log("Setting level to " + selectedLevel);
	//location.reload();
	//startGame();
}

export function startGame() {
	debug.log("startGame");
	createBoard(sessionStorage.getItem("level"));
	playGame();

}