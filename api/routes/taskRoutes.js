'use strict'

const taskController = require('../controllers/taskController')

module.exports = function (app) {
  app.route('/api/tasks')
    .get(taskController.index)
    .post(taskController.create)

  app.route('/api/tasks/:taskId')
    .get(taskController.show)
    .put(taskController.update)
    .delete(taskController.del)
}
