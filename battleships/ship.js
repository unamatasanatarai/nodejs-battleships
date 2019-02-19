const Orientation = require("./orientation");

class Ship {
    constructor(size = 4) {
        this.size = size;
        this.hits = 0;
        this.orientation = Orientation.HORIZONTAL;
        this.x = 0;
        this.y = 0;
    }

    hit() {
        this.hits++;
        return this;
    }

    isSunk() {
        return this.hits >= this.size;
    }

    randomizeOrientation() {
        this.orientation =
            Math.random() > 0.5 ? Orientation.VERTICAL : Orientation.HORIZONTAL;
    }
}

module.exports = Ship;
