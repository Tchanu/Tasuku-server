const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Users', TaskSchema)
