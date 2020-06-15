var popupsound = document.getElementById("notifypop");
var cardFlip = document.getElementById("cardFlipNoise")
//stops the audio
function stopMusic() {
   popupsound.pause(); 
}
//play the audio file
function playMusic() {
    popupsound.play();
}

//plays noise for card flipping when called
function flipNoise() {
    cardFlip.play();
}