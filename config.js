var buttonCouple = require('./models/ButtonCouple');

// define 3 button couples

var _interface = {

    0 : new buttonCouple("Serranda 1",6, 1),
    1 : new buttonCouple("Serranda 2",2, 3),
    2 : new buttonCouple("Serranda 3",4, 5)

}

module.exports = _interface;