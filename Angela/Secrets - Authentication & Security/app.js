require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose');
const session = require('express-session')
const passportLocalMongoose = require('passport-local-mongoose')
const passport = require('passport')


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
  secret: 'Jai Nepal',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session());


mongoose.connect('mongodb://127.0.0.1:27017/userDB');
const userSchema = new mongoose.Schema({
  email: String,
  password: String
})
userSchema.plugin(passportLocalMongoose)
const User = mongoose.model("User", userSchema);

// Simplified Passport/Passport-Local Configuration : Your code would be longer had you only used passport or passport-local.
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/secrets', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets')
  } else {
    res.redirect('/login');
  }
});
app.get('/logout', function (req, res) {
  // req.session.destroy(function (err) {
  //   res.redirect('/'); 
  // });
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  User.register({ username: username }, password, function (err, newRegisteredUser) {
    if (err) {
      console.log(err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, () => res.redirect('/secrets'));
    }
  })
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  // Using PassportJS to Login & Authenticate.
  req.login(user, function (err) {
    if (err) {
      console.log(err);
      return res.redirect('/login');
    }
    return res.render('secrets');
  });
});
app.listen(3000, () => console.log("Server Running on PORT 3000"));