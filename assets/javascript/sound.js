var popupsound = document.getElementById("notifypop");

//stops the audio file
export function stopMusic() {
   popupsound.pause(); 
}

//play the audio file
export function playMusic() {
    popupsound.play();
}
