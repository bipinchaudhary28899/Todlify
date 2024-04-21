const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const User = require("./models/User");
const { todo } = require("node:test");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtPassword = "123456";
const port = 3001;
app.use(express.json());
app.use(cors());

const connectionString =
  "mongodb+srv://refrt234:Refrt234@cluster0.yqnk1fe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(connectionString)
  .then(() => console.log("Connect to the DB.."))
  .catch((err) => console.log(err));

const middleware = async function (req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  const userexist = await User.findOne({ email: username, password: password });
  console.log(userexist);
  if (!userexist) {
    return res.status(404).json({ msg: "user not found" });
  }
  req.body.user_id = userexist._id;
  req.body.name = userexist.name;
  next();
};

const authmiddleware = async function (req, res, next) {
  try {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwttoken = words[1];
    const decoded = jwt.verify(jwttoken, jwtPassword);
    console.log(decoded);
    if (decoded.email) {
      const userexist = await User.findOne({ email: decoded.email });
      req.body.user_id = userexist._id;
      next();
    } else {
      return res.json({ msg: "You are not authenticated" });
    }
  } catch (e) {
    console.log(e);
    res.json({ msg: "Invalid signature" });
  }
};
//routes
app.get("/to-do-app", authmiddleware, async (req, res) => {
  const todos = await Todo.find({ user_id: req.body.user_id });
  res.json(todos);
});

app.post("/to-do-app/new", authmiddleware, async (req, res) => {
  const task = await Todo.create(req.body);
  res.status(201).json({ task });
});

app.delete("/to-do-app/delete/:id", authmiddleware, async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.put("/to-do-app/:id", authmiddleware, async (req, res) => {
  const { title, description, status, end_date, email } = req.body;
  //const token = req.headers.authorization;
  //const decoded = jwt.verify(token, jwtPassword);
  let todo = await Todo.findOne({ _id: req.params.id });
  console.log(todo);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todo.title = title;
  todo.description = description;
  todo.status = status;
  todo.end_date = end_date;
  todo.email = email;
  await todo.save();
  res.json(todo);
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existinguser = await User.findOne({ email: email });
  if (existinguser) {
    res.json("User already exist");
  }
  const user = new User({
    name: name,
    email: email,
    password: password,
  });
  await user.save();
  res.json(user);
});

app.post("/signin", middleware, async (req, res) => {
  const { username } = req.headers;
  var token = "Bearer " + jwt.sign({ email: username }, jwtPassword);
  return res.json({
    token,
    name: req.body.name,
  });
});

app.listen(port, console.log(`server is running on port ${port}`));
