'use strict';

let mongoose = require('mongoose');
let Task = mongoose.model('Tasks');

//all
exports.list_all_tasks = function (req, res) {
    Task.find({}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//add
exports.create_a_task = function (req, res) {
    let new_task = new Task(req.query);
    new_task.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//index
exports.read_a_task = function (req, res) {
    Task.findById(req.params.taskId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//put
exports.update_a_task = function (req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

//delete
exports.delete_a_task = function (req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({message: 'Task successfully deleted'});
    });
};