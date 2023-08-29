document.addEventListener('keypress', function (e) {
  let pressedKey = (e.key);
  playAudio(pressedKey);
  makeAnimation(pressedKey);
});


let numberOfDrumButtons = document.querySelectorAll('.drum').length;
document.addEventListener('keypress', handleClick)
for (let i = 0; i < numberOfDrumButtons; i++) {
  document.querySelectorAll('.drum')[i].addEventListener('click', handleClick);
}
function handleClick(e) {
  let clickedBtnText = (e.target.textContent);
  playAudio(clickedBtnText);
  makeAnimation(clickedBtnText);
}
function playAudio(key) {
  let audio;
  switch (key) {
    case 'w':
      audio = new Audio('./sounds/crash.mp3')
      audio.play();
      break;
    case 'a':
      audio = new Audio('./sounds/kick-bass.mp3')
      audio.play();
      break;
    case 's':
      audio = new Audio('./sounds/snare.mp3')
      audio.play();
      break;
    case 'd':
      audio = new Audio('./sounds/tom-1.mp3')
      audio.play();
      break;
    case 'j':
      audio = new Audio('./sounds/tom-2.mp3')
      audio.play();
      break;
    case 'k':
      audio = new Audio('./sounds/tom-3.mp3')
      audio.play();
      break;
    case 'l':
      audio = new Audio('./sounds/tom-3.mp3')
      audio.play();
      break;

  }
}
function makeAnimation(btnText) {
  let activeBtn = document.querySelector("." + btnText);
  console.log(activeBtn);
  activeBtn.classList.add('pressed');
  setTimeout(function () {
    activeBtn.classList.remove('pressed');
  }, 100);
}