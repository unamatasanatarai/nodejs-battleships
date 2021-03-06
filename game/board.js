function Board() {}

Board.prototype.draw = function(grid) {
  let buffer = "".padEnd(3, " ");
  for (let i = 0; i < grid[0].length; i++) {
    buffer += String.fromCharCode(97 + i).padEnd(2, " ");
  }
  buffer += "\n";
  let col = 1;

  grid.forEach(row => {
    buffer += String(col).padEnd(3, " ");
    col++;
    row.forEach(item => {
      if (item === 1) {
        buffer += "*".padEnd(2, " ");
      } else if (item === 2) {
        buffer += "X".padEnd(2, " ");
      } else {
        buffer += " ".padEnd(2, " ");
      }
    });
    buffer += "\n";
  });
  console.log(buffer);
};

// debug only (?)
Board.prototype.drawShips = function(grid) {
  let buffer = "".padEnd(3, " ");
  for (let i = 0; i < grid[0].length; i++) {
    buffer += String.fromCharCode(97 + i).padEnd(2, " ");
  }
  buffer += "\n";
  let col = 1;

  grid.forEach(row => {
    buffer += String(col).padEnd(3, " ");
    col++;
    row.forEach(item => {
      if (item !== 0) {
        buffer += "*".padEnd(2, " ");
      }
    });
    buffer += "\n";
  });
  console.log(buffer);
};

module.exports = Board;
