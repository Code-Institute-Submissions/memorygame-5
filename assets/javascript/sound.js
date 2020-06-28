
//allows music to play or pause
export function toggleSound() {
  var popupsound = document.getElementById("notifypop");
  if (popupsound.paused)
    popupsound.play();
  else
    popupsound.pause();
}