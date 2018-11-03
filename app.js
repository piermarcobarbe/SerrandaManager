var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var Gpio = require('onoff').Gpio;

var indexRouter = require('./routes/index');
var buttonsRouter = require('./routes/buttons');


var app = express();

// app.use(logger(':method :url (:remote-addr) ~ :status ~ :response-time ms'));

app.use(logger(':remote-addr, :status - [:date[clf]] ":method :url" (:referrer)'));


// app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/buttons', buttonsRouter);



module.exports = app;
