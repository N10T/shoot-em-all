const chrono = document.getElementById("sec");
const milli = document.getElementById("milli");
const gauche = document.getElementsByClassName("gauche");
const grille = document.getElementsByClassName("grille")
const ciblePlayer1 = document.getElementById("ciblePlayer1")
var lastAim = 0
const chronoAim = [];
var $ciblePlayer1 = 0

var countdown = 0;
var gong = 0;

// Zone test

function bestTime(arr) {
  let bestTime = 100
  for (let i = 0; i < arr.length-1; i++) {
    if(bestTime > arr[i+1] - arr[i]) bestTime = arr[i+1] - arr[i]
    
  }return "best shot :" + (+bestTime.toFixed(2) < 10 ? " " : "") + (+bestTime.toFixed(2) < 1 ? bestTime.toFixed(2).substring(1)  :  bestTime.toFixed(2))
}


// SOUND
const sniperSound = document.getElementById("sniperSound");
const sirenSound = document.getElementById("sirenSound");
const gongSound = document.getElementById("gongSound");
function toSiren() {
  // sirenSound.play();
  countdown++;
}

function endGong() {
  // gongSound.play();
  gong++;
}

function toFire() {
  // sniperSound.play();
}
// Chronometre
var sec = 60;
var millisec = 99;

setInterval(function() {
  while (sec === 10 && !countdown) {
    toSiren();
  }

  while (sec === 1 && !gong) {
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
// function updateChrono(number) {}

function createAim() {
  let shuffleAim = Math.floor(1+ Math.random() * 299);
  lastAim = shuffleAim
  grille[lastAim].classList.toggle("cible");
}

function deleteAim() {
  grille[lastAim].classList.toggle("cible");
}

function listenToTarget() {
  toFire();
  deleteAim();
  chronoAim.push((99.99 - eval(sec + "." + millisec)).toFixed(2));
  grille[lastAim].removeEventListener("click", listenToTarget);
  gauche[0].textContent = chronoAim[chronoAim.length - 1];
  toCountAim(1)
  createAim();
  aimTouch();

}

function aimTouch() {
  grille[lastAim].addEventListener("click", listenToTarget);
  if(chronoAim.length > 1) gauche[1].textContent = bestTime(chronoAim);
}
;

function toCountAim(player) {
  player === 1 ? $ciblePlayer1++ : $ciblePlayer2++
  ciblePlayer1.textContent = $ciblePlayer1 + " cible" + ($ciblePlayer1 > 1 ? "s" : "")
  // ciblePlayer2.textContent = $ciblePlayer2 + " cible" + ($ciblePlayer2 > 1 ? "s" : "")

}


