const chrono = document.getElementById("sec");
const milli = document.getElementById("milli");
var lastAim = "cell" + Math.floor(Math.random() * 288);
var countdown = 0;
var gong = 0;

// SOUND
const sniperSound = document.getElementById("sniperSound");
const sirenSound = document.getElementById("sirenSound");
const gongSound = document.getElementById("gongSound");

// Chronometre
var sec = 99;
var millisec = 99;

setInterval(function() {
  while (sec === 10 && !countdown) {
    toSiren();
  }

  while (sec === 0 && !gong) {
    endGong();
  }

  //Chrono secondes
  if (sec > 0) {
    sec--;
    chrono.textContent = sec;
  } else {
    chrono.textContent = sec;
  }
}, 1000);

setInterval(function() {
  //Chrono millièmes
  if (sec === 0) {
    millisec = "00";
    milli.textContent = "." + millisec;
  } else {
    if (millisec > 0) {
      millisec--;
      milli.textContent = "." + millisec;
    } else {
      millisec = 99;
    }
  }
}, 10);

// Cibles

createAim();
aimTouch();

function createAim() {
  let shuffleAim = "cell" + Math.floor(Math.random() * 288);
  lastAim = shuffleAim;
  document.getElementById(lastAim).classList.toggle("cible");
}

function deleteAim() {
  document.getElementById(lastAim).classList.toggle("cible");
  // supprimer le fait qu'il puisse recreer une cible
}

function listenToTarge() {
  toFire();
  deleteAim();
  console.log(
    lastAim,
    "détruite à",
    (99.99 - eval(sec + "." + millisec)).toFixed(2)
  );
  document.getElementById(lastAim).removeEventListener("click", listenToTarge);
  createAim();
  aimTouch();
}

function aimTouch() {
  document.getElementById(lastAim).addEventListener("click", listenToTarge);
}

function toSiren() {
  sirenSound.play();
  countdown++;
}

function endGong() {
  gongSound.play();
  gong++;
}

function toFire() {
  sniperSound.play();
}
