const readln = require("readline");
const Game = require("./battleships/game.js");
const Sea = require("./battleships/sea.js");
const Convert = require("./game/convert.js");
const Board = require("./game/board.js");

// helper
function clearScreen() {
  process.stdout.write("\033c");
}

// prep game
const game = new Game();
game.withSea(new Sea(10, 10)).withShips([4, 4, 5]);
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

(async function main() {
  let answer;
  clearScreen();
  board.draw(game.sea.shots);
  // for a quick game, uncomment below to see your ships
  board.drawShips(game.sea.shipPositions);
  while (true) {
    answer = await question("Type your shot (a5, b2... or 'bye') ");
    answer = String(answer).trim();
    if (answer == "bye") {
      console.warn("So sad to see you go...");
      break;
    }
    clearScreen();
    try {
      game.shoot(convert.toCoordinates(answer));
    } catch (error) {
      console.log(answer, error.message);
    }
    board.draw(game.sea.shots);
    if (game.isGameOver()) {
      console.log("YOU WIN!");
      break;
    }
  }
  process.exit(0);
})();
