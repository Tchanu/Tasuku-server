const userController = require('../controllers/userController')
const token = require('../../token')

module.exports = function (app) {
  app.route('/api/register')
    .post(userController.register)
  app.route('/api/login')
    .post(userController.login)

  // Refresh token
  app.route('/api/token')
    .get(token.refreshToken)
}
