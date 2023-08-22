const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Create a new todo item
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const newTodo = await Todo.create({ title });
    return res.status(201).json(newTodo);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Read all todo items
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.json(todos);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update a todo item by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const todoToUpdate = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    if (!todoToUpdate) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json(todoToUpdate);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a todo item by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndRemove(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
