const chrono = document.getElementById("sec");
const milli = document.getElementById("milli");
const gauche = document.getElementsByClassName("gauche");
const grille = document.querySelector(".zone.border");
const ciblePlayer1 = document.getElementById("ciblePlayer1");
var lastAim;
const chronoAim = [];
var $ciblePlayer1 = 0;
var countdown = 0;
var gong = 0;
var millisec, sec;
const startTime = 60;
var time = startTime;

// Zone test---------------------------------------------------------------------------------------------------------

function moquerie() {
  gauche[4].classList.toggle("lol");
}
chrono.onclick = startChrono;

// SOUND---------------------------------------------------------------------------------------------------------
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
// Chronometre---------------------------------------------------------------------------------------------------------
// chronometer(60)

function startChrono(params) {
  createAim();
  aimTouch();
  setInterval(function() {
    while (time === 10 && !countdown) {
      toSiren();
    }

    while (time === 1 && !gong) {
      endGong();
    }

    //Chrono secondes
    if (time > 0) {
      time--;
    }
    chrono.textContent = time;
  }, 1000);

  millisec = 0;
  setInterval(startMilli, 10);
}

function startMilli() {
  //Chrono millièmes
  while (time === 0) {
    clearInterval(milliseconde);
  }

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
}

// Cibles---------------------------------------------------------------------------------------------------------

// function updateChrono(number) {}

function createAim() {
  lastAim = shuffleTime(299);
  aimToggle();
  moquerie();
  // A FAIRE AVEC NTH CHILD
}

function deleteAim() {
  removeClickListener();
  aimToggle();
}

function listenToTarget() {
  toFire();
  deleteAim();
  toStoreAimShot();
  toCountAim(1);
  createAim();
  aimTouch();
}

function aimTouch() {
  addClickListener();
  // if(chronoAim.length > 1) gauche[1].textContent = bestTime(chronoAim)
}

function toCountAim(player) {
  player === 1 ? $ciblePlayer1++ : $ciblePlayer2++;
  ciblePlayer1.innerHTML =
    $ciblePlayer1 + "<br>cible" + ($ciblePlayer1 > 1 ? "s" : "");
}

// function bestTime(arr) {
//   let bestTime = 100
//   for (let i = 0; i < arr.length-1; i++) {
//     if(bestTime > arr[i+1] - arr[i]) bestTime = arr[i+1] - arr[i]
//   }return "best shot :" + (+bestTime.toFixed(2) < 10 ? " " : "") + (+bestTime.toFixed(2) < 1 ? bestTime.toFixed(2).substring(1)  :  bestTime.toFixed(2))
// }

function toStoreAimShot() {
  chronoAim.push(+(startTime + 0.99 - eval(time + "." + millisec)).toFixed(2));
}

function removeClickListener() {
  grille
    .querySelector(`:nth-child(${lastAim})`)
    .removeEventListener("click", listenToTarget);
}

function addClickListener() {
  grille
    .querySelector(`:nth-child(${lastAim})`)
    .addEventListener("click", listenToTarget);
}

function aimToggle() {
  grille.querySelector(`:nth-child(${lastAim})`).classList.toggle("cible");
}

function shuffleTime(max) {
  return Math.floor(1 + Math.random() * max); //max is the number of element in the grid
}
