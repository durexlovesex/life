var life, fr, gen;
const
	scale = 10, // recommend value is 10, 1 - 999
	mode = 'default', // aviable mods - iso, inc, default
	sensitivity = 0.5, // 0 - 1
	speed = 1;  // 0 - 1

function setup() {
	createCanvas(500, 500);
	frameRate(speed * 60);
	noStroke();

	fr = createP('');
	gen = createP('');

	var count = (mode == 'iso') ? floor(width / scale / 2) : floor(width / scale);
	var ox = floor(width / 2);
	var oy = scale + floor(scale / 2) + height / 2 - width / 4;

	life = new Life(count, scale, mode, ox, oy);
	life.randomFill();
}

function draw() {
	life.drawField();
	life.calcAroundCells();
	life.makeAStep();
	fr.html(floor(frameRate()));
	gen.html(life.stepsCount);
}
