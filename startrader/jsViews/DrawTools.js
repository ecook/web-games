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
		this.shapes.forEach(function(shape){
            if (shape.name == name) {
                found = true;
                shape.points[shape.points.length] = { x: x, y: y};
                return;
            }
        });

		if(!found) {
			//create new shape
			this.shapes[this.shapes.length] = { name: name, points: [{x: x, y: y}] };
		}
	}
	
	this.customShape = function(name, x, y, scale, lineColor, fillColor) {
        var ctx = this.context;

        this.shapes.forEach(function(shape) {
			if(shape.name == name) {
                ctx.strokeStyle = lineColor;
                ctx.beginPath();
                ctx.moveTo(parseInt(shape.points[0].x * scale) + x, parseInt(shape.points[0].y * scale) + y);
				if(shape.points.length > 1) {
					for(var p = 1; p < shape.points.length; p++) {
                        ctx.lineTo(parseInt(shape.points[p].x * scale) + x, parseInt(shape.points[p].y * scale) + y);
					}
				}
                ctx.closePath();
                ctx.stroke();
				if(fillColor != null) {
                    ctx.fillStyle = fillColor;
                    ctx.fill();
				}
                return;
			}
		}		)
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
	
	this.recFill = function(x, y, width, height, color) {

		this.context.fillStyle = color;
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

    this.arc = function(x, y, radius, start, end, color) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, start, end );
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }

    // checkbox control X
    this.addShapePoint('checkboxX', 0, 0);
    this.addShapePoint('checkboxX', 100, 100);
    this.addShapePoint('checkboxX', 50, 50);
    this.addShapePoint('checkboxX', 100, 0);
    this.addShapePoint('checkboxX', 0, 100);
}