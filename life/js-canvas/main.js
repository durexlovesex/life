// TODO refactor

var count, ox, oy, cells, cellsCount, cellsAround, fr, gen, iteration;
const
	scale = 10, // recomend value is 10, 1 - 999
	mode = 'default', // aviable mods - iso, tower, default
	sensitivity = 0.5, // 0 - 1
	speed = 0.5;  // 0 - 1


function setup() {
	createCanvas(1001, 521);
	frameRate(speed * 60);
	noStroke();
	//fill(225);
	count = floor((width) / scale / 2);
	//rect(0, 0, count * scale, count * scale);
	ox = floor(width / 2);
	oy = scale + floor(scale / 2);
	fr = createP('');
	gen = createP('');

	cells = [];
	cellsCount = count * count;
	cellsAround = {};
	iteration = 0;
	for (var i = 0; i < cellsCount; i++) {
		cells.push(round(random(0, 1) - sensitivity / 2));
	}
}

function calc() {
	cellsAround = {};
	for (var i = 0; i < count; i++) {
		for (var j = 0; j < count; j++) {
			var index = i * count + j;
			for (var oi = 1; oi >= -1; oi--) {
				for (var oj = 1; oj >= -1; oj--) {
					if (((oi + i) >= count) || ((oi + i) < 0) || ((oj + j) >= count) || ((oj + j) < 0)) continue;
					var checkIndex = (i + oi) * count + j + oj;
					if (cells[checkIndex] > 0 && (checkIndex != index)) cellsAround[index] = (cellsAround[index]) ? cellsAround[index] + 1 : 1;
				}
			}
		}
	}
	for (var i = 0; i < cellsCount; i++) {
		var index = i;
		if (cells[index] <= 0 && (cellsAround[index] == 3)) {
			cells[index] = 1;
		} else if (cells[index] > 0 && (cellsAround[index] < 2 || cellsAround[index] > 3)) {
			cells[index] = -1;
		} else if (cells[index] > 0 && !cellsAround[index]) {
			cells[index] = -1;
		} else if (cells[index] < 0)
			cells[index]--;
		else if (cells[index] > 0) cells[index]++;
	}
	iteration++;
	gen.html(floor(iteration));
}

function draw() {
	if (mode == 'iso') {
		clear();
	}
	for (var i = 0; i < count; i++) {
		for (var j = 0; j < count; j++) {
			if (mode == 'iso') {
				var x = (i - j) * scale + ox,
					y = (i + j) * scale / 2 + oy,
					index = i * count + j;
				quad(x - scale, y, x, y + scale / 2, x + scale, y, x, y - scale / 2);
				fill(200);
				quad(x - scale, y, x, y + scale / 2, x + scale, y, x, y - scale / 2);
				fill(200);
				quad(x - scale, y, x, y + scale / 2, x + scale, y, x, y - scale / 2);
				if (cells[index] >= 1) {
					fill(175);
					quad(x - scale, y, x - scale, y - scale, x, y - scale / 2, x, y + scale / 2);
					fill(150);
					quad(x + scale, y, x + scale, y - scale, x, y - scale / 2, x, y + scale / 2);
					fill(225);
					quad(x - scale, y - scale, x, y - scale / 2, x + scale, y - scale, x, y - scale - scale / 2);
				}
			} else
			if (mode == 'tower') {
				var index = i * count + j,
					x = i * scale,
					y = j * scale;
				if (cells[index] > 0) {
					fill(100);
					rect(x, y, scale, scale);
				} else
				if (cells[index] < 0 && cells[index] > -147) {
					fill(101 + cells[index] * -1);
					rect(x, y, scale, scale);
				}
			} else {
				var index = i * count + j,
					x = i * scale,
					y = j * scale;
				if (cells[index] > 0) {
					fill(100);
					rect(x, y, scale, scale);
				} else
				if (cells[index] == -1) {
					fill(150);
					rect(x, y, scale, scale);
				} else
				if (cells[index] == -2) {
					fill(200);
					rect(x, y, scale, scale);
				}
			}
		}
	}
	fr.html(floor(frameRate()));
	calc();
}
