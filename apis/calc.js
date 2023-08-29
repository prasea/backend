import express from "express"
import path from "path";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/calc');
})
app.get('/calc', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'views/calc.html'));
})
app.post('/calc', (req, res) => {
  const { num1, num2, operator } = (req.body);
  let result;
  const calculator = (num1, num2, op) => {
    switch (op) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      case '*':
        result = num1 * num2;
        break;
    }
    console.log(result);
  }
  const operand1 = parseInt(num1);
  const operand2 = parseInt(num2);
  calculator(operand1, operand2, operator);
  res.send("The result is " + result);
})


app.listen(2000);