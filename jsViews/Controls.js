function Button(parent, x, y, width, height, foreColor, backColor, text, margin, font, size) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.foreColor = foreColor;
	this.backColor = backColor;
	this.isEnabled = true;
	this.isVisible = true;
	this.isPressed = false;
	this.px = size;
	this.font = font;
	this.margin = margin;
	this.parent = parent;
	
	this.mousemove;
	this.mouseup;
	this.mousedown;
	this.keyup;
	this.keydown;
	
	this.draw = function(c) {
	
		if(this.isVisible) {
			// draw button
			context.strokeStyle = this.foreColor;
			context.fillStyle = this.backColor;
			context.beginPath();
			context.moveTo(this.x, this.y);
			context.lineTo(this.x + this.width, this.y);
			context.lineTo(this.x + this.width, this.y + this.height);
			context.lineTo(this.x, this.y + this.height);
			context.lineTo(this.x, this.y);
			context.closePath();
			context.stroke();
			context.fill();
		
			// draw button text
			context.fillStyle = this.foreColor;
			context.font = this.px + 'px ' + this.font;
			context.fillText(this.text, this.x + this.margin, this.y + this.px);
		}
	
	}
	
	this.move = function(x, y) {
		this.x = x;
		this.y = y;
	
	}
	
	this.isHit = function(x, y) {

		if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
			return true;
		else
			return false;

	}

}


function Label(parent, x, y, width, height, foreColor, backColor, text, font, size) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.foreColor = foreColor;
	this.backColor = backColor;
	this.isEnabled = true;
	this.isVisible = true;
	this.isPressed = false;
	this.px = size;
	this.font = font;
	this.margin = this.px;
	this.parent = parent;
	
	this.mousemove;
	this.mouseup;
	this.mousedown;
	this.keyup;
	this.keydown;
	
	this.draw = function(c) {
	
		if(this.isVisible) {
		
			// draw label text
			context.fillStyle = this.foreColor;
			context.font = this.px + 'px ' + this.font;
			context.fillText(this.text, this.x, this.y);
		}
	
	}
	
	this.move = function(x, y) {
		this.x = x;
		this.y = y;
	
	}
	
	this.isHit = function(x, y) {

		if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
			return true;
		else
			return false;

	}

}

