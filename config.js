var buttonCouple = require('./models/ButtonCouple');

// define 3 button couples

var _interface = {

    0 : new buttonCouple("Serranda 1",1, 2),
    1 : new buttonCouple("Serranda 2",3, 4),
    2 : new buttonCouple("Serranda 3",5, 6)

}

module.exports = _interface;