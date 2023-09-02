require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const encrypt = require('mongoose-encryption')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/userDB');
const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });
const User = mongoose.model("User", userSchema);

app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username.length === 0 || password.length === 0)
      return res.send("Username & Password Field Cannot Be Left Empty");
    else {
      bcrypt.hash(password, 10, async function (err, hash) {
        await User.create({ email: username, password: hash });
        return res.render('secrets');
      });
    }
  } catch (err) {
    console.log("Registeration Failed " + err);
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUsername = await User.findOne({ email: username });
    console.log(foundUsername);
    bcrypt.compare(password, foundUsername.password, function (err, result) {
      if (result === true) {
        res.render('secrets');
      }
    });
  } catch (err) {
    console.log("User doesn't exisit " + err);
  }
});
app.listen(3000, () => console.log("Server Running on PORT 3000"));