const readln = require("readline");
const Sea = require("./battleships/sea.js");
const Ship = require("./battleships/ship.js");
const Shot = require("./battleships/shot.js");
const Orientation = require("./battleships/orientation.js");
const Convert = require("./game/convert.js");
const Board = require("./game/board.js");

// prep game
const convert = new Convert();
const board = new Board();

// prep console input
let cl = readln.createInterface(process.stdin, process.stdout);
let question = function(q) {
  return new Promise((res, rej) => {
    cl.question(q, answer => {
      res(answer);
    });
  });
};

// prep map
let sea = new Sea(10, 10);
let battleship = new Ship(5);
battleship.orientation = Orientation.VERTICAL;
let destroyerOne = new Ship(4);
destroyerOne.x = 1;
destroyerOne.orientation = Orientation.VERTICAL;
let destroyerTwo = new Ship(4);
destroyerTwo.x = 2;
destroyerTwo.orientation = Orientation.VERTICAL;
sea
  .launchShip(battleship)
  .launchShip(destroyerOne)
  .launchShip(destroyerTwo);
// clear screen
process.stdout.write("\033c");
(async function main() {
  let answer;
  board.draw(sea.shots);
  while (true) {
    answer = await question("Type your shot (a5, b2... or 'bye') ");
    answer = String(answer).trim();
    if (answer == "bye") {
      console.warn("So sad to see you go...");
      break;
    }
    process.stdout.write("\033c");
    try {
      let shot = convert.toCoordinates(answer);
      let hit = sea.shoot(shot.x, shot.y);
      if (hit == Shot.HIT) {
        console.log("You hit my ship!");
      } else if (hit == Shot.SUNK) {
        console.log("You sunk me ship!");
      } else {
        console.log("You missed!");
      }
    } catch (error) {
      console.log(answer, error.message);
    }

    board.draw(sea.shots);
    if (sea.allShipsSunk()) {
      console.log("YOU WIN!");
      console.log("YOU WIN!");
      console.log("YOU WIN!");
      console.log("YOU WIN!");
      break;
    }
  }
  process.exit(0);
})();
