var buttonCouple = require('./models/ButtonCouple');

// define 3 button couples

var _interface = {

    0 : new buttonCouple(6, 1),
    1 : new buttonCouple(2, 3),
    2 : new buttonCouple(4, 5)

}

module.exports = _interface;