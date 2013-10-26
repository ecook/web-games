var View = function(name, x, y, width, height, backColor, drawOrder, action) {

	this.name = name;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.fillStyle = backColor;
	this.action = action;
	this.isVisible = false;
	this.isActive = false;
	this.dragable = true;
	this.drawOrder = drawOrder;
	this.controls = new Array();
	this.rulers = new Rulers(x, y, width, height);
	
	this.dragButton = new Button(this, this.x + 0, this.y + 0, 20, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '+', 10, 'Arial', 12);
	this.addControl(this.dragButton); 
}

View.prototype.draw = function(context) {

	if(this.isVisible) {
		// draw background
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
		
		//draw rulers
		if(settings.debug) {
			this.rulers.draw(context);
		}
	
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
							if(this.controls[i].mouseup != null) {
								this.controls[i].mouseup(this, event);
							}
							break;
						}
					}
				}
				case 'mousedown': {
					for(var i in this.controls) {
						if(this.controls[i].isHit(event.pageX, event.pageY)) {
							if(this.controls[i].mousedown != null) {
								this.controls[i].mousedown(event);
							}
							break;
						}
					}
				}
				case 'mousemove': {
					for(var i in this.controls) {
						if(this.controls[i].isHit(event.pageX, event.pageY)) {
							if(this.controls[i].mousemove != null) {
								this.controls[i].mousemove(event);
							}
							break;
						}
					}
				}
				case 'keyup': {
					for(var i in this.controls) {
						if(this.controls[i].isHit(event.pageX, event.pageY)) {
							if(this.controls[i].keyup != null) {
								this.controls[i].keyup(event);
							}
							break;
						}
					}
				}
				case 'keydown': {
					for(var i in this.controls) {
						if(this.controls[i].isHit(event.pageX, event.pageY)) {
							if(this.controls[i].keydown != null) {
								this.controls[i].keydown(event);
							}
							break;
						}
					}
				}
			}
		}
}

View.prototype.addControl = function(control) {
	control.x += this.x;
	control.y += this.y;
	this.controls[this.controls.length] = control;
}

View.prototype.show = function() {
	Object.getPrototypeOf(this).isVisible = true;
	Object.getPrototypeOf(this).isActive = true;
}

View.prototype.hide = function() {
	this.isVisible = false;
	this.isActive = false;	
}