var chai = require("chai");
var expect = chai.expect;
var Orientation = require("../../battleships/orientation.js");
var Ship = require("../../battleships/ship.js");

describe("Battleships Ship", function() {
  it("should be horizontal by default", function() {
    let ship = new Ship(4);
    expect(ship.orientation).to.equal(Orientation.HORIZONTAL);
  });

  it("size 4 Ship should be sunk after 4 hits", function() {
    let ship = new Ship(4);
    ship
      .hit()
      .hit()
      .hit()
      .hit();
    expect(ship.isSunk()).to.true;
  });

  it("size 4 Ship should not be sunk after 3 hits", function() {
    let ship = new Ship(4);
    ship.hit().hit();
    ship.hit();
    expect(ship.isSunk()).to.false;
  });

  it("Should be vertical", function() {
    let ship = new Ship(4);
    ship.orientation = Orientation.VERTICAL;
    expect(ship.orientation).to.equal(Orientation.VERTICAL);
  });
});
