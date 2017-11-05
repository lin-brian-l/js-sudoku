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

  cellArrayFromRow(row) {
    return this.cells.filter((cell) => {
      return cell.row === row;
    });
  };

  cellArrayFromColumn(column) {
    return this.cells.filter((cell) => {
      return cell.column === column;
    });
  };

  cellArrayFromGrid(grid) {
    return this.cells.filter((cell) => {
      return cell.grid === grid;
    });
  };

  makeKnownArray(array) {
    let knownArray = [];
    array.forEach((cell) => {
      if (cell.values.length === 1) {
        knownArray = knownArray.concat(cell.values);
      }
    })
    return knownArray;
  };

  subtractKnowns(knownArray, cell) {
    return cell.values.filter((value) => {
      return knownArray.indexOf(value) < 0;
    });
  };

  subtractRowKnowns(row) {
    var that = this
    let rowArray = this.cellArrayFromRow(row);
    let knownArray = this.makeKnownArray(rowArray);
    rowArray.forEach((cell) => {
      if (cell.values.length > 1) {
        cell.values = this.subtractKnowns(knownArray, cell);
      }
    });
  };
};

module.exports = Board;