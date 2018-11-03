// https://www.w3schools.com/nodejs/nodejs_raspberrypi_blinking_led.asp


function ButtonCouple(identifier, pinUp, pinDown) {

    if(pinDown === 0 || pinUp === 0) throw new Error("Cannot assign GPIO pin 0.");
    if(typeof identifier !== "string") throw new Error("Identifier must be a string");


    this.pinUp = pinUp;
    this.pinDown = pinDown;
    this.activePin = 0;

    this.identifier = identifier;


    this.up = function () {
        if(this.activePin === this.pinDown) return this.stop();
        if(this.activePin === this.pinUp) return this.activePin;
        this.activePin = this.pinUp;
    };

    this.down = function () {
        if(this.activePin === this.pinUp) return this.stop();
        if(this.activePin === this.pinDown) return this.activePin;
        this.activePin = this.pinDown;
    };

    this.switch = function () {
        if(this.activePin === this.pinDown){
            this.activePin = this.pinUp
        } else if(this.activePin === this.pinUp) {
            this.activePin = this.pinDown;
        }
    };

    this.status = function(){
        if(this.activePin === this.pinDown) return "down";
        if(this.activePin === this.pinUp) return "up";
        if(this.activePin === 0) return "off";
    };


    this.stop = function () {
        this.activePin= 0;
    };






}

module.exports = ButtonCouple;