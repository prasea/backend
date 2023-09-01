const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const formattedDate = () => {
  const today = new Date();
  const options = {
    day: "numeric",
    weekday: "long",
    month: "long"
  }
  return today.toLocaleDateString("en-US", options);
}


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
const listSchema = new mongoose.Schema({
  name: String,
  tasks: [taskSchema]
})
const List = mongoose.model("List", listSchema);

const task1 = new Task({ taskName: "Buy Food" })
const task2 = new Task({ taskName: "Cook Food" })
const task3 = new Task({ taskName: "Eat Food" })
const defaultTasks = [task1, task2, task3];


app.get('/', async (req, res) => {
  const todoTasks = await Task.find({});
  if (todoTasks.length === 0) {
    await Task.insertMany(defaultTasks);
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
app.get('/:type', async (req, res) => {
  const customTodoName = req.params.type;
  // Check if the List with name=type already exists. 
  const foundList = await List.findOne({ name: customTodoName }).exec();
  if (!foundList) {
    // Create a new List
    const newList = await List.create({
      name: customTodoName,
      tasks: defaultTasks
    });
    res.redirect('/' + newList.name);
  } else {
    // Show an exisiting List
    res.render('list', {
      listTitle: foundList.name,
      tasks: foundList.tasks
    });
  }
})
app.post('/', async (req, res) => {
  const taskName = req.body.task;
  const listName = req.body.listType;
  const userSubmittedTask = new Task({ taskName });
  if (taskName === "") {
    return res.render('error');
  }
  if (listName === formattedDate()) {
    userSubmittedTask.save();
    return res.redirect('/');
  } else {
    const foundList = await List.findOne({ name: listName });
    foundList.tasks.push(userSubmittedTask);
    foundList.save();
    return res.redirect('/' + listName)
  }

})
app.post('/delete', async (req, res) => {
  const listName = req.body.listType;
  const checkedItemId = req.body.checked;
  if (listName === formattedDate()) {
    const deletedTask = await Task.findByIdAndRemove(checkedItemId);
    console.log(deletedTask)
    res.redirect('/')
  } else {
    const listDocs = await List.findOne({ name: listName }).exec();
    const updatedTasks = listDocs.tasks.filter(task => (task._id).valueOf() != checkedItemId);
    await List.updateOne({ name: listName }, { tasks: updatedTasks });
    res.redirect('/' + listName);
  }
})
app.listen(3000, () => console.log("TODO App Listening on Port 3000"));