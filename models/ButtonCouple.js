function ButtonCouple(pinUp, pinDown) {

    this.pinUp = pinUp;
    this.pinDown = pinDown;
    this.activeButton = null;

    up = function () {
        if(this.activeButton === null) this.activeButton = this.pinUp;
        if(this.activeButton === this.pinDown) this.activeButton = null;
        if(this.activeButton === this.pinUp) return;
    }

    down = function () {
        if(this.activeButton === null) this.activeButton = this.pinDown;
        if(this.activeButton === this.pinUp) this.activeButton = null;
        if(this.activeButton === this.pinDown) return;
    }

}

module.exports = ButtonCouple;