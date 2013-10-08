function Button(x, y, width, height, foreColor, backColor, text, font, size, action) {

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
			// draw button
			context.strokeStyle = this.foreColor;
			context.fillStyle = this.backColor;
			context.beginPath();
			context.moveTo(this.x, this.y);
			context.lineTo(this.x + this.width, this.y);
			context.lineTo(this.x + this.width, y + this.height);
			context.lineTo(this.x, y + this.height);
			context.lineTo(this.x, this.y);
			context.closePath();
			context.stroke();
			context.fill();
		
			// draw button text
			context.fillStyle = this.foreColor;
			context.font = this.px + 'px ' + this.font;
			context.fillText(this.text, this.x + this.margin, this.y + this.margin);
		}
	
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