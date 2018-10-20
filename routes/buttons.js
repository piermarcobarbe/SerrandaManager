var express = require('express');
var router = express.Router();
var myConfig = require('../config');


router.get('/', function(req, res, next) {
    let copyConfig = JSON.parse(JSON.stringify(myConfig));


    for (let button in copyConfig) {
        copyConfig[button] = myConfig[button].status();
        // if (myConfig.hasOwnProperty(button)) {
        //     button.stop();
        // }
    }


  res.send(JSON.stringify(copyConfig));
});


router.get('/all/status/stop', function (req, res, next) {

    for (let button in myConfig) {
        myConfig[button].stop();
        // if (myConfig.hasOwnProperty(button)) {
        //     button.stop();
        // }
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

    res.send(JSON.stringify(button.activePin));
});

router.get('/:id/status/up', function (req, res, next) {
    let button = myConfig[req.params.id];
    if(button === undefined) return res.sendStatus(400);

    button.up();

    res.send(JSON.stringify(button.activePin));
});


router.get('/:id/status/down', function (req, res, next) {
    let button = myConfig[req.params.id];
    if(button === undefined) return res.sendStatus(400);

    button.down();

    res.send(JSON.stringify(button.activePin));
});

router.get('/:id/status/stop', function (req, res, next) {
    let button = myConfig[req.params.id];
    if(button === undefined) return res.sendStatus(400);

    button.stop();

    res.send(JSON.stringify(button.activePin));
});



module.exports = router;
