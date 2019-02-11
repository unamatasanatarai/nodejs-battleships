var chai = require("chai");
var expect = chai.expect;
var Sea = require("../../battleships/sea.js");
var Shot = require("../../battleships/shot.js");
var Ship = require("../../battleships/ship.js");
var Orientation = require("../../battleships/orientation.js");

describe("Battleships Sea", function() {
  it("should have 100 empty shots", function() {
    const sea = new Sea(10, 10);
    expect(sea.shots.length).to.equal(10);
    expect(sea.shots[0].length).to.equal(10);
    expect(sea.shots[5][6]).to.equal(0);
    let sum = 0;
    sea.shots.forEach(row => {
      sum += row.reduce((total, current) => total + current);
    });
    expect(sum).to.equal(0);
  });

  it("should report ship has already been placed in specific coordinates", function() {
    const sea = new Sea(10, 10);
    sea.launchShip(new Ship(5));
    expect(sea.hasShipAt(0, 0)).to.equal(true);
    expect(sea.hasShipAt(1, 0)).to.equal(true);
    expect(sea.hasShipAt(0, 1)).to.equal(false);
  });

  it("should not allow positions outside created area", function() {
    const sea = new Sea(10, 10);
    expect(sea.isValidPosition(-1, 0)).to.equal(false);
    expect(sea.isValidPosition(1, -3)).to.equal(false);
    expect(sea.isValidPosition(10, 2)).to.equal(false);
    expect(sea.isValidPosition(9, 13)).to.equal(false);
  });

  it("should allow positions inside created area", function() {
    const sea = new Sea(10, 10);
    expect(sea.isValidPosition(0, 0)).to.equal(true);
    expect(sea.isValidPosition(9, 9)).to.equal(true);
    expect(sea.isValidPosition(9, 0)).to.equal(true);
  });

  it("should have 4 shots taken", function() {
    const sea = new Sea(10, 10);
    sea.shoot(0, 0);
    sea.shoot(0, 1);
    sea.shoot(5, 2);
    sea.shoot(4, 9);
    // shots taken
    expect(sea.shots[0][0]).to.equal(1);
    expect(sea.shots[1][0]).to.equal(1);
    expect(sea.shots[2][5]).to.equal(1);
    expect(sea.shots[9][4]).to.equal(1);
    // shot NOT taken
    expect(sea.shots[0][1]).to.equal(0);
    // shots total
    let taken = 0;
    sea.shots.forEach(row => {
      taken += row.reduce((total, current) => total + current);
    });
    expect(taken).to.equal(4);
  });

  it("should place a ship horizontally", function() {
    const sea = new Sea(10, 10);
    const ship = new Ship(5);
    ship.x = 0;
    ship.y = 0;
    sea.launchShip(ship);
    expect(sea.shipPositions[0][0]).to.be.an("object");
    expect(sea.shipPositions[0][1]).to.be.an("object");
    expect(sea.shipPositions[0][2]).to.be.an("object");
    expect(sea.shipPositions[0][3]).to.be.an("object");
    expect(sea.shipPositions[0][4]).to.be.an("object");
  });

  it("should place a ship vertically", function() {
    const sea = new Sea(10, 10);
    const ship = new Ship(5);
    ship.x = 0;
    ship.y = 0;
    ship.orientation = Orientation.VERTICAL;
    sea.launchShip(ship);
    expect(sea.shipPositions[0][0]).to.be.an("object");
    expect(sea.shipPositions[1][0]).to.be.an("object");
    expect(sea.shipPositions[2][0]).to.be.an("object");
    expect(sea.shipPositions[3][0]).to.be.an("object");
    expect(sea.shipPositions[4][0]).to.be.an("object");
  });

  it("should sink ship", function() {
    const sea = new Sea(10, 10);
    const ship = new Ship(5);
    ship.x = 0;
    ship.y = 0;
    ship.orientation = Orientation.VERTICAL;
    sea.launchShip(ship);
    expect(sea.shoot(0, 0)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 1)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 2)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 3)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 4)).to.equal(Shot.SUNK);
  });

  it("should sink ship and finish the game", function() {
    const sea = new Sea(10, 10);
    const ship = new Ship(5);
    const anotherShip = new Ship(2);
    anotherShip
      .hit()
      .hit()
      .hit();
    anotherShip.x = 5;
    anotherShip.y = 5;
    sea.launchShip(anotherShip);
    ship.x = 0;
    ship.y = 0;
    ship.orientation = Orientation.VERTICAL;
    sea.launchShip(ship);
    expect(sea.shoot(0, 0)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 1)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 2)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 3)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 4)).to.equal(Shot.SUNK);
    expect(sea.allShipsSunk()).to.equal(true);
  });

  it("should not sink a ship if consecutive shots are fired in the same place", function() {
    const sea = new Sea(10, 10);
    const ship = new Ship(5);
    ship.x = 0;
    ship.y = 0;
    ship.orientation = Orientation.VERTICAL;
    sea.launchShip(ship);
    expect(sea.shoot(0, 0)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 0)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 0)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 0)).to.equal(Shot.HIT);
    expect(ship.hits).to.equal(1);
  });

  it("shuld return ship HIT on identical shot", function() {
    const sea = new Sea(10, 10);
    sea.launchShip(new Ship(5));
    expect(sea.shoot(0, 0)).to.equal(Shot.HIT);
    expect(sea.shoot(0, 0)).to.equal(Shot.HIT);
  });

  it("should prepare random unique positions", function() {
    const sea = new Sea(8, 6);
    let sum = 0;
    const map = new Map();
    for (const item of sea.randomPositions) {
      if (!map.has(`${item.x}x${item.y}`)) {
        map.set(`${item.x}x${item.y}`, true);
        sum++;
      }
    }
    expect(sum).to.equal(sea.randomPositions.length);
  });

  it("should assign random positions to ship", function() {
    const sea = new Sea(10, 10);
    const ship = new Ship(5);
    ship.x = -1;
    ship.y = -1;
    sea.assignRandomPositionToShip(ship);
    sea.launchShip(ship);
    expect(ship.x).to.not.equal(-1);
    expect(ship.y).to.not.equal(-1);
  });

  it("should place random positions for ships", function() {
    const sea = new Sea(10, 10);
    sea.randomPositions = [{ x: 3, y: 4 }, { x: 6, y: 5 }];
    const ship = new Ship(4);
    expect(sea.assignRandomPositionToShip(ship)).to.equal(true);
    sea.launchShip(ship);
    expect(ship.x).to.equal(sea.randomPositions[0].x);
    expect(ship.y).to.equal(sea.randomPositions[0].y);
    expect(sea.assignRandomPositionToShip(ship)).to.equal(true);
    expect(ship.x).to.equal(sea.randomPositions[1].x);
    expect(ship.y).to.equal(sea.randomPositions[1].y);
  });
});
