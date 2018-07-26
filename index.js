$(document).ready(() => {
	createBoard();

	$('input').keypress(validateInput);

	$('#solve-button').click(initiateSolveBoard);

	$('#input-button').click(initiateFillBoard);
})

let validateInput = (event) => {
	let targetClass = $(event.target).attr('class');
	let regexTest = targetClass === 'cell-input' ? /[1-9]/ : /[0-9]|[-]|[ ]/;
	let text = String.fromCharCode(event.which);
	return regexTest.test(text);	
}

let createBoard = () => {
	for (var cell = 0; cell < 81; cell++) {
		let divClass = 'cell';
		if (rightBoldedCheck(cell)) divClass += ' right-bold';
		if (bottomBoldedCheck(cell)) divClass += ' bottom-bold';
		let inputElement = `<input class='cell-input' type='text' name='input${cell}' maxlength='1'>`;
		let divElement = `<div id='${cell}' class='${divClass}'>${inputElement}</div>`;
		$(".board").append(divElement);	
	}
}

let rightBoldedCheck = (cell) => {
	return (cell + 1) % 3 === 0 && (cell + 1) % 9 !== 0;
}

let bottomBoldedCheck = (cell) => {
	return Math.ceil((cell + 1) / 9 ) % 3 === 0 && Math.ceil((cell + 1) / 9 ) < 9;
}

let initiateSolveBoard = () => {
	let boardString = createBoardString();
	let board = new Board(boardString);
	board.solveBoard();
	let solvedBoard = board.printBoardString();
	fillBoard(solvedBoard);
}

let createBoardString = () => {
	let boardString = "";
	$('.cell-input').each((index, input) => {
		boardString += $(input).val() || "-";
	});
	return boardString;
}

let initiateFillBoard = () => {
	let boardString = $('.board-input').val();
	fillBoard(boardString);
}

let fillBoard = (solvedBoard) => {
	$('.cell-input').each((index, input) => {
		let inputValue = /[1-9]/.test(solvedBoard[index]) ? solvedBoard[index] : "";
		$(input).val(inputValue);
	});
}
