const camera = document.getElementById("camera");
const cameraButton = document.getElementById("cameraButton");
const cameraStatus = document.getElementById("cameraStatus");
const batteryDisplay = document.getElementById("battery");

let cameraRunning = false;

// Turn on the phone camera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          ideal: "environment"
        }
      },
      audio: false
    });

    camera.srcObject = stream;
    cameraRunning = true;

    cameraStatus.textContent = "ON";
    cameraButton.textContent = "CAMERA ACTIVE";

  } catch (error) {
    console.error(error);

    cameraStatus.textContent = "ERROR";
    cameraButton.textContent = "CAMERA DENIED";
  }
}

// Camera button
cameraButton.addEventListener("click", startCamera);


// Try to display the phone's battery percentage
async function getBattery() {
  if (!("getBattery" in navigator)) {
    batteryDisplay.textContent = "--%";
    return;
  }

  try {
    const battery = await navigator.getBattery();

    function updateBattery() {
      batteryDisplay.textContent =
        Math.round(battery.level * 100) + "%";
    }

    updateBattery();

    battery.addEventListener("levelchange", updateBattery);

  } catch (error) {
    batteryDisplay.textContent = "--%";
  }
}

getBattery();
