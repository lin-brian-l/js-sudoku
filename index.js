$(document).ready(() => {
	createBoard();
})

let createBoard = () => {
	for (var cell = 0; cell < 81; cell++) {
		let divClass = 'cell';
		if (rightBolded(cell)) divClass += ' right-bold';
		if (bottomBolded(cell)) divClass += ' bottom-bold';
		$(".board").append(`<div id='${cell}' class='${divClass}'></div>`);	
	}
}

let rightBolded = (cell) => {
	return (cell + 1) % 3 === 0 && (cell + 1) % 9 !== 0;
}

let bottomBolded = (cell) => {
	return Math.ceil((cell + 1) / 9 ) % 3 === 0 && Math.ceil((cell + 1) / 9 ) < 9;
}