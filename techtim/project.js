const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
  "A": 2,
  "B": 4,
  "C": 6,
  "D": 8
}
const SYMBOLS_VALUES = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2
}
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numDepositAmount = parseFloat(depositAmount);
    if (isNaN(numDepositAmount) || numDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again !");
    } else {
      return numDepositAmount;
    }
  }
}
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines you wanna bet on (1-3): ");
    const numberOfLines = parseFloat(lines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid choice, the number of lines must be a valid number between 1 to 3!");
    } else {
      return numberOfLines;
    }
  }
}
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the amount you want to bet per line: ");
    const numberBet = parseFloat(bet);
    const permissableBetAmount = balance / lines;
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > permissableBetAmount) {
      console.log(`Invalid choice, the bet amount must be a valid number between 1 to ${permissableBetAmount}!`);
    } else {
      return numberBet;
    }
  }
}

const balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);