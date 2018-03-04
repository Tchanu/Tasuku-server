const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const token = require('../../token')

require('../models/userModel')

const User = mongoose.model('Users')

// Login
exports.login = function (req, res) {
  if (req.body.email === undefined || req.body.email.split('@').length < 2) {
    return res.send({
      message: 'Invalid email'
    })
  }
  if (req.body.password === undefined) {
    return res.send({
      message: 'Invalid password'
    })
  }
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) {
      if (err) return res.status(500).send(err)
    }
    if (user === null) {
      return res.send({
        message: 'The email or password you entered is incorrect'
      })
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      let data = token.generate({user_id: user._id, admin: user.admin})
      data.name = user.name
      console.log(data)
      res.status(200).send(data)
    } else {
      return res.send({
        message: 'The email or password you entered is incorrect'
      })
    }
  })
}

// Register
exports.register = function (req, res) {
  if (req.body.email === undefined || req.body.email.split('@').length < 2) {
    return res.send({
      message: 'Invalid email'
    })
  }
  if (req.body.name === undefined || (req.body.name.length < 2 || req.body.name.length > 13)) {
    return res.send({
      message: 'Name length must be between 3 and 12 characters'
    })
  }
  if (req.body.password === undefined || (req.body.password.length < 2 || req.body.password.length > 13)) {
    return res.send({
      message: 'Password length must be between 3 and 12 characters'
    })
  }

  // Mail used check
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) {
      if (err) return res.status(500).send(err)
    }
    if (user) {
      return res.send({
        message: 'Email is used'
      })
    }

    // Create a new user
    let hashedPassword = bcrypt.hashSync(req.body.password, 8)
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send(err)

      res.status(200).send({ status: 'success' })
    })
  })
}
