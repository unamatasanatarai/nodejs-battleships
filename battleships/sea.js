const Shot = require("./shot.js");
const _ = require("underscore");
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
  this.randomPositions = this.generateRandomPositions();
}

Sea.prototype.hasShipAt = function(x, y) {
  return typeof this.shipPositions[y][x] === "object";
};

Sea.prototype.isValidPosition = function(x, y) {
  return x < this.width && y < this.height && x >= 0 && y >= 0;
};

Sea.prototype.shoot = function(x, y) {
  if (!this.isValidPosition(x, y)) {
    return Shot.MISS;
  }
  if (this.shots[y][x] !== 1 && this.shots[y][x] !== 0) {
    return Shot.HIT;
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

Sea.prototype.generateRandomPositions = function() {
  let positions = Array();
  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      positions.push({ y: y, x: x });
    }
  }
  positions.sort(function() {
    return 0.5 - Math.random();
  });
  return positions;
};

Sea.prototype.isShipPositionEmpty = function(x, y) {
  return this.shipPositions[y][x] === 0;
};

Sea.prototype.assignRandomPositionToShip = function(ship) {
  ship.orientation =
    Math.random() > 0.5 ? Orientation.VERTICAL : Orientation.HORIZONTAL;

  for (let i = 0; i < this.randomPositions.length; i++) {
    let position = this.randomPositions[i];
    let free = true;
    if (ship.orientation === Orientation.HORIZONTAL) {
      for (let x = position.x; x < position.x + ship.size; x++) {
        if (!this.isShipPositionEmpty(x, position.y)) {
          free = false;
        }
      }
    } else {
      for (let y = position.y; y < position.y + ship.size; y++) {
        if (!this.isShipPositionEmpty(position.x, y)) {
          free = false;
        }
      }
    }
    if (free) {
      ship.x = position.x;
      ship.y = position.y;
      return true;
    }
  }
  return false;
};
module.exports = Sea;
