var DrawTools = function(canvas) {

    this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.shapes = [];

    this.ClearCanvas = function() {
        this.context.fillStyle = settings.canvasBackColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

	this.addShapePoint = function(name, x, y) {
		var found = false;
        for(var i in this.shapes) {
            if(this.shapes[i].name == name) {
                found = true;
                this.shapes[i].points[this.shapes[i].points.length] = { x: x, y: y};
                break;
            }
        }

		if(!found) {
			//create new shape
			this.shapes[this.shapes.length] = { name: name, points: [{x: x, y: y}] };
		}
	}
	
	this.customShape = function(name, x, y, scale, lineColor, fillColor) {
        var ctx = this.context,
            radius = 4 * scale;

        if(name === 'circle') {
            this.circle(x + radius, y + radius, radius, lineColor, fillColor);
        } else if (name === 'doubleCircle') {
            this.circle(x + radius, y + radius, radius, lineColor, fillColor);
            this.circle(x + (radius * 3), y + radius, radius, lineColor, fillColor);
        } else {

            this.shapes.forEach(function (shape) {
                if (shape.name == name) {
                    ctx.strokeStyle = lineColor;
                    ctx.beginPath();
                    ctx.moveTo(parseInt(shape.points[0].x * scale) + x, parseInt(shape.points[0].y * scale) + y);
                    if (shape.points.length > 1) {
                        for (var p = 1; p < shape.points.length; p++) {
                            ctx.lineTo(parseInt(shape.points[p].x * scale) + x, parseInt(shape.points[p].y * scale) + y);
                        }
                    }
                    ctx.closePath();
                    ctx.stroke();
                    if (fillColor != null) {
                        ctx.fillStyle = fillColor;
                        ctx.fill();
                    }
                    return;
                }
            })
        }
	}

	this.recOutline = function(x, y, width, height, color, thickness) {
		var x1 = x;
		var y1 = y;
		var x2 = x1 + width;
		var y2 = y1 + height;
		this.context.strokeStyle = color;
		this.context.beginPath();
		for(var i = 0; i < thickness; i++) {
			this.context.moveTo(x1, y1);
			this.context.lineTo(x2, y1);
			this.context.lineTo(x2, y2);
			this.context.lineTo(x1, y2);
			this.context.lineTo(x1, y1);
			x1++;
			y1++;
			x2--;
			y2--;			
		}
		this.context.closePath();
		this.context.stroke();
	}
	
	this.recFill = function(x, y, width, height, lineColor, fillColor) {

        this.context.strokeStyle = lineColor;
		this.context.fillStyle = fillColor;
		this.context.fillRect(x, y, width, height);

	}

	this.circle = function(x, y, radius, lineColor, fillColor) {
		this.context.strokeStyle = lineColor;
		this.context.beginPath();
		this.context.arc(x, y, radius, 0, 2*Math.PI);
		this.context.stroke();
		if(fillColor != null) {
			this.context.fillStyle = fillColor;
			this.context.fill();
		}
	}
	
	this.line = function(x1, y1, x2, y2, color) {
        //draw line
        this.context.strokeStyle = color;
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    this.text = function(x, y, pixels, font, color, text){
        this.context.fillStyle = color;
        this.context.font = pixels + 'px ' + font;
        this.context.fillText(text, x, y);
    }

    this.textWidth = function(text) {
        return this.context.measureText(text).width;
    }

    this.halfCircle = function(x, y, radius, start, end, color) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, start, end, true);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }

    this.createShape = function(type) {
        var newObject = null;

        switch (type){
            case 'line':
            {
                newObject = {type: 'line', x1: 0, y1: 0, x2: 0, y2: 0, color: 'red'};
                break;
            }
            case 'circle':
            {
                newObject = {type: 'circle', x: 0, y: 0, radius: 0, lineColor: 'red', fillColor: 'red'};
                break;
            }
            case 'rectangle':
            {
                newObject = {type: 'rectangle', x: 0, y: 0, width: 0, height: 0, lineColor: 'red', fillColor: 'red'};
                break;
            }
            case 'shape':
            {
                newObject = {type: 'shape', x: 0, y: 0, lineColor: 'red', fillColor: 'red', points: [{x: 0, y: 0}]};
                break;
            }
            default:
            {
                console.log('unknown shape type ' + type);
                break;
            }
        }

        return newObject;
    }

    this.drawShape = function(x, y, shapes) {

        shapes.forEach(function(shape){

            switch (shape.type){
                case 'line':
                {
                    this.line(shape.x1 + x, shape.y1 + y, shape.x2 + x, shape.y2 + y, shape.color);
                    break;
                }
                case 'circle':
                {
                    this.circle(shape.x + x, shape.y + y, shape.radius, shape.lineColor, shape.fillColor);
                    break;
                }
                case 'rectangle':
                {
                    this.recFill(shape.x + x, shape.y + y, shape.width, shape.height, shape.lineColor, shape.fillColor);
                    break;
                }
                case 'shape':
                {
                    //{type: 'shape', x: 0, y: 0, lineColor: '', fillColor: '', points: []};
                    this.context.beginPath();
                    this.context.strokeStyle = shape.lineColor;
                    this.context.fillStyle = shape.fillColor;
                    this.context.moveTo(shape.x + x, shape.y + y);
                    for(var i = 0; i < shape.points.length; i++) {
                        this.context.lineTo(shape.points[i].x + x + shape.x, shape.points[i].y + y + shape.y);
                    }
                    this.context.closePath();
                    this.context.stroke();
                    break;
                }
            }
        }, this)
    }

    // checkbox control X
    this.addShapePoint('checkboxX', 0, 0);
    this.addShapePoint('checkboxX', 100, 100);
    this.addShapePoint('checkboxX', 50, 50);
    this.addShapePoint('checkboxX', 100, 0);
    this.addShapePoint('checkboxX', 0, 100);

    // triangle
    this.addShapePoint('triangle', 10, 10);
    this.addShapePoint('triangle', 0, 10);
    this.addShapePoint('triangle', 5, 0);

    // downarrow
    this.addShapePoint('arrowDown', 2, 0);
    this.addShapePoint('arrowDown', 5, 0);
    this.addShapePoint('arrowDown', 5, 5);
    this.addShapePoint('arrowDown', 7, 5);
    this.addShapePoint('arrowDown', 3, 8);
    this.addShapePoint('arrowDown', 0, 5);
    this.addShapePoint('arrowDown', 2, 5);
    this.addShapePoint('arrowDown', 2, 0);

    // arrowUp
    this.addShapePoint('arrowUp', 3, 0);
    this.addShapePoint('arrowUp', 7, 3);
    this.addShapePoint('arrowUp', 5, 3);
    this.addShapePoint('arrowUp', 5, 8);
    this.addShapePoint('arrowUp', 2, 8);
    this.addShapePoint('arrowUp', 2, 3);
    this.addShapePoint('arrowUp', 0, 3);
    this.addShapePoint('arrowUp', 3, 0);
}