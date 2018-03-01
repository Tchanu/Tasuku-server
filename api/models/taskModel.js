const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
    Required: 'Title is required',
    maxLength: 50
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 2
  },
  user_id: {
    type: String,
    Required: 'user_id is required'
  }
})

module.exports = mongoose.model('Tasks', TaskSchema)
