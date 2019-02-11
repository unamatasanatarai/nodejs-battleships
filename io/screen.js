const readln = require("readline");
class Screen {
  constructor() {
    this.input = readln.createInterface(process.stdin, process.stdout);
  }

  readln(q) {
    return new Promise((res, rej) => {
      this.input.question(q, answer => {
        res(answer);
      });
    });
  }

  writeln(text) {
    console.log(text);
  }

  clear() {
    console.clear();
  }
}

module.exports = Screen;
