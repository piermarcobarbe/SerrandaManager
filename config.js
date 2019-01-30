var buttonCouple = require('./models/ButtonCouple');

// https://raspi.tv/2013/rpi-gpio-basics-4-setting-up-rpi-gpio-numbering-systems-and-inputs

var _interface = {

    0 : new buttonCouple("Switch 1", 1, 2),
    1 : new buttonCouple("Switch 2", 3, 4),
    2 : new buttonCouple("Switch 3", 5, 6)

}

module.exports = _interface;