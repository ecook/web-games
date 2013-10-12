function Button(x, y, width, height, foreColor, backColor, text, margin, font, size, action) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.foreColor = foreColor;
	this.backColor = backColor;
	this.enabled = false;
	this.visible = false;
	this.pressed = false;
	this.px = size;
	this.font = font;
	this.margin = margin;
	this.action = action;
	
	this.draw = function(c) {
	
		if(this.visible) {
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
	
	this.hit = function(x, y) {

		if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
			return true;
		else
			return false;

	}

}


function Label(x, y, width, height, foreColor, backColor, text, font, size, action) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.foreColor = foreColor;
	this.backColor = backColor;
	this.enabled = false;
	this.visible = false;
	this.pressed = false;
	this.px = size;
	this.font = font;
	this.margin = this.px;
	this.action = action;
	
	this.draw = function(c) {
	
		if(this.visible) {
		
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
	
	this.hit = function(x, y) {

		if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
			return true;
		else
			return false;

	}

}

function InvItem(x, y, width, height, foreColor, backColor, item, font, size, action) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.item = item;
	this.foreColor = foreColor;
	this.backColor = backColor;
	this.enabled = false;
	this.visible = false;
	this.pressed = false;
	this.px = size;
	this.font = font;
	this.margin = this.px;
	this.action = action;
	
	this.draw = function(c) {
	
		if(this.visible) {
		
			// draw label text
			context.fillStyle = this.foreColor;
			context.font = this.px + 'px ' + this.font;
			var text = this.item.quantity + '   $' + this.item.basePrice + ' == ' + this.item.name;
			context.fillText(text, this.x + this.margin, this.y + this.margin);
		}
	
	}
	
	this.move = function(x, y) {
		this.x = x;
		this.y = y;
	
	}
	
	this.hit = function(x, y) {

		if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
			return true;
		else
			return false;

	}

}

function Modal() {

	this.isActive = false;


}