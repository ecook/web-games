var View = function(name, x, y, width, height, action) {

	this.name = name;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.action = action;
	this.isVisible = false;
	this.fillStyle = 'red';
	this.isActive = false;
	this.controls = new Array();
}

View.prototype.draw = function(context) {

	if(this.isVisible) {
		// draw background
		//context.strokeStyle = this.borderColor;
		context.fillStyle = this.fillStyle;
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.x + this.width, this.y);
		context.lineTo(this.x + this.width, this.y + this.height);
		context.lineTo(this.x, this.y + this.height);
		context.lineTo(this.x, this.y);
		context.closePath();
		context.stroke();
		context.fill();
	
		//draw controls
		for(var i in this.controls) {
			this.controls[i].draw(context);
		}
	}

}

View.prototype.process = function() {

}

View.prototype.eventHandler = function(event) {
		if(this.isActive) {
			switch(event.type) {
				case 'mouseup': {
					for(var i in this.controls) {
						if(this.controls[i].isHit(event.pageX, event.pageY)) {
							this.controls[i].action(this);
							break;
						}
					}
				}
			}
		}
}

View.prototype.show = function() {
	this.isVisible = true;
	this.isActive = true;
}

View.prototype.hide = function() {
	this.isVisible = false;
	this.isActive = false;	
}