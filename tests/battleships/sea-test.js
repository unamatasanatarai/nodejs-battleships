var chai = require("chai");
var expect = chai.expect;
var Sea = require("../../battleships/sea.js");
var Shot = require("../../battleships/shot.js");
var Ship = require("../../battleships/ship.js");
var Orientation = require("../../battleships/orientation.js");

describe("Battleships Sea", function() {
  it("should have 100 empty shots", function() {
    let sea = new Sea(10, 10);
    expect(sea.shots.length).to.equal(10);
    expect(sea.shots[0].length).to.equal(10);
    expect(sea.shots[5][6]).to.equal(0);
  });

  it("should have 4 shots taken", function() {
    let sea = new Sea(10, 10);
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
    sea.shots.forEach(y => {
      for (let i = 0; i < y.length; i++) {
        taken += y[i];
      }
    });
    expect(taken).to.equal(4);
  });

  it("should place a ship horizontally", function() {
    let sea = new Sea(10, 10);
    let ship = new Ship(5);
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
    let sea = new Sea(10, 10);
    let ship = new Ship(5);
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
    let sea = new Sea(10, 10);
    let ship = new Ship(5);
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
    let sea = new Sea(10, 10);
    let ship = new Ship(5);
    let anotherShip = new Ship(2);
    anotherShip.hit().hit();
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
});
