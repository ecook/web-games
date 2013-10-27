function Control(parent, x, y, width, height, foreColor, backColor, value) {

	this.parent = parent;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.foreColor = foreColor;
	this.backColor = backColor;	
	this.value = value;
	
	this.px = 12;
	this.font = 'Arial';
	
	this.isEnabled = true;
	this.isVisible = true;
	
	this.mousemove;
	this.mouseup;
	this.mousedown;
	this.keyup;
	this.keydown;	
	
	this.move = function(x, y) {
		this.x = x;
		this.y = y;
	
	}
	
	this.isHit = function(x, y) {
		// var x = x + parent.x;
		// var y = y + parent.y;
		if(x >= this.x + this.parent.x && x <= this.x + this.parent.x + this.width && y >= this.y + this.parent.y && y <= this.y + this.parent.y + this.height) {
			return true;
		} else {
			return false;
		}
	}

}

function Button(parent, x, y, width, height, foreColor, backColor, value) {

	Object.setPrototypeOf(this, new Control(parent, x, y, width, height, foreColor, backColor, value));

	this.isPressed = false;

	
	this.draw = function(c) {
	
		if(this.isVisible) {
			var x1 = this.x + this.parent.x;
			var y1 = this.y + this.parent.y;
		
			drawTools.context = c;
			drawTools.recFill(x1, y1, this.width, this. height, this.backColor);
			drawTools.recOutline(x1, y1, this.width, this. height, this.foreColor, 1);
		
			// draw button text
			context.fillStyle = this.foreColor;
			context.font = this.px + 'px ' + this.font;
			context.fillText(this.value, x1, y1 + this.height);
		}
	
	}

}


function Label(parent, x, y, width, height, foreColor, backColor, value) {

	Object.setPrototypeOf(this, new Control(parent, x, y, width, height, foreColor, backColor, value));
	
	this.draw = function(c) {
		var x1 = this.x + this.parent.x;
		var y1 = this.y + this.parent.y;
	
		if(this.isVisible) {
		
			// draw label text
			context.fillStyle = this.foreColor;
			context.font = this.px + 'px ' + this.font;
			context.fillText(this.value, x1, y1 + this.height);
		}
	
	}

}

