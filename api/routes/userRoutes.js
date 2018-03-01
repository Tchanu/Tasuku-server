const userController = require('../controllers/userController')

module.exports = function (app) {
  app.route('/api/register')
    .post(userController.register)
  app.route('/api/login')
    .post(userController.login)
}
