var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const basicAuth = require('express-basic-auth');
const basicAuthUsers = require('./users');

// basicAuthUsers = { "Test" : "testPasswd", "Test2" : "anotherPasswd"};

var indexRouter = require('./routes/index');
var buttonsRouter = require('./routes/buttons');

var app = express();

app.use(logger(':remote-addr, :status - [:date[clf]] ":method :url" (:referrer)'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(basicAuth({
    "users" : basicAuthUsers,
    challenge : true
})
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/buttons', buttonsRouter);

module.exports = app;