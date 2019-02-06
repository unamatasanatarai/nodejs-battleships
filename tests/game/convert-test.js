var chai = require("chai");
var expect = chai.expect;
var Sea = require("../../battleships/sea.js");
const Convert = require("../../game/convert.js");

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
});
