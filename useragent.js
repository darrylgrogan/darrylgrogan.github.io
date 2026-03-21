let device = navigator.userAgent;
let isTouchAvailable = "";

function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
}

if (isTouchDevice()) {
  isTouchAvailable = "yes"
} else {
  isTouchAvailable = "no"
}

document.getElementById("output1").innerHTML = device;
document.getElementById("output2").innerHTML = isTouchAvailable;
