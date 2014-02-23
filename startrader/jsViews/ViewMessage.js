var ViewMessage = function(){

	Object.setPrototypeOf(this, new View('Message', 250, 100, 'grey', 99, null))

	this.borderColor = 'white';
	this.message;
	
	this.rulers.add('x1', true, 10);
	this.rulers.add('y1', false, 25);

	this.button1 = new Button(this, this.rulers.get('x1'), this.height - 30, 40, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'ok');
	this.label1 = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', this.message);
	
	this.addControl(this.button1);
	this.addControl(this.label1);
	
	this.draw = function(drawTools) {
	
		if(this.isVisible) {
			this.label1.value = this.message;	
		
			// call base draw method
			var obj = Object.getPrototypeOf(this);
			obj.width = drawTools.textWidth(this.message) + 20;
			obj.draw(drawTools);
			
			// draw border
			drawTools.recOutline(obj.x, obj.y, obj.width, obj.height, this.borderColor, 3);
			
		}
	}

	this.button1.mouseup = function(caller, event) {
		//Object.getPrototypeOf(caller).hide();
        caller.hide();
	}
	
	this.show = function(x, y, message) {
		var self = Object.getPrototypeOf(this);
		self.x = x;
		self.y = y;
		this.message = message;
		
		
		
		self.isVisible = true;
		self.isActive = true;
	}
		
}