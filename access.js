const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = function (app) {
  app.use('/api/tasks', function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token']

    if (token) {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.json({ message: 'Failed to authenticate token.' })
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      return res.status(403).send({
        message: 'No token provided.'
      })
    }
  })
}
