const Cell = require("../cell.js");
const Board = require("../board.js");
const assert = require("assert");

describe('Cell', function() {
  describe("Creation with all numeric parameters", function() {

    it("makes a cell within the first row, first column, and first grid with a value of one", function() {
      let cell = new Cell(1, 1, 1, "1");
      assert.equal(cell.row, 1, "Cell row should be equal to 1");
      assert.equal(cell.column, 1, "Cell column should be equal to 1");
      assert.equal(cell.grid, 1, "Cell grid should be equal to 1");
      assert.deepStrictEqual(cell.values, [1], "Cell value should be equal to [1]");
    });

  });

  describe("Creation with all numeric parameters except for value", function() {

    it("makes a cell within the first row, first column, and first grid with values of 1-9", function() {
      let cell = new Cell(1, 1, 1, "-");
      assert.equal(cell.row, 1, "Cell row should be equal to 1");
      assert.equal(cell.column, 1, "Cell column should be equal to 1");
      assert.equal(cell.grid, 1, "Cell grid should be equal to 1");
      assert.deepStrictEqual(cell.values, [1, 2, 3, 4, 5, 6, 7, 8, 9], "Cell value should be equal to [1, 2, 3, 4, 5, 6, 7, 8, 9]");
    });

  });
});

describe("Board", function() {

  beforeEach(function(){
    return board = new Board("1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--")
  });

  describe("Creation of a board with 81 cells", function() {

    it("makes a board with 81 cells", function() {
      assert.equal(board.cells.length, 81, "Board should have 81 cells.");
    });

  });
  describe("Creation of a board with accurate cell data", function() {

    it("makes a first cell with column, row, and grid of 0 and value of 1", function() {
      assert.equal(board.cells[0].row, 0, "Cell row should be equal to 0");
      assert.equal(board.cells[0].column, 0, "Cell column should be equal to 0");
      assert.equal(board.cells[0].grid, 0, "Cell grid should be equal to 0");
      assert.deepStrictEqual(board.cells[0].values, [1], "Cell values should be equal to [1]");
    });

    it("makes a 81st cell with column, row, and grid of 8 and values of 1-9", function() {
      assert.equal(board.cells[80].row, 8, "Cell row should be equal to 8");
      assert.equal(board.cells[80].column, 8, "Cell column should be equal to 8");
      assert.equal(board.cells[80].grid, 8, "Cell grid should be equal to 8");
      assert.deepStrictEqual(board.cells[80].values, [1, 2, 3, 4, 5, 6, 7, 8, 9], "Cell values should be equal to [1, 2, 3, 4, 5, 6, 7, 8, 9]");
    });

    it("makes an fourteenth cell with column of 4, row of 1, grid of 5, and value of 7", function() {
      assert.equal(board.cells[13].row, 1, "Cell row should be equal to 8");
      assert.equal(board.cells[13].column, 4, "Cell column should be equal to 8");
      assert.equal(board.cells[13].grid, 1, "Cell grid should be equal to 1");
      assert.deepStrictEqual(board.cells[13].values, [7], "Cell values should be equal to [7]");
    });

  });

  describe("Creates an array of cells in the same row", function() {

    beforeEach(function(){
      return rowArray = board.cellArrayFromRow(0);
    });

    it("creates an array of length 9", function() {
      assert.equal(rowArray.length, 9, "Array of cells should have length equal to 9");
    });

    it("creates an array of cell objects", function() {
      var isCellObject = function(cell) {
        return cell instanceof Cell; 
      }
      assert.equal(rowArray.every(isCellObject), true, "Element is an instance of Cell");
    });

    it("creates an array of cells with the same row", function() {
      var hasSameRow = function(cell) {
        return cell.row === 0;
      };
      assert.equal(rowArray.every(hasSameRow), true, "Elements have the same row");
    });

  });

  describe("Creates an array of cells in the same column", function() {

    beforeEach(function(){
      return columnArray = board.cellArrayFromColumn(0);
    });

    it("creates an array of length 9", function() {
      assert.equal(columnArray.length, 9, "Array of cells should have length equal to 9");
    });

    it("creates an array of cell objects", function() {
      var isCellObject = function(cell) {
        return cell instanceof Cell; 
      }
      assert.equal(columnArray.every(isCellObject), true, "Element is an instance of Cell");
    });

    it("creates an array of cells with the same column", function() {
      var hasSameColumn = function(cell) {
        return cell.column === 0;
      };
      assert.equal(columnArray.every(hasSameColumn), true, "Elements have the same column");
    });

  });

  describe("Creates an array of known values for the first row", function() {

    beforeEach(function(){
      rowArray = board.cellArrayFromRow(0);
      return knownArray = board.makeKnownArray(rowArray)
    });

    it("creates an array of length 4", function() {
      assert.equal(knownArray.length, 4, "Known array has length of 4");
    });

    it("creates the array [1, 5, 8, 2]", function() {
      assert.deepStrictEqual(knownArray, [1, 5, 8, 2], "Array is [1, 5, 8, 2]");
    });

  });

  describe("Subtracts known values from unknown values", function() {

    it("Will subtract the array [1, 2, 5, 8] from [1, 2, 3, 4, 5, 6, 7, 8, 9]", function() {
      assert.deepStrictEqual(board.subtractKnowns([1, 2, 5, 8], board.cells[1]), [3, 4, 6, 7, 9], "Array is [3, 4, 6, 7, 9]");
    });

  });

  describe("Subtracts known and unknown values for a whole row", function() {

    beforeEach(function(){
      return board.subtractRowKnowns(8)
    });

    it("Will iterate through each cell in the row", function() {
      assert.deepStrictEqual(board.cells[78].values, [9], "Known values are not altered.");
      assert.deepStrictEqual(board.cells[80].values, [1, 2, 4, 5, 7], "Unknown values are altered.");
    });

  });

// "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--"

});