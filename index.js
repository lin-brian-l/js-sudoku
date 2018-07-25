$(document).ready(() => {
	createBoard();
})

let createBoard = () => {
	for (var cell = 0; cell < 81; cell++) {
		let inputClass = 'cell';
		if (rightBolded(cell)) inputClass += ' right-bold';
		if (bottomBolded(cell)) inputClass += ' bottom-bold';
		$(".board").append(`<input id='${cell}' type='text' class='${inputClass}'></input>`);	

		// let divClass = 'cell';
		// if (rightBolded(cell)) divClass += ' right-bold';
		// if (bottomBolded(cell)) divClass += ' bottom-bold';
		// $(".board").append(`<div id='${cell}' class='${divClass}'></div>`);	
	}
}

let rightBolded = (cell) => {
	return (cell + 1) % 3 === 0 && (cell + 1) % 9 !== 0;
}

let bottomBolded = (cell) => {
	return Math.ceil((cell + 1) / 9 ) % 3 === 0 && Math.ceil((cell + 1) / 9 ) < 9;
}