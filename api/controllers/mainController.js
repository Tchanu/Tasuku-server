/* eslint-disable max-len */
'use strict';

const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

// all
exports.list_all_tasks = function(req, res) {
    Task.find({}, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
};

// add
exports.create_a_task = function(req, res) {
    const newTask = new Task(req.query);
    newTask.save((err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
};

// index
exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
};

// put
exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.query, {new: true}, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
};

// delete
exports.delete_a_task = function(req, res) {
    Task.remove({
        _id: req.params.taskId,
    }, (err) => {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Task successfully deleted'});
    });
};
