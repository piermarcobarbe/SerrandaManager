var buttonCouple = require("./models/ButtonCouple");

let interface = {
    0 : new buttonCouple("Switch 1", 14, 15),
    1 : new buttonCouple("Switch 2", 18, 23),
    2 : new buttonCouple("Switch 3", 24, 25)

}

module.exports = interface;
