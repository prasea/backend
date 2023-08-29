let randomNumber1 = Math.ceil(Math.random() * 6);
let randomNumber2 = Math.ceil(Math.random() * 6);
document.querySelector('.img1').setAttribute('src', `./images/dice${randomNumber1}.png`);
document.querySelector('.img2').setAttribute('src', `./images/dice${randomNumber2}.png`);

const title = document.querySelector('h1');
if (randomNumber1 === randomNumber2) {
  title.textContent = "Draw";
} else if (randomNumber1 > randomNumber2) {
  title.textContent = "Player1 Wins"
} else {
  title.textContent = "Player2 Wins"
}
