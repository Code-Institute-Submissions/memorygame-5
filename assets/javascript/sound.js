

//stops the audio file
//export function stopMusic() {
   //popupsound.pause(); 
//}

//play the audio file
//export function playMusic() {
    //popupsound.play();
//}
export function toggleSound() {
  var popupsound = document.getElementById("notifypop");
  if (popupsound.paused)
    popupsound.play();
  else
    popupsound.pause();
}