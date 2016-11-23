function Life(matrixSize, scale, drawingMode, ox, oy) {
    this.matrixSize = matrixSize;
    this.drawingMode = drawingMode || 'default';
    this.scale = scale || 10;
    this.scaleHalf = this.scale / 2;
    this.ox = ox;
    this.oy = oy;

    this.cellsCount = this.matrixSize * this.matrixSize;
    this.cells = [];
    this.cellsAround = {};
    this.stepsCount = 0;

    this.randomFill = function (sens) {
    	for (var i = 0; i < this.cellsCount; i++) {
    		this.cells.push(round(random(0, 1) - ((sens) ? sens : 0.5) / 2));
    	}
    }

    this.calcAroundCells = function () {
        this.cellsAround = {};
    	for (var i = 0; i < this.matrixSize; i++) {
    		for (var j = 0; j < this.matrixSize; j++) {
    			var index = i * this.matrixSize + j;

    			for (var oi = 1; oi >= -1; oi--) {
    				for (var oj = 1; oj >= -1; oj--) {

    					if ((oi + i >= this.matrixSize) ||
                            (oi + i < 0) ||
                            (oj + j >= this.matrixSize) ||
                            (oj + j < 0))
                            continue;

    					var checkIndex = (i + oi) * this.matrixSize + j + oj;
    					if (this.cells[checkIndex] > 0 && (checkIndex != index)) {
                            this.cellsAround[index] = (this.cellsAround[index]) ? this.cellsAround[index] + 1 : 1;
                        }

    				}
    			}

    		}
    	}
    }

    this.makeAStep = function() {
        //console.log(this.cellsAround);
    	for (var i = 0; i < this.cellsCount; i++) {
    		if (this.cells[i] <= 0 && this.cellsAround[i] == 3) {
    			this.cells[i] = 1;
    		} else if (this.cells[i] > 0) {
                if (this.cellsAround[i] < 2 || this.cellsAround[i] > 3) {
    			    this.cells[i] = -1;
                } else if (!this.cellsAround[i]) {
                    this.cells[i] = -1;
                } else {
                    this.cells[i]++;
                }
    		} else if (this.cells[i] < 0)
    			this.cells[i]--;
    	}
        this.stepsCount++;
    }

    this.drawField = function () {
    	if (this.drawingMode == 'iso') {
    		clear();
    	}
    	for (var i = 0; i < this.matrixSize; i++) {
    		for (var j = 0; j < this.matrixSize; j++) {
                this.drawCell(i,j);
    		}
    	}
    }

    this.drawCell = function (i, j) {
        var index = i * this.matrixSize + j;
        if (this.drawingMode == 'iso') {
            var x = (i - j) * this.scale + this.ox,
                y = (i + j) * this.scaleHalf + this.oy,
                br = x + this.scale,
                bl = x - this.scale,
                tm = y - this.scale,
                bt = y + this.scaleHalf,
                tb = y - this.scaleHalf,
                tt = tm - this.scaleHalf;
            fill(200);
            quad(bl, y, x, bt, br, y, x, tb);
            if (this.cells[index] >= 1) {
                fill(175);
                quad(bl, y, bl, tm, x, tb, x, bt);
                fill(150);
                quad(br, y, br, tm, x, tb, x, bt);
                fill(225);
                quad(bl, tm, x, tb, br, tm, x, tt);
            }
        } else
        if (this.drawingMode == 'inc') {
            var x = i * this.scale,
                y = j * this.scale;
            if (this.cells[index] > 0) {
                fill(100);
                rect(x, y, this.scale, this.scale);
            } else
            if (this.cells[index] < 0 && this.cells[index] > -154) {
                fill(101 + this.cells[index] * -1);
                rect(x, y, this.scale, this.scale);
            }
        } else {
            var x = i * this.scale,
                y = j * this.scale;
            if (this.cells[index] > 0) {
                fill(100);
                rect(x, y, this.scale, this.scale);
            } else
            if (this.cells[index] == -1) {
                fill(150);
                rect(x, y, this.scale, this.scale);
            } else
            if (this.cells[index] == -2) {
                fill(200);
                rect(x, y, this.scale, this.scale);
            }
            fill(150);
        }
    }
}
