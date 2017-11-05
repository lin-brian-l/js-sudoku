const Cell = require("./cell.js")

class Board {
  constructor(boardString) {
    this.cells = []
    var boardArray = boardString.split("")
    boardArray.forEach((value, index) => {
      let cellRow = this.determineRow(index);
      let cellColumn = this.determineColumn(index);
      let cellGrid = this.determineGrid(index);
      let cell = new Cell(cellRow, cellColumn, cellGrid, value);
      this.cells.push(cell);
    });
  };

  determineRow(index) {
    return Math.floor(index / 9);
  };

  determineColumn(index) {
    return Math.floor(index % 9);
  };

  determineGrid(index) {
    return Math.floor(this.determineRow(index) / 3) * 3 + Math.floor(this.determineColumn(index) / 3);
  };
};

module.exports = Board;