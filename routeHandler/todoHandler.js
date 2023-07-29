const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchemas");

// Model
const Todo = new mongoose.model("Todo", todoSchema);
//get all todos
router.get("/", async (req, res) => {
  await Todo.find({ status: "active" })
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .limit(2)
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Successfully Get Todos!.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: "There was an error",
      });
      console.log(err);
    })
    .finally(async () => {
      await mongoose.connection.close();
    });
});

//get a todo by ID
router.get("/:id", async (req, res) => {
  await Todo.findOne({ _id: req.params.id })
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Successfully Get a Todo!.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: "There was an error",
      });
      console.log(err);
    })
    .finally(async () => {
      await mongoose.connection.close();
    });
});

//post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo
    .save()
    .then(() => {
      res.status(201).json({
        status: "success",
        message: "Successfully Sent Todo.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: "There was an error",
      });
      console.log(err);
    })
    .finally(async () => {
      await mongoose.connection.close();
    });
});

//post multiple todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body)
    .then(() => {
      res.status(201).json({
        status: "success",
        message: "Successfully Sent Multiple Todo.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: "There was an error",
      });
      console.log(err);
    })
    .finally(async () => {
      await mongoose.connection.close();
    });
});

//put a todo
router.put("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    },
    { useFindAndModify: false }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Successfully Update a Todo.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: "There was an error",
      });
      console.log(err);
    })
    .finally(async () => {
      await mongoose.connection.close();
    });
});

//delete a todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Todo was delete successfully!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: "There was an error",
      });
      console.log(err);
    })
    .finally(async () => {
      await mongoose.connection.close();
    });
});

module.exports = router;
