const Orientation = require("./orientation.js");

class Ship {
  constructor(size) {
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
}

module.exports = Ship;
