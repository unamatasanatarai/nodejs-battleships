const Orientation = require("./orientation.js");

function Ship(size) {
  this.size = size;
  this.hits = 0;
  this.orientation = Orientation.HORIZONTAL;
  this.x = 0;
  this.y = 0;
}

Ship.prototype.hit = function() {
  this.hits++;
  return this;
};

Ship.prototype.isSunk = function() {
  return this.hits >= this.size;
};

module.exports = Ship;
