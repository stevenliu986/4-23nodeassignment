const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// tasks store
const tasks = [];
let id = 1;
const PORT = 3000;

// create a new task
app.post("/tasks", (req, res) => {
  const { description } = req.body;
  tasks.push({ id: id++, description: description, done: false });
  res.status(201).json("task added successfully");
});

// get all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// get task by id
app.get("/tasks/:id", (req, res) => {
  const result = tasks.find((task) => task.id === +req.params.id);
  res.send(result);
});

// update task by id

// delete task by id

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
