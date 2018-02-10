let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let Task = require('./api/models/taskModel');
let app = express();
let port = 3001;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tasuku:ju4yfh68d52ofj@localhost/tasukudb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/taskuRoutes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('server started on: ' + port);