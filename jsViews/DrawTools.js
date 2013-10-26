var DrawTools = function() {

	this.context = null;
	this.shapes = new Array();
	
	this.addShapePoint = function(name, x, y) {
		var found = false;
		for(var i in this.shapes) {
			if(this.shapes[i].name == name) {
				found = true;
				this.shapes[i].points[this.shapes[i].points.length] = { x: x, y: y};
			}
		}
		if(!found) {
			//create new shape
			this.shapes[this.shapes.length] = { name: name, points: [{x: x, y: y}] };
		}
	}
	
	this.customShape = function(name, x, y, scale, lineColor, fillColor) {
		for(var i in this.shapes) {
			if(this.shapes[i].name == name) {
				this.context.strokeStyle = lineColor;
				this.context.beginPath();
				this.context.moveTo(parseInt(this.shapes[i].points[0].x * scale) + x, parseInt(this.shapes[i].points[0].y * scale) + y);
				if(this.shapes[i].points.length > 1) {
					for(var p = 1; p < this.shapes[i].points.length; p++) {
						this.context.lineTo(parseInt(this.shapes[i].points[p].x * scale) + x, parseInt(this.shapes[i].points[p].y * scale) + y);
					}
				}
				this.context.closePath();
				this.context.stroke();
				if(fillColor != null) {
					this.context.fillStyle = fillColor;
					this.context.fill();
				}
			}
		}		
	}

	this.recOutline = function(x, y, width, height, color, thinkness) {
		var x1 = x;
		var y1 = y;
		var x2 = x1 + width;
		var y2 = y1 + height;
		this.context.strokeStyle = color;
		this.context.beginPath();
		for(var i = 0; i < thinkness; i++) {
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
	
	
}