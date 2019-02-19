var chai = require("chai");
var expect = chai.expect;
const Convert = require("../../game/user-command-converter");

describe("Game Convert", function() {
    it("should convert string to coordinates", function() {
        let convert = new Convert();
        let coordinates = convert.toCoordinates("a5");
        expect(coordinates.x).to.equal(0);
        expect(coordinates.y).to.equal(4);
    });

    it("should convert uppercase string to coordinates", function() {
        let convert = new Convert();
        let coordinates = convert.toCoordinates("B5");
        expect(coordinates.x).to.equal(1);
        expect(coordinates.y).to.equal(4);
    });

    it("should not accept double letters", function() {
        let convert = new Convert();
        expect(() => convert.validateInput("eB5")).to.throw(
            Error,
            "Illegal coordinates"
        );
    });

    it("should accept whitespace", function() {
        let convert = new Convert();
        let coords = convert.toCoordinates(" B5 ");
        expect(coords.x).to.equal(1);
    });
});
