// Run with "yarn run test"

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

  beforeEach(function() {
    board = new Board("1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--")
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

    it("makes a fourteenth cell with column of 4, row of 1, grid of 5, and value of 7", function() {
      assert.equal(board.cells[13].row, 1, "Cell row should be equal to 8");
      assert.equal(board.cells[13].column, 4, "Cell column should be equal to 8");
      assert.equal(board.cells[13].grid, 1, "Cell grid should be equal to 1");
      assert.deepStrictEqual(board.cells[13].values, [7], "Cell values should be equal to [7]");
    });

  });

  describe("Creates an array of cells in the same row", function() {

    beforeEach(function(){
      rowArray = board.cellArrayFromParameter("row", 0);
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
      columnArray = board.cellArrayFromParameter("column", 0);
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

  describe("Creates an array of cells in the same grid", function() {

    beforeEach(function() {
      gridArray = board.cellArrayFromParameter("grid", 0);
    });

    it("creates an array of length 9", function() {
      assert.equal(gridArray.length, 9, "Array of cells should have length equal to 9");
    });

    it("creates an array of cell objects", function() {
      var isCellObject = function(cell) {
        return cell instanceof Cell; 
      }
      assert.equal(gridArray.every(isCellObject), true, "Element is an instance of Cell");
    });

    it("creates an array of cells with the same column", function() {
      var hasSameGrid = function(cell) {
        return cell.grid === 0;
      };
      assert.equal(gridArray.every(hasSameGrid), true, "Elements have the same grid");
    });

  });

  describe("Creates an array of known values for the first row", function() {

    beforeEach(function(){
      rowArray = board.cellArrayFromParameter("row", 0);
      knownArray = board.makeKnownArray(rowArray)
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
      // before: [6, -, -, 3, -, 8, 9, -, -]
      board.subtractRowKnowns(8);
    });

    it("Will iterate through each cell in the row", function() {
      assert.equal(board.cells[78].row, 8, "Checked cell is in the checked row.");
      assert.equal(board.cells[80].row, 8, "Checked cell is in the checked row.");
      assert.deepStrictEqual(board.cells[78].values, [9], "Known values are not altered.");
      assert.deepStrictEqual(board.cells[80].values, [1, 2, 4, 5, 7], "Unknown values are altered.");
    });

  });

  describe("Subtracts known and unknown values for all rows", function() {

    beforeEach(function(){
      // board: "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--"
      // row 1: "1-58-2---"
      // row 9: "6--3-89--" 
      board.subtractAllRowKnowns();
    });

    it("Will iterate through each cell in all rows", function() {
      assert.deepStrictEqual(board.cells[0].values, [1], "Known values of row 0 are not altered.");
      assert.deepStrictEqual(board.cells[1].values, [3, 4, 6, 7, 9], "Unknown values of row 0 are altered.")
      assert.deepStrictEqual(board.cells[78].values, [9], "Known values of row 8 are not altered.");
      assert.deepStrictEqual(board.cells[80].values, [1, 2, 4, 5, 7], "Unknown values of row 8 are altered.");
    });

  });

  describe("Subtracts known and unknown values for a whole column", function() {

    beforeEach(function(){
      // before: [-, 5, 9, 6, -, -, -, 1, -]
      board.subtractColumnKnowns(8);
    });

    it("Will iterate through each cell in the column", function() {
      assert.equal(board.cells[17].column, 8, "Checked cell is in the checked column.");
      assert.equal(board.cells[8].column, 8, "Checked cell is in the checked column.");
      assert.deepStrictEqual(board.cells[17].values, [5], "Known values are not altered.");
      assert.deepStrictEqual(board.cells[8].values, [2, 3, 4, 7, 8], "Unknown values are altered.");
    });

  });

  describe("Subtracts known and unknown values for all columns", function() {

    beforeEach(function(){
      // Column 1 before: [-, 9, -, 1, 6, -, -, 3, -]
      // Column 8 before: [-, 5, 9, 6, -, -, -, 1, -]
      board.subtractAllColumnKnowns();
    });

    it("Will iterate through each cell in all columns", function() {
      assert.deepStrictEqual(board.cells[10].values, [9], "Known values from column 1 are not altered.");
      assert.deepStrictEqual(board.cells[1].values, [2, 4, 5, 7, 8], "Unknown values from column 1 are altered.");
      assert.deepStrictEqual(board.cells[17].values, [5], "Known values from column 8 are not altered.");
      assert.deepStrictEqual(board.cells[8].values, [2, 3, 4, 7, 8], "Unknown values from column 8 are altered.");
    });

  });

  describe("Subtracts known and unknown values for a whole grid", function() {

    beforeEach(function(){
      // before: [8, -, 2, -, 7, 6, 4, -, -]
      board.subtractGridKnowns(1);
    });

    it("Will iterate through each cell in the grid", function() {
      assert.equal(board.cells[3].grid, 1, "Checked cell is in the checked grid.");
      assert.equal(board.cells[4].grid, 1, "Checked cell is in the checked grid.");
      assert.deepStrictEqual(board.cells[3].values, [8], "Known values are not altered.");
      assert.deepStrictEqual(board.cells[4].values, [1, 3, 5, 9], "Unknown values are altered.");
    });

  });

  describe("Subtracts known and unknown values for all grids", function() {

    beforeEach(function(){
      // grid 0 before: [1, -, 5, -, 9, -, 2, -, -]
      // grid 1 before: [8, -, 2, -, 7, 6, 4, -, -]
      board.subtractAllGridKnowns();
    });

    it("Will iterate through each cell in all grids", function() {
      assert.deepStrictEqual(board.cells[0].values, [1], "Known values from grid 0 are not altered.");
      assert.deepStrictEqual(board.cells[1].values, [3, 4, 6, 7, 8], "Unknown values from grid 0 are altered.");
      assert.deepStrictEqual(board.cells[3].values, [8], "Known values from grid 1 are not altered.");
      assert.deepStrictEqual(board.cells[4].values, [1, 3, 5, 9], "Unknown values from grid 1 are altered.");
    });

  });

  describe("Subtracts known and unknown values for the entire board", function() {
    beforeEach(function() {
      // row 0 before: [1, -, 5, 8, -, 2, -, -, -]
      // column 1 before: [-, 9, -, 1, 6, -, -, 3, -]
      // grid 0 before: [1, -, 5, -, 9, -, 2, -, -]
      // row 8 before: [6, -, -, 3, -, 8, 9, -, -]
      // column 8 before: [-, 5, 9, 6, -, -, -, 1, -]
      // grid 8 before: [-, 3, -, 5, -, 1, 9, -, -]
      board.subtractAllKnowns();
    });

    it("Will iterate through every cell in the board", function() {
      assert.deepStrictEqual(board.cells[1].values, [4, 7], "Unknown values from cell 1 are altered.");
      assert.deepStrictEqual(board.cells[80].values, [2, 4, 7], "Unknown values from cell 80 are altered.");
    });
  })

  describe("Checks if the board is solved", function() {

    it("Will return false on an unsolved board", function() {
      assert.equal(board.checkSolved(), false, "Returns false on an unsolved board.");
    });

    it("Will return true on a board with no unknowns", function() {
      fakeBoard = new Board("115812111191176415211411819119117316762183191111161151117611131431121511611318911");
      assert.equal(fakeBoard.checkSolved(), true, "Returns true on a solved board.");
    });

  });

  describe("Prints out the board string", function() {
    it("Will return the same string as it came in", function() {
      assert.equal(board.printBoardString(), "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--", "Returns the same starting string.");
    });
  });

  describe("Solves the board", function() {

    beforeEach(function() {
      board.solveBoard();
    });

    it("Will generate a board with no unknowns", function() {
      assert.equal(board.checkSolved(), true, "Generates a board with no unknowns.");
      assert.equal(board.printBoardString().includes("-"), false, "Generates a board with no '-'.");
    });

    it("Will generate a solved board", function() {
      assert.equal(board.printBoardString(), "145892673893176425276435819519247386762583194384961752957614238438729561621358947", "Generates a solved board.");
    });
  });

// "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--"

});