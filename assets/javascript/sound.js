var popupsound = document.getElementById("notifypop");

export function stopMusic() {
   popupsound.pause(); //play the audio file
}

export function playMusic() {
    popupsound.play();
}
