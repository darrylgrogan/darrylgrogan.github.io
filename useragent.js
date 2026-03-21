let device = navigator.userAgent;
let isTouchAvailable = "";

function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
}

if (isTouchDevice()) {
  isTouchAvailable = "yes touchscreen is enabled"
} else {
  isTouchAvailable = "no touchscreen is not enabled"
}

document.getElementById("output1").innerHTML = device;
document.getElementById("output2").innerHTML = isTouchAvailable;
