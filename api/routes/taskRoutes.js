const taskController = require('../controllers/taskController')
const token = require('../../token')

module.exports = function (app) {
  // Midleware
  app.use('/api/tasks', token.verify)

  app.route('/api/tasks')
    .get(token.verify, taskController.index)
    .post(taskController.create)

  app.route('/api/tasks/:taskId')
    .get(taskController.show)
    .put(taskController.update)
    .delete(taskController.del)
}
