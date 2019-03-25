var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const basicAuth = require('express-basic-auth');

var basicAuthUsers;

try{
    basicAuthUsers = require('./users');
} catch (e) {
    basicAuthUsers = null;
}
const fs = require("fs");

// basicAuthUsers = { "Test" : "testPasswd", "Test2" : "anotherPasswd"};



var app = express();
// console.log(fs.readFileSync("./server.key").toString());

try{
    app.key = fs.readFileSync("./server.key").toString();
    app.cert = fs.readFileSync("./server.cert").toString();
    app.HTTPS = true;
    console.log("HTTPS enabled.")
} catch (e) {
    console.log("Key or Cert not found.");
    console.log("HTTPS NOT enable.");
    app.HTTPS = false;
}



app.use(logger(':remote-addr, :status - [:date[clf]] ":method :url" (:referrer)'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// console.log(basicAuthUsers);

if(basicAuthUsers){
    console.log("Setting app users from ./users.js");
    app.use(basicAuth({
            "users" : basicAuthUsers,
            challenge : true
        })
    );
} else {
    console.log("Basic Authentication disabled!");
}


module.exports = app;