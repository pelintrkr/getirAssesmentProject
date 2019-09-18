var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./route/records');

var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to db
mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study', { useNewUrlParser: true });
if (mongoose.connection) {
    console.log('Database connection established');
} else {
    console.log('Database connection error!');
}

app.use('/api', router);

var server = app.listen(port, function () {
    console.log('server running on port ' + port);
});

module.exports = server;