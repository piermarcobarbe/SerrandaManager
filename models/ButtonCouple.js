// https://www.w3schools.com/nodejs/nodejs_raspberrypi_blinking_led.asp

console.log(`This platform is ${process.platform}`);
if(process.platform === "linux"){
    var Gpio = require('onoff').Gpio;
} else {
    // console.log(__dirname);
    var Gpio = require("./fakeGpio").Gpio;
}


// 1 -> switch closed (current passing)
// 0 -> switch opened (current NOT passing)


function ButtonCouple(identifier, pinUp, pinDown) {

    if(pinDown === 0 || pinUp === 0) throw new Error("Cannot assign GPIO pin 0.");
    if(typeof identifier !== "string") throw new Error("Identifier must be a string");


    try{
        // this.pinUp = pinUp;
        console.log("setting up Gpio " + pinUp);
        this.pinUp = new Gpio(pinUp, 'out');
    } catch (e) {
        throw e;
    }

    try {
        console.log("setting up Gpio " + pinDown);
        this.pinDown = new Gpio(pinDown, 'out');
    } catch (e) {
        throw e;
    }

    this.identifier = identifier;
    this.activePin = 0;

    this.up = function () {
        if(this.activePin === this.pinDown) return this.stop();
        if(this.activePin === this.pinUp) return this.activePin._gpio;
        this.pinUp.writeSync(0);
        this.activePin = this.pinUp;
    };

    this.upAsync = function (cb) {
        this.up();
        if(cb) cb();
    }

    this.down = function () {
        if(this.activePin === this.pinUp) return this.stop();
        if(this.activePin === this.pinDown) return this.activePin._gpio;
        this.pinDown.writeSync(0);
        this.activePin = this.pinDown;
    };

    this.downAsync = function (cb) {
        this.down();
        if(cb) cb();
    }

    this.switch = function () {
        if(this.activePin === this.pinDown){
            this.pinDown.writeSync(1);
            this.pinUp.writeSync(0);
            this.activePin = this.pinUp
        } else if(this.activePin === this.pinUp) {
            this.pinUp.writeSync(1);
            this.pinDown.writeSync(0);
            this.activePin = this.pinDown;
        }
    };

    this.status = function(){
        if(this.activePin === this.pinDown) return "down";
        if(this.activePin === this.pinUp) return "up";
        return "off";
    };


    this.stopAsync = function (cb) {
        this.stop();
        if (cb) cb();
    };

    this.stop = function () {
        if(this.activePin !== 0){
            this.pinUp.writeSync(1);
            this.pinDown.writeSync(1);
            this.activePin= 0;
        }
    };



    this.stop();



}

module.exports = ButtonCouple;