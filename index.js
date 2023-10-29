const { log } = require("console");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
let posts = [
  {
    id: uuidv4(),
    username: "Salaman Khan",
    content:
      "You must be the change you wish to see in the world. -Mahatma Gandhi",
  },
  {
    id: uuidv4(),
    username: "Vivek Dhakad",
    content:
      "Spread love everywhere you go. Let no one ever come to you without leaving happier. -Mother Teresa",
  },
  {
    id: uuidv4(),
    username: "Ashutosh Singh",
    content:
      "The only thing we have to fear is fear itself. -Franklin D. Roosevelt ",
  },
];

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id === post.id);
  res.render("show.ejs", { post });
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id === post.id);
  res.render("edit.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((post) => id === post.id);
  post.content = newContent;
  res.redirect("/posts");
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => id !== post.id);
  res.redirect("/posts");
});
app.listen(port, () => {
  console.log("app is listening port 8080");
});
