const Cell = require("./cell.js")

class Board {
  constructor(boardString) {

    let boardArray = boardString.split("")
    this.cells = boardArray.map((cellValue, cellPosition) => {
      let cellRow = this.determineRow(cellPosition);
      let cellColumn = this.determineColumn(cellPosition);
      let cellGrid = this.determineGrid(cellPosition);
      return new Cell(cellRow, cellColumn, cellGrid, cellValue);
    });

  };

  determineRow(cellPosition) {
    return Math.floor(cellPosition / 9);
  };

  determineColumn(cellPosition) {
    return Math.floor(cellPosition % 9);
  };

  determineGrid(cellPosition) {
    return Math.floor(this.determineRow(cellPosition) / 3) * 3 + Math.floor(this.determineColumn(cellPosition) / 3);
  };

  cellArrayFromParameter(parameter, value) {
    return this.cells.filter(cell => {
      return cell[parameter] === value;
    });
  };

  makeKnownArray(cellArray) {
    let knownArray = [];
    cellArray.forEach(cell => {
      if (cell.values.length === 1) {
        knownArray = knownArray.concat(cell.values);
      }
    })
    return knownArray;
  };

  subtractKnowns(knownArray, cell) {
    return cell.values.filter(value => {
      return knownArray.indexOf(value) < 0;
    });
  };

  subtractParameterKnowns(parameter, paramNumber) {
    let paramArray = this.cellArrayFromParameter(parameter, paramNumber);
    let knownArray = this.makeKnownArray(paramArray);
    paramArray.forEach(cell => {
      if (cell.values.length > 1) {
        cell.values = this.subtractKnowns(knownArray, cell);
      };
    });
  };

  subtractAllParameterKnowns(parameter) {
    for (var paramNumber = 0; paramNumber < 9; paramNumber++) {
      this.subtractParameterKnowns(parameter, paramNumber);
    }
  }

  subtractAllKnowns() {
    this.subtractAllParameterKnowns('row');
    this.subtractAllParameterKnowns('column');
    this.subtractAllParameterKnowns('grid');
  }

  checkSolved() {
    return this.cells.every((cell) => {
      return cell.values.length == 1;
    });
  };

  solveBoard() {
    while (this.checkSolved() == false) {
      this.subtractAllKnowns();
    };
  };

  printBoardString() {
    let filterCellValues = function(cell) {
      if (cell.values.length === 1) {
        return cell.values[0];
      }
      return "-";
    }

    return this.cells.map(filterCellValues).join('');
  }

};

module.exports = Board;