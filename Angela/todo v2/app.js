const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express()
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


/*
Array DataStructure as Database
const todoTasks = ["Buy Food", "Cook Food"];
const todoWorkTasks = [];
*/

mongoose.connect('mongodb://127.0.0.1:27017/todoDB');
const taskSchema = new mongoose.Schema({
  taskName: String
})
const Task = mongoose.model('Task', taskSchema);
const formattedDate = () => {
  const today = new Date();
  const options = {
    day: "numeric",
    weekday: "long",
    month: "long"
  }
  return today.toLocaleDateString("en-US", options);
}
const createDocument = async () => {
  try {
    const task1 = new Task({ taskName: "Buy Food" })
    const task2 = new Task({ taskName: "Cook Food" })
    const task3 = new Task({ taskName: "Eat Food" })
    await Task.insertMany([task1, task2, task3])
    console.log("Sucessfully inserted 3 tasks");
  } catch (err) {
    console.log(err);
  }
}


app.get('/', async (req, res) => {
  const todoTasks = await Task.find({});
  if (todoTasks.length === 0) {
    createDocument();
    return res.redirect('/');
  }
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
app.post('/', async (req, res) => {
  const newTask = req.body.task;
  if (newTask === "") {
    return res.render('error');
  }
  await Task.create({ taskName: newTask })
  res.redirect('/');
})
app.post('/delete', async (req, res) => {
  const deletedTask = await Task.findByIdAndRemove(req.body.checked);
  console.log(deletedTask)
  res.redirect('/')
})
app.listen(3000, () => console.log("TODO App Listening on Port 3000"));