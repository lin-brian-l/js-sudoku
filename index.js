$(document).ready(() => {
	createBoard();
})

let createBoard = () => {
	for (var cell = 0; cell < 81; cell++) {
		let divClass = 'cell';
		if ((cell + 1) % 3 === 0) divClass += ' right-bold';
		if (Math.ceil((cell + 1) / 9 ) % 3 === 0) divClass += ' bottom-bold';
		$(".board").append(`<div class='${divClass}'></div>`);	
	}
}