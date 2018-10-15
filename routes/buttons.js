var express = require('express');
var router = express.Router();
var myConfig = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify(myConfig));
});

router.get('/:id', function (req, res, next) {

    let obj = myConfig[req.params.id];

    if(obj === undefined) res.sendStatus(400);
    res.send(JSON.stringify(obj));

});

module.exports = router;
