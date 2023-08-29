const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const todoTasks = [];
const todoWorkTasks = [];
const formattedDate = () => {
  const today = new Date();
  const options = {
    day: "numeric",
    weekday: "long",
    month: "long"
  }
  return today.toLocaleDateString("en-US", options);
}

app.get('/', (req, res) => {
  res.render('list', {
    listTitle: formattedDate(),
    tasks: todoTasks
  });
})
app.get('/error', (req, res) => {
  res.redirect('/');
})
app.get('/work', (req, res) => {
  res.render("list", { listTitle: "Work", tasks: todoWorkTasks })
})
app.post('/', (req, res) => {
  const newTask = req.body.task;
  if (newTask === "")
    res.render('error');
  if (req.body.button === "Work") {
    todoWorkTasks.push(newTask);
    res.redirect('/work');
  } else {
    todoTasks.push(req.body.task);
    res.redirect('/');
  }


})
app.listen(3000, () => console.log("TODO App Listening on Port 3000"));