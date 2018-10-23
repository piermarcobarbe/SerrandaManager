function ButtonCouple(pinUp, pinDown) {

    if(pinDown === 0 || pinUp === 0) throw new Error("Cannot assign GPIO pin 0.");


    this.pinUp = pinUp;
    this.pinDown = pinDown;
    this.activePin = 0;
    this.upTimeout = 0;
    this.downTimeout = 0;

    // flapPosition indicates whether flaps are opened or closed. 1 means opened.
    this.flapPosition = 1;

    // flapInterval indicates the time for flaps to fully rotate. It is now approx to 500ms.
    // this time unit is used in this file as flag for determining if a flap fully rotated or not.
    this.flapInterval = 500;


    this.up = function () {
        if(this.activePin === 0) {
            clearTimeout(this.downTimeout);

            this.activePin = this.pinUp;

            this.upTimeout = setTimeout(function () {
                this.flapPosition = 1;
            }, this.flapInterval);

        }
        if(this.activePin === this.pinDown) return this.stop();
        if(this.activePin === this.pinUp) return this.activePin;
    };

    this.down = function () {
        if(this.activePin === 0) {

            if(this.upTimeout) clearTimeout(this.upTimeout);

            this.activePin = this.pinDown;

            this.downTimeout = setTimeout(function () {
                this.flapPosition = 0;
            }, this.flapInterval);

        }
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

    this.status = function(){
        if(this.activePin === this.pinDown) return "down";
        if(this.activePin === this.pinUp) return "up";
        if(this.activePin === 0) return "off";
    };


    this.stop = function () {
        this.activePin= 0;
    };

    this.flip = function () {

        if(this.flapPosition === 0){

            this.up();
            setTimeout(function () {
                this.stop();
            }, this.flapInterval);

        } else if(this.flapPosition === 1){ 

            this.down()
            setTimeout(function () {
                this.stop()
            }, this.flapInterval)

        }
    }


}

module.exports = ButtonCouple;