var popupsound = document.getElementById("notifypop");
let cardFlipPop =document.getElementById("cardFlipNoise")

export function stopMusic() {
   popupsound.pause(); //play the audio file
}

export function playMusic() {
    popupsound.play();
}

//plays noise for card flipping when called
function flipNoise() {
    cardFlip.play();
}