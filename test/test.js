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
  describe("Creation of a board with 81 cells", function() {
    it("makes a board with 81 cells", function() {
      let board = new Board("1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--");
      assert.equal(board.cells.length, 81, "Board should have 81 cells.");
    });
  });
  describe("Creation of a board with accurate cell data", function() {
    it("makes a first cell with column, row, and grid of 0 and value of 1", function() {
      let board = new Board("1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--");
      assert.equal(board.cells[0].row, 0, "Cell row should be equal to 0");
      assert.equal(board.cells[0].column, 0, "Cell column should be equal to 0");
      assert.equal(board.cells[0].grid, 0, "Cell grid should be equal to 0");
      assert.deepStrictEqual(board.cells[0].values, [1], "Cell values should be equal to [1]");
    });
    it("makes a 81st cell with column, row, and grid of 8 and values of 1-9", function() {
      let board = new Board("1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--");
      assert.equal(board.cells[80].row, 8, "Cell row should be equal to 8");
      assert.equal(board.cells[80].column, 8, "Cell column should be equal to 8");
      assert.equal(board.cells[80].grid, 8, "Cell grid should be equal to 8");
      assert.deepStrictEqual(board.cells[80].values, [1, 2, 3, 4, 5, 6, 7, 8, 9], "Cell values should be equal to [1, 2, 3, 4, 5, 6, 7, 8, 9]");
    });
    it("makes an fourteenth cell with column of 4, row of 1, grid of 5, and value of 7", function() {
      let board = new Board("1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--");
      assert.equal(board.cells[13].row, 1, "Cell row should be equal to 8");
      assert.equal(board.cells[13].column, 4, "Cell column should be equal to 8");
      console.log(board.cells[13].grid)
      assert.equal(board.cells[13].grid, 1, "Cell grid should be equal to 1");
      assert.deepStrictEqual(board.cells[13].values, [7], "Cell values should be equal to [7]");
    });
  });
});