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
    var that = this;
    let rowArray = this.cellArrayFromRow(row);
    let knownArray = this.makeKnownArray(rowArray);
    rowArray.forEach((cell) => {
      if (cell.values.length > 1) {
        cell.values = this.subtractKnowns(knownArray, cell);
      }
    });
  };

  subtractAllRowKnowns() {
    for(var rowNumber = 0; rowNumber < 9; rowNumber++) {
      this.subtractRowKnowns(rowNumber);
    };
  };

  subtractColumnKnowns(column) {
    var that = this;
    let columnArray = this.cellArrayFromColumn(column);
    let knownArray = this.makeKnownArray(columnArray);
    columnArray.forEach((cell) => {
      if (cell.values.length > 1) {
        cell.values = this.subtractKnowns(knownArray, cell);
      }
    });
  };

  subtractAllColumnKnowns() {
    for(var columnNumber = 0; columnNumber < 9; columnNumber++) {
      this.subtractColumnKnowns(columnNumber);
    };
  };

  subtractGridKnowns(grid) {
    var that = this;
    let gridArray = this.cellArrayFromGrid(grid);
    let knownArray = this.makeKnownArray(gridArray);
    gridArray.forEach((cell) => {
      if (cell.values.length > 1) {
        cell.values = this.subtractKnowns(knownArray, cell);
      }
    });
  };

  subtractAllGridKnowns() {
    for(var gridNumber = 0; gridNumber < 9; gridNumber++) {
      this.subtractGridKnowns(gridNumber);
    };
  };

  subtractAllKnowns() {
    this.subtractAllRowKnowns();
    this.subtractAllColumnKnowns();
    this.subtractAllGridKnowns();
  }

  checkSolved() {
    return this.cells.every((cell) => {
      return cell.values.length == 1;
    });
  };



};

module.exports = Board;