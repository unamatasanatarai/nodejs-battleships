const Screen = require("./io/screen");
const Game = require("./battleships/game");
const Sea = require("./battleships/sea");
const Convert = require("./game/user-command-converter");
const Board = require("./game/board");

const screen = new Screen();
// prep game
const game = new Game();
game.withSea(new Sea(10, 10)).withShips([4, 4, 5]);
const convert = new Convert();
const board = new Board(screen);

let cheatmode = false;
process.argv.forEach(function(val, index, array) {
  if (val === "--cheat") {
    cheatmode = true;
  }
});
(async function main() {
  let answer;
  screen.clear();
  board.draw(game.sea.shots);
  // for a quick game, uncomment below to see your ships
  if (cheatmode) board.drawShips(game.sea.shipPositions);
  while (true) {
    answer = await screen.readln("Type your shot (a5, b2... or 'bye') ");
    answer = String(answer).trim();
    if (answer == "bye") {
      screen.writeln("So sad to see you go...");
      break;
    }
    screen.clear();
    try {
      game.shoot(convert.toCoordinates(answer));
    } catch (error) {
      screen.writeln(answer, error.message);
    }
    board.draw(game.sea.shots);
    if (game.isGameOver()) {
      screen.writeln("YOU WIN!");
      break;
    }
  }
  process.exit(0);
})();
