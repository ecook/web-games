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
	this.rulers = new Rulers(this);
	
	this.dragButton = new Button(this, this.x + 0, this.y + 0, 20, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '+', 10, 'Arial', 12);
	this.addControl(this.dragButton); 


	this.draw = function(context) {

		if(this.isVisible) {
			// draw background
			drawTools.context = context;
			drawTools.recFill(this.x, this.y, this.width, this.height, this.fillStyle);
			
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

	this.process = function() {

	}

	this.eventHandler = function(event) {
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
						break;
					}
					case 'mousedown': {
						for(var i in this.controls) {
							if(this.controls[i].isHit(event.pageX, event.pageY)) {
								if(this.controls[i].mousedown != null) {
									this.controls[i].mousedown(this, event);
								}
								break;
							}
						}
					}
					case 'mousemove': {
						for(var i in this.controls) {
							if(this.controls[i].isHit(event.pageX, event.pageY)) {
								if(this.controls[i].mousemove != null) {
									this.controls[i].mousemove(this, event);
								}
								break;
							}
						}
						break;
					}
					case 'keyup': {
						for(var i in this.controls) {
							if(this.controls[i].isHit(event.pageX, event.pageY)) {
								if(this.controls[i].keyup != null) {
									this.controls[i].keyup(this, event);
								}
								break;
							}
						}
						break;
					}
					case 'keydown': {
						for(var i in this.controls) {
							if(this.controls[i].isHit(event.pageX, event.pageY)) {
								if(this.controls[i].keydown != null) {
									this.controls[i].keydown(this, event);
								}
								break;
							}
						}
						break;
					}
				}
			}
	}

	this.show = function() {
		Object.getPrototypeOf(this).isVisible = true;
		Object.getPrototypeOf(this).isActive = true;
	}

	this.hide = function() {
		this.isVisible = false;
		this.isActive = false;	
	}

}

View.prototype.addControl = function(control) {
	control.x += this.x;
	control.y += this.y;
	this.controls[this.controls.length] = control;
}