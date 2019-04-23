let interface = {
    0 : {
        "identifier" :"test1",
        "activePin" : 0,
        "status" : function () {
            return (this.activePin === 0 ? "up" : "down");
        },
        "up" : function () {
            this.activePin = 0;
            return this.status();
        },
        "down" : function () {
            this.activePin = 1;
            return this.status();
        }
        "stop" : function () {
            this
        }
    }
}

module.exports = interface;