const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post Title Cannot Be Left Emmpty"]
  },
  body: {
    type: String,
    required: [true, "Post Body Cannot Be Left Emmpty"]
  },
})
const Post = mongoose.model("Post", postSchema);


app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render("home", { homeStartingContent, posts });
})
app.get('/about', (req, res) => {
  res.render("about", { aboutContent });
})
app.get('/contact', (req, res) => {
  res.render("contact", { contactContent });
})
app.get('/update', async (req, res) => {
  const postId = req.query.id;
  const updPost = await Post.findById(postId);
  res.render('compose', { id: updPost._id, title: updPost.title, body: updPost.body });
})
app.get('/compose', (req, res) => {
  res.render("compose");
})
app.get('/posts/:id', async (req, res) => {
  const postId = (req.params.id);
  const isValid = mongoose.isValidObjectId(postId);
  if (isValid) {
    const post = await Post.findById(postId);
    res.render('post', { id: post._id, title: post.title, body: post.body });
  } else {
    console.log("Invalid Id");
  }
})
app.post('/compose', async (req, res) => {
  const { postTitle, postBody } = req.body;
  await Post.create({ title: postTitle, body: postBody })
  res.redirect('/');
})

app.post('/delete', async (req, res) => {
  const id = req.body.postId;
  await Post.findByIdAndDelete(id);
  return res.redirect('/');
})
app.post('/update', async (req, res) => {
  const postId = req.query.id;
  const { postTitle, postBody } = req.body;
  await Post.findByIdAndUpdate(postId, { title: postTitle, body: postBody })
  res.redirect('/')
})
app.listen(3000, function () {
  console.log("Server started on port 3000");
});