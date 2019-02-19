const Ship = require("../battleships/ship.js");
const Shot = require("../battleships/shot.js");
class Game {
    withSea(sea) {
        this.sea = sea;
        return this;
    }

    withShips(shipsArray) {
        shipsArray.forEach(shipSize => {
            const ship = new Ship(shipSize);
            this.sea.assignRandomPositionToShip(ship);
            this.sea.launchShip(ship);
        });
    }

    isGameOver() {
        return this.sea.allShipsSunk();
    }

    shoot(shot) {
        let hit = this.sea.shoot(shot.x, shot.y);
        if (hit == Shot.HIT) {
            console.log("You hit my ship!");
        } else if (hit == Shot.SUNK) {
            console.log("You sunk me ship!");
        } else {
            console.log("You missed!");
        }
    }
}

module.exports = Game;
