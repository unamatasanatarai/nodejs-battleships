const chai = require("chai");
const expect = chai.expect;
const Orientation = require("../../battleships/orientation");
const Ship = require("../../battleships/ship");
const sinon = require("sinon");

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

    it("Should random orient the ship horizontally", function() {
        const mock = sinon.stub(Math, "random").returns(0);
        const ship = new Ship(5);
        ship.randomizeOrientation();
        expect(ship.orientation).to.equal(Orientation.HORIZONTAL);
        mock.restore();
    });

    it("Should random orient the ship vertically", function() {
        const mock = sinon.stub(Math, "random").returns(0.6);
        const ship = new Ship(5);
        ship.randomizeOrientation();
        expect(ship.orientation).to.equal(Orientation.VERTICAL);
        mock.restore();
    });
});
