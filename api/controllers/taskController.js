const mongoose = require('mongoose')

require('../models/taskModel')

const Task = mongoose.model('Tasks')

// Index
exports.index = function (req, res) {
  Task.find({
    user_id: req.decoded.user_id
  }, (err, task) => {
    if (err) {
      res.send(err)
    }
    res.json(task)
  })
}

// Create
exports.create = function (req, res) {
  req.query.user_id = req.decoded.user_id
  const newTask = new Task(req.query)

  newTask.save((err, task) => {
    if (err) {
      res.send(err)
    }
    res.json(task)
  })
}

// Show
exports.show = function (req, res) {
  Task.findOne({
    _id: req.params.taskId,
    user_id: req.decoded.user_id
  }, (err, task) => {
    if (err) {
      res.send(err)
    }
    res.json(task)
  })
}

// Update
exports.update = function (req, res) {
  Task.findOneAndUpdate({
    _id: req.params.taskId,
    user_id: req.decoded.user_id
  },
  req.query, {new: true},
  (err, task) => {
    if (err) {
      res.send(err)
    }
    res.json(task)
  })
}

// Delete
exports.del = function (req, res) {
  Task.remove({
    _id: req.params.taskId,
    user_id: req.decoded.user_id
  }, (err) => {
    if (err) {
      res.send(err)
    }
    res.json({message: 'Task deleted successfully'})
  })
}
