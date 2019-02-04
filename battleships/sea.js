const Shot = require("./shot.js");
const Orientation = require("./orientation.js");

function Sea(width, height) {
  this.width = width;
  this.height = height;
  this.ships = Array();
  this.shots = Array(this.height);
  for (let i = 0; i < this.height; i++) {
    this.shots[i] = Array(this.width).fill(0);
  }
  this.shipPositions = Array(this.height);
  for (let i = 0; i < this.height; i++) {
    this.shipPositions[i] = Array(this.width).fill(0);
  }
}

Sea.prototype.hasShipAt = function(x, y) {
  return typeof this.shipPositions[y][x] === "object";
};

Sea.prototype.shoot = function(x, y) {
  if (x >= this.width || y >= this.height || x < 0 || y < 0) {
    return Shot.MISS;
  }
  this.shots[y][x] = 1;
  if (this.hasShipAt(x, y)) {
    let ship = this.shipPositions[y][x];
    ship.hit();
    this.shots[y][x] = 2;
    return ship.isSunk() ? Shot.SUNK : Shot.HIT;
  }

  return Shot.MISS;
};

Sea.prototype.launchShip = function(ship) {
  if (ship.orientation == Orientation.HORIZONTAL) {
    for (let x = ship.x; x < ship.x + ship.size; x++) {
      this.shipPositions[ship.y][x] = ship;
    }
  } else {
    for (let y = ship.y; y < ship.y + ship.size; y++) {
      this.shipPositions[y][ship.x] = ship;
    }
  }
  this.ships.push(ship);
  return this;
};

Sea.prototype.allShipsSunk = function() {
  let sunk = 0;
  this.ships.forEach(ship => {
    sunk += 1 * ship.isSunk();
  });
  return this.ships.length == sunk;
};

module.exports = Sea;
