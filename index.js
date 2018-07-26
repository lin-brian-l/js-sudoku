$(document).ready(() => {
	createBoard();

	$('input').keypress(validateInput);

	$('button').click(createBoardString);
})

let validateInput = (event) => {
	let text = String.fromCharCode(event.which);
	return /[1-9]/.test(text);	
}

let createBoard = () => {
	for (var cell = 0; cell < 81; cell++) {
		let divClass = 'cell';
		if (rightBoldedCheck(cell)) divClass += ' right-bold';
		if (bottomBoldedCheck(cell)) divClass += ' bottom-bold';
		let inputElement = `<input type='text' name='input${cell}' maxlength='1'></input>`;
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

let createBoardString = (event) => {
	let boardString = "";
	$('input').each((index, input) => {
		boardString += $(input).val() || "-";
	});
	console.log("boardString: " + boardString);
}