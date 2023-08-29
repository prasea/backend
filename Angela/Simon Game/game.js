let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;

function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColor);
  level++;
  $('h1').text(`Level ${level}`);
}
function playAudio(audioName) {
  let sound = new Audio(`./sounds/${audioName}.mp3`);
  sound.play();
}
// $(document).on('click', nextSequence);

// To Detect if any of the buttons are clicked
$('.btn').on('click', e => {
  let userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor)
  playAudio(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)
})

function animatePress(currentColor) {
  $('#' + currentColor).addClass("pressed");
  setTimeout(() => {
    $('#' + currentColor).removeClass("pressed");
  }, 100)
}
// Game Starts
$(document).on('keypress', () => {
  if (!gameStarted) {
    $('h1').text(`Level ${level}`);
    nextSequence();
    gameStarted = true;
  }
});

// compare gamePatterhn against userClickedPattern 
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence()
      }, 1000)
    }
  } else {
    playAudio("wrong");
    $('body').addClass('game-over');
    setTimeout(() => $('body').removeClass('game-over'), 200);
    $('h1').text("Game Over, Press Any Key to Restart");
    startOver()
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}