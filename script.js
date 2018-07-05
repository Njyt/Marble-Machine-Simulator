

var marbleMachineVideo = document.getElementById("marbleMachineVideo");
let notes = [];
let numRows = 24;
$("#RowNum").val(numRows);

const sample1 = new Tone.Player({
	url: './samples/K.wav',
	loop: false,
	retrigger: true
}).toMaster();
const sample2 = new Tone.Player({
	url: './samples/S.wav',
	loop: false,
	retrigger: true
}).toMaster();
const sample3 = new Tone.Player({
	url: './samples/C.wav',
}).toMaster();
const sample4 = new Tone.Player({
	url: './samples/1.wav',
	loop: false,
	retrigger: true
}).toMaster();
const sample5 = new Tone.Player({
	url: './samples/2.wav',
	loop: false,
	retrigger: true
}).toMaster();
const sample6 = new Tone.Player({
	url: './samples/3.wav',
	loop: false,
	retrigger: true
}).toMaster();
const sample7 = new Tone.Player({
	url: './samples/4.wav',
	loop: false,
	retrigger: true
}).toMaster();
const sample8 = new Tone.Player({
	url: './samples/5.wav',
	loop: false,
	retrigger: true
}).toMaster();
const sample9 = new Tone.Player({
	url: './samples/6.wav',
	loop: false,
	retrigger: true
}).toMaster();
const sample10 = new Tone.Player({
	url: './samples/7.wav',
	loop: false,
	retrigger: true
}).toMaster();

function makeCheckbox($row, i, j) {
	const $input = $('<div class="cell"><input type="checkbox"></div>');
	$input.on('click', () => {
		if (notes[i][j] === 0) {
			notes[i][j] = 1;
		} else {
			notes[i][j] = 0;
		}
	});
	$row.append($input);
};

function makeRow(i) {
	const $row = $('<div class="row"></div>');
	$('#wrapper').append($row);
	for (var j = 0; j < 10; j++) {
		makeCheckbox($row, i, j);
	}
	notes = [
		...notes,
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
};

for (var i = 0; i < numRows; i++) {
	makeRow(i);
}

let rowIndex = 0;
var intervalId = false;


function Pause() {
	clearInterval(intervalId);
	intervalId = false;
	marbleMachineVideo.pause();
}
$("#Pause_track").on('click', Pause);


var vid = document.getElementById("MM");



function Play() {
	if (intervalId !== false) {
		return;
	}

	intervalId = setInterval(
		() => {
			const row = notes[rowIndex];

			var $rows = $('.row');
			$rows.removeClass('active');
			$rows.eq(rowIndex).addClass('active');

			if (row[0] === 1) {
				sample1.start();
			}
			if (row[1] === 1) {
				sample2.start();
			}
			if (row[2] === 1) {
				sample3.start();
			}
			if (row[3] === 1) {
				sample4.start();
			}
			if (row[4] === 1) {
				sample5.start();
			}
			if (row[5] === 1) {
				sample6.start();
			}
			if (row[6] === 1) {
				sample7.start();
			}
			if (row[7] === 1) {
				sample8.start();
			}
			if (row[8] === 1) {
				sample9.start();
			}
			if (row[9] === 1) {
				sample10.start();
			}
			rowIndex = (rowIndex + 1) % notes.length;
		},
		500
	);

	marbleMachineVideo.play();

}


$("#Play_track").on('click', Play);

function Reset() {
	notes = [];
	for (var i = 0; i < numRows; i++) {
		notes = [
			...notes,
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
	}
	$('input[type=checkbox]').prop('checked', false);
}
$("#Reset").on('click', Reset);


function setNumRows(newNumRows) {
	const diff = newNumRows - numRows;
	if (diff === 0) {
		return;
	}

	console.log(diff);
	if (diff > 0) {
		// add more rows
		for (var i = 0; i < diff; i++) {
			makeRow(numRows + i);
		}
	} else {
		// remove extra rows
		const $rows = $('.row');
		for (var i = 0; i < numRows; i++) {
			if (i >= newNumRows) {
				const $row = $rows.eq(i);
				// console.log($row);
				$row.remove();
			}
		}
		notes = notes.slice(0, newNumRows);
	}

	numRows = newNumRows;
}

function Adjust() {
	var value = $("#RowNum").val();
	value = parseInt(value, 10);
	setNumRows(value);
	rowIndex = 0;
}


$("#change-button").on('click', Adjust);

function GoToTop() {
	rowIndex = 0;
	var $rows = $('.row');
	$rows.removeClass('active');
	Pause();
}

$("#Go_To_Top").on('click', GoToTop);
