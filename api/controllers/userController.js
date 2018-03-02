const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const token = require('../../token')

require('../models/userModel')

const User = mongoose.model('Users')

// Login
exports.login = function (req, res) {
  if (req.query.email === undefined || req.query.email.split('@').length < 2) {
    return res.send({
      message: 'Invalid email'
    })
  }
  if (req.query.password === undefined) {
    return res.send({
      message: 'Invalid password'
    })
  }
  User.findOne({email: req.query.email}, function (err, user) {
    if (err) {
      if (err) return res.status(500).send(err)
    }
    if (user === null) {
      return res.send({
        message: 'The email or password you entered is incorrect'
      })
    }

    if (bcrypt.compareSync(req.query.password, user.password)) {
      res.status(200).send(token.generate({
        user_id: user._id,
        admin: user.admin // Todo admin features
      }))
    }
  })
}

// Register
exports.register = function (req, res) {
  if (req.query.email === undefined || req.query.email.split('@').length < 2) {
    return res.send({
      message: 'Invalid email'
    })
  }
  if (req.query.name === undefined || (req.query.name.length < 2 || req.query.name.length > 13)) {
    return res.send({
      message: 'Name length must be between 3 and 12 characters'
    })
  }
  if (req.query.password === undefined || (req.query.password.length < 2 || req.query.password.length > 13)) {
    return res.send({
      message: 'Password length must be between 3 and 12 characters'
    })
  }

  // Mail used check
  User.findOne({email: req.query.email}, function (err, user) {
    if (err) {
      if (err) return res.status(500).send(err)
    }
    if (user) {
      return res.send({
        message: 'Email is used'
      })
    }

    // Create a new user
    let hashedPassword = bcrypt.hashSync(req.query.password, 8)
    User.create({
      name: req.query.name,
      email: req.query.email,
      password: hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send(err)

      res.status(200).send(token.generate({
        user_id: user._id
      }))
    })
  })
}
