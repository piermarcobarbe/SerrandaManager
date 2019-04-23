var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var checkConfiguration = require('../checks/configurationCheck');

var myConfig;

if (fs.existsSync("config.js")){
    myConfig = require('../config');
    checkConfiguration(myConfig);
} else {
    myConfig = {};
}

var autoStopTimeout;

const checkAutoStopTimeout = function(){
    if(autoStopTimeout === null) return;
    clearTimeout(autoStopTimeout);
    autoStopTimeout = setTimeout(function () {
        console.log("Auto stopping!");
        for (let button in myConfig) {
            if (myConfig.hasOwnProperty(button)) {
                myConfig[button].stop();
            }
        }

    }, 1000*60);
};


router.get('/config', function(req, res, next) {
  res.send(JSON.stringify(myConfig));
});

// console.log(app);
router.get('/all/status', function(req, res, next) {

    // console.log(myConfig);
    let copyConfig = JSON.parse(JSON.stringify(myConfig));

    for (let button in copyConfig) {
        if(copyConfig.hasOwnProperty(button)) copyConfig[button] = myConfig[button].status();
    }
    console.log(copyConfig);

    res.send(JSON.stringify(copyConfig));
});

router.get('/all/status/up', function (req, res, next) {
    for (let button in myConfig) {
        if (myConfig.hasOwnProperty(button)) {
            myConfig[button].stopAsync(function () {
                myConfig[button].up();
            });
        }
    }
    checkAutoStopTimeout();
    res.send(JSON.stringify(myConfig));
});

router.get('/all/status/down', function (req, res, next) {
    for (let button in myConfig) {
        if (myConfig.hasOwnProperty(button)) {
            myConfig[button].stopAsync(function () {
                myConfig[button].down();
            });
        }
    }
    checkAutoStopTimeout();
    res.send(JSON.stringify(myConfig));
});

router.get('/all/status/stop', function (req, res, next) {

    for (let button in myConfig) {
        if (myConfig.hasOwnProperty(button)) {
            myConfig[button].stop();
        }
    }
    res.send(JSON.stringify(myConfig));
});


router.get('/:id', function (req, res, next) {

    let obj = myConfig[req.params.id];

    if(obj === undefined) res.sendStatus(400);
    res.send(JSON.stringify(obj));

});

router.get('/:id/status', function (req, res, next) {
    let button = myConfig[req.params.id];

    if(button === undefined) return res.sendStatus(400);
    res.send(JSON.stringify(button.activePin));
});


router.get('/:id/status/switch', function (req, res, next) {
    let button = myConfig[req.params.id];
    if(button === undefined) return res.sendStatus(400);

    button.switch();
    checkAutoStopTimeout();

    res.send(JSON.stringify(button.activePin));
});

router.get('/:id/status/up', function (req, res, next) {
    let button = myConfig[req.params.id];
    if(button === undefined) return res.sendStatus(400);

    myConfig[req.params.id].up();
    checkAutoStopTimeout();

    res.send(JSON.stringify(button.activePin));
});


router.get('/:id/status/down', function (req, res, next) {
    let button = myConfig[req.params.id];
    if(button === undefined) return res.sendStatus(400);

    myConfig[req.params.id].down();
    checkAutoStopTimeout();

    res.send(JSON.stringify(button.activePin));
});

router.get('/:id/status/stop', function (req, res, next) {
    let button = myConfig[req.params.id];
    if(button === undefined) return res.sendStatus(400);

    myConfig[req.params.id] = button.stop();
    checkAutoStopTimeout();
    res.send(JSON.stringify(button.activePin));
});



module.exports = router;
