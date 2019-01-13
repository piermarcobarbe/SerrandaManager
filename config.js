var buttonCouple = require('./models/ButtonCouple');

// http://pi4j.com/images/j8header-3b.png

var _interface = {

    0 : new buttonCouple("Switch 1", 1, 2),
    1 : new buttonCouple("Switch 2", 3, 4),
    2 : new buttonCouple("Switch 3", 5, 6)

}

module.exports = _interface;