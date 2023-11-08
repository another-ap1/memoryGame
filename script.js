const gameContainer = document.getElementById("game");
const newGame = document.getElementById("newGame");
const scoreDisplay = document.getElementById("score");

let tempCard = null;
let cardOne = null;
let cardTwo = null;
let score = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if(noClicking) return;
  if(event.target.classList.contains("flipped")) return;

  score += 1;
  scoreDisplay.innerText = score;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];
  console.log(currentCard.classList.value);

  if(!cardOne || !cardTwo){
    currentCard.classList.add("flipped");
    cardOne = cardOne || currentCard;
    cardTwo = currentCard === cardOne ? null : currentCard;
  }

  if(cardOne && cardTwo){
    noClicking = true;

    if(cardOne.classList.value === cardTwo.classList.value){
      //score += 2;
      //scoreDisplay.innerText = score;
      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);
      cardOne = null;
      cardTwo = null;
      noClicking = false;
    } else {
      setTimeout(function(){
        cardOne.style.backgroundColor = "";
        cardTwo.style.backgroundColor = "";
        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");
        cardOne = null;
        cardTwo = null;
        noClicking = false;
      },1000)
    }

  }
}

//create a new game
newGame.addEventListener("click", function(e){
  location.reload();
})

// when the DOM loads
createDivsForColors(shuffledColors);
