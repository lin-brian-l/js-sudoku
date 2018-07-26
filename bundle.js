require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"Board":[function(require,module,exports){
const Cell = require("./cell.js");

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
    while (!this.checkSolved()) {
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
},{"./cell.js":1}],1:[function(require,module,exports){
class Cell {
	constructor(row, column, grid, value) {
		this.row = row;
		this.column = column;
		this.grid = grid;
		this.values = this.checkValue(value);
	};

	checkValue(value) {
		if (value === "-") {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9];
		};
		return [parseInt(value)];
	};
};

module.exports = Cell;
},{}]},{},[]);
