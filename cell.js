new Cell {
	constructor(row, column, grid, values) {
		this.row = row
		this.column = column
		this.grid = grid
		this.values = this.checkValue(value)
	}

	checkValue(value) {
		if (value === "-") {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9]
		}
		return [value]
	}
}
