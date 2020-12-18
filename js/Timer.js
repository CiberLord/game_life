(function () {

    let Timer = function (interval, callback) {
        this.callback = callback;
        this.interval = interval;
        this.counter = 0;
    }

    Timer.prototype.step = function (delta) {
        this.counter += delta;
        if (this.counter >= this.interval) {
            this.callback();
            this.counter = 0;
        }
    }
    Timer.prototype.setFps = function (fps) {
        this.interval = 1000 / fps;
    }
    window.Timer = Timer;
})();