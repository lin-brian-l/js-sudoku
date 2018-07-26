// const Board = require('models/board.js');

$(document).ready(() => {
	createBoard();

	$('input').keypress(validateInput);

	$('button').click(initiateSolveBoard);
})

let validateInput = (event) => {
	let text = String.fromCharCode(event.which);
	return /[1-9]/.test(text);	
}

let createBoard = () => {
	let boardString = '1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--';
	for (var cell = 0; cell < 81; cell++) {
		let divClass = 'cell';
		if (rightBoldedCheck(cell)) divClass += ' right-bold';
		if (bottomBoldedCheck(cell)) divClass += ' bottom-bold';
		let inputValue = boardString[cell] === '-' ? "" : boardString[cell];
		let inputElement = `<input type='text' name='input${cell}' maxlength='1' value='${inputValue}'></input>`;
		let divElement = `<div id='${cell}' class='${divClass}'>${inputElement}</div>`;
		$(".board").append(divElement);	
	}	

	// for (var cell = 0; cell < 81; cell++) {
	// 	let divClass = 'cell';
	// 	if (rightBoldedCheck(cell)) divClass += ' right-bold';
	// 	if (bottomBoldedCheck(cell)) divClass += ' bottom-bold';
	// 	let inputElement = `<input type='text' name='input${cell}' maxlength='1'></input>`;
	// 	let divElement = `<div id='${cell}' class='${divClass}'>${inputElement}</div>`;
	// 	$(".board").append(divElement);	
	// }
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
	fillBoardSolution(solvedBoard);
}

let createBoardString = () => {
	let boardString = "";
	$('input').each((index, input) => {
		boardString += $(input).val() || "-";
	});
	return boardString;
}

let fillBoardSolution = (solvedBoard) => {
	$('input').each((index, input) => {
		$(input).val(solvedBoard[index]);
	});
}