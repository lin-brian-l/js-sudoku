const Cell = require("../cell.js");
const assert = require("assert");

describe('Cell', function() {
  describe("Creation with all numeric parameters", function() {
    it("makes a cell within the first row, first column, and first grid with a value of one", function() {
      let cell = new Cell(1, 1, 1, 1);
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