var chai = require("chai");
var expect = chai.expect;
const Area = require("../../../battleships/utilities/area");
describe("Battleships Sea utilities", function () {

    it("should prefill two dimensional array 5x4 with zeroes", function () {
        const array = Area.makeZeroFilledRectangle(5, 4);
        let sum = 0;
        array.forEach(row => {
            sum += row.reduce((total, current) => total + current);
        });
        expect(sum).to.equal(0);
    });

    it("should create array of five items", function () {
        const array = Area.makeZeroFilledRectangle(2, 5);
        expect(array).to.be.length(5);
    });

    it("should create multidimensional array of row length 30", function () {
        const array = Area.makeZeroFilledRectangle(30, 2);
        expect(array[0]).to.be.length(30);
        expect(array[1]).to.be.length(30);
    });
});
