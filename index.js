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
  const tempObj = { id: id++, description: description, done: false };
  tasks.push(tempObj);
  res.status(201).json(tempObj);
});

// get all tasks
app.get("/tasks", (req, res) => {
  const { description } = req.query;
  if (description) {
    // if description is specified
    const result = tasks.filter((task) => task.description === description);
    res.status(200).json(result);
    return;
  }
  res.status(200).json(tasks);
});

// get task by id
app.get("/tasks/:id", (req, res) => {
  const result = tasks.find((task) => task.id === +req.params.id);
  res.json(result);
});

// update task by id
app.put("/tasks/:id", (req, res) => {
  const { description, done } = req.body;
  // 判断description/done的值是否为空
  if (!description || !done) {
    res.sendStatus(404);
    return;
  }
  const result = tasks.find((task) => task.id === +req.params.id);
  result["description"] = description;
  result["done"] = true;
  res.status(200).json(result);
});

// delete task by id
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((task) => task.id === +req.params.id);
  // res.json(index);
  tasks.splice(index, 1);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
