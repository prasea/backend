import express from "express";
import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017", {
  dbName: "backendmaster"
})
  .then(res => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting to MongoDB", err));

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})
const User = new mongoose.model("users", schema);

const app = express();
app.post('/users/new', async (req, res) => {
  const newUser = await User.create({
    name: "John",
    email: "John",
    password: "John"
  })
  res.send(newUser)

})
app.get('/users/all', async (req, res) => {
  const users = await User.find({});
  return res.json({
    success: true,
    users
  })
})

app.listen(4000, () => {
  console.log("Listening on Port 4000")
})