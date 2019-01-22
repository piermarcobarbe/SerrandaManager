class Gpio {
    constructor(gpio) {
        this._gpio = gpio;
        this.active = 0;
        }


    read(callback) {
        callback(this.active);
    }

    readSync() {
        return this.active;
    }

    write(value, callback) {
        this.active = value;
        callback(this.active);
    }

    writeSync(value) {
        if((value === 1) || (value === 0)){
            this.active = value;
            console.log("GPIO " + this._gpio + ": Changed value to " + value);
        }
        return this.active;

    }

}

exports.Gpio = Gpio;
