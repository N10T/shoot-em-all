class Ennemies {
  constructor(name, power, dom) {
    this.name = name;
    this.power = power;
    this.dom = dom;
    this.x = 0;
    this.y = 0;
    this.soundURL = "";
  }
  attack = () =>
    +score.textContent <= this.power
      ? (score.textContent = "00")
      : (score.textContent -= this.power);
}

const bomb = new Ennemies("Bob-ombs", 5, document.querySelector(".bomb"));

const toad = document.getElementById("toad");
const howto = document.getElementById("howto");
var coins;
const point = document.getElementById("points");
var score = document.querySelector("#points>p");
var grille = document.getElementsByClassName("grille");
const grid = 275;
var lastCoin = Math.floor(1 + Math.random() * grid);
const coinSoundURL =
  "https://freesound.org/data/previews/341/341695_5858296-lq.mp3";
const soundTrackMarioURL =
  "http://23.237.126.42/ost/super-mario-bros.-3/rifwvpjl/01%20-%20Grass%20Land.mp3";
doItXtimes(createACoin, 5);
coins.forEach(a => a.addEventListener("click", coinClicked));
var foo = new Audio(soundTrackMarioURL);
howto.onclick = () => {
  foo.paused ? foo.play() : foo.pause();
};

function mouseOverBomb() {
  bomb.attack();
  bomb.dom.classList.remove("bomb");
  bomb.dom.classList.add("bomb-explose");
  setTimeout(stopWalking, 1000);
  playSound(
    "http://www.mariomayhem.com/downloads/sounds/mario_64_sound_effects/mario-woo.WAV"
  );
}

bomb.dom.addEventListener("mouseover", mouseOverBomb);
point.onclick = () => foo.pause();
const doItWalk = setInterval(bombWalk, 70);

function stopWalking() {
  bomb.dom.removeEventListener("mouseover", mouseOverBomb);
  clearInterval(doItWalk);
  bomb.dom.classList.remove("bomb-explose");
  coins = document.querySelectorAll(".coin:not(.flex)");
  coins.forEach(a => a.classList.remove("coin"));
  doItXtimes(createACoin, coins.length);
  coins.forEach(a => a.addEventListener("click", coinClicked));
}
function bombWalk() {
  bomb.x += 10;
  bomb.dom.style.transform = `translateX(${-bomb.x}px)`;
  console.log(window.innerWidth, bomb.x);
  if (bomb.x > window.innerWidth + 100) {
    bomb.x = -200;
  }
}

function coinClicked(e) {
  playSound(coinSoundURL);
  e.target.classList.toggle("coin");
  e.target.removeEventListener("click", coinClicked);
  score.textContent = twoDigits(+score.textContent + 1);
  if (!(+score.textContent % 10))
    playSound(
      "http://www.mariomayhem.com/downloads/sounds/mario_64_sound_effects/mario-woohoo.WAV"
    );
  createACoin();
  coins = document.querySelectorAll(".coin:not(.flex)");
  coins.forEach(a => a.addEventListener("click", coinClicked));
}

const twoDigits = n => (("" + n).length === 1 ? "0" + n : n);

function playSound(url) {
  new Audio(url).play();
}

function createACoin() {
  lastCoin = Math.floor(1 + Math.random() * grid);
  [...grille[lastCoin].classList].includes("coin") ||
  [...grille[lastCoin].classList].includes("bomb")
    ? createACoin()
    : grille[lastCoin].classList.toggle("coin");
  coins = document.querySelectorAll(".coin:not(.flex)");
}

function doItXtimes(f, times) {
  [...Array(times)].forEach(a => f());
}
