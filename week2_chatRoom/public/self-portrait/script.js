let camStatus = false;
let num = 0;
console.log(num);

function triggerCam() {
  camStatus = true;
  num = 1;
  if (camStatus == true) {
    openCam();
    console.log(num);
    console.log("cam is triggered");
  }
}

function openCam() {
  if (camStatus == true) {
    num = 2;
    let All_mediaDevices = navigator.mediaDevices;
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
      console.log("getUserMedia() not supported.");
      return;
    }
    All_mediaDevices.getUserMedia({
      audio: false,
      video: true,
    })
      .then(function (vidStream) {
        var video = document.getElementById("videoCam");
        if ("srcObject" in video) {
          video.srcObject = vidStream;
        } else {
          video.src = window.URL.createObjectURL(vidStream);
        }
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (e) {
        console.log(e.name + ": " + e.message);
      });
  }
}
window.addEventListener("load", function () {
  let hello = document.getElementById("startBtn");
  hello.addEventListener("mouseover", function () {
    if (num == 0) {
      hello.innerHTML = "Think about it she might be mad";
    }
  });
  hello.addEventListener("click", function () {
    if (num == 1) {
      hello.innerHTML = "Still?";
    } else if (num == 2) {
      hello.innerHTML = "Eh";
      sleepyText.innerHTML = "...give me some ☕️";
    }
  });
});

let sleepyText = document.getElementById("sleepyText");
sleepyText.addEventListener("mouseover", function () {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  let randomX = Math.floor(Math.random() * (windowWidth - 100)); // Adjust for the div width
  let randomY = Math.floor(Math.random() * (windowHeight - 100)); // Adjust for the div height
  console.log("sleepy text moving triggered" + randomX);
  sleepyText.style.left = randomX + "px";
  sleepyText.style.top = randomY + "px";
});
