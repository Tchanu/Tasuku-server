'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TaskSchema = new Schema({
    title: {
        type: String,
        Required: 'Title is required',
        maxLength: 50
    },
    description: {
      type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 2
    }
});


module.exports = mongoose.model('Tasks', TaskSchema);