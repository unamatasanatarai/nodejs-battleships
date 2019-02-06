const Ship = require("../battleships/ship.js");
const Shot = require("../battleships/shot.js");
function Game() {}

Game.prototype.withSea = function(sea) {
  this.sea = sea;
  return this;
};

Game.prototype.withShips = function(shipsArray) {
  shipsArray.forEach(shipSize => {
    let ship = new Ship(shipSize);
    this.sea.assignRandomPositionToShip(ship);
    this.sea.launchShip(ship);
  });
};
Game.prototype.isGameOver = function() {
  return this.sea.allShipsSunk();
};
Game.prototype.shoot = function(shot) {
  let hit = this.sea.shoot(shot.x, shot.y);
  if (hit == Shot.HIT) {
    console.log("You hit my ship!");
  } else if (hit == Shot.SUNK) {
    console.log("You sunk me ship!");
  } else {
    console.log("You missed!");
  }
};

module.exports = Game;
