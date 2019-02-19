const Shot = require("./shot");
const Orientation = require("./orientation");
const SeaStatus = require("./sea-status");
const Area = require("./utilities/area");

class Sea {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.ships = [];
        this.shots = Area.makeZeroFilledRectangle(this.width, this.height);
        this.shipPositions = Area.makeZeroFilledRectangle(this.width, this.height);
        this.randomPositions = this.generateRandomPositions();
    }

    hasShipAt(x, y) {
        return typeof this.shipPositions[y][x] === "object";
    }

    isValidPosition(x, y) {
        return x < this.width && y < this.height && x >= 0 && y >= 0;
    }

    shoot(x, y) {
        if (!this.isValidPosition(x, y)) {
            return Shot.MISS;
        }
        if (
            this.shots[y][x] !== SeaStatus.MISS &&
            this.shots[y][x] !== SeaStatus.WATER
        ) {
            return Shot.HIT;
        }
        this.shots[y][x] = SeaStatus.MISS;
        if (this.hasShipAt(x, y)) {
            const ship = this.shipPositions[y][x];
            ship.hit();
            this.shots[y][x] = SeaStatus.HIT;
            return ship.isSunk() ? Shot.SUNK : Shot.HIT;
        }
        return Shot.MISS;
    }

    launchShip(ship) {
        if (ship.orientation === Orientation.HORIZONTAL) {
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
    }

    allShipsSunk() {
        let sunk = 0;
        this.ships.forEach(ship => {
            sunk += 1 * ship.isSunk();
        });
        return this.ships.length === sunk;
    }

    generateRandomPositions() {
        const positions = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                positions.push({ y: y, x: x });
            }
        }
        positions.sort(() => 0.5 - Math.random());
        return positions;
    }

    isShipPositionEmpty(x, y) {
        if (this.isValidPosition(x, y)) {
            return this.shipPositions[y][x] === 0;
        }
        return false;
    }

    assignRandomPositionToShip(ship) {
        ship.randomizeOrientation();

        for (let i = 0; i < this.randomPositions.length; i++) {
            const position = this.randomPositions[i];
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
    }
}

module.exports = Sea;
