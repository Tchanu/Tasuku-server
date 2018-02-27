const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./api/routes/taskuRoutes');
const app = express();
const port = 3001;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tasuku:ju4yfh68d52ofj@localhost/tasukudb');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`});
});

app.listen(port);

console.log(`server started on: ${port}`);
