function ButtonCouple(pinUp, pinDown) {

    if(pinDown === 0 || pinUp === 0) throw new Error("Cannot assign GPIO pin 0.");

    this.pinUp = pinUp;
    this.pinDown = pinDown;
    this.activePin= 0;

    this.up = function () {
        if(this.activePin === 0) this.activePin = this.pinUp;
        if(this.activePin === this.pinDown) return this.stop();
        if(this.activePin === this.pinUp) return this.activePin;
    };

    this.down = function () {
        if(this.activePin === 0) this.activePin = this.pinDown;
        if(this.activePin === this.pinUp) return this.stop();
        if(this.activePin === this.pinDown) return this.activePin;
    };

    this.switch = function () {
        if(this.activePin === this.pinDown){
            this.activePin = this.pinUp
        } else if(this.activePin === this.pinUp) {
            this.activePin = this.pinDown;
        }
    };

    this.stop = function () {
        this.activePin= 0;
    };

}

module.exports = ButtonCouple;