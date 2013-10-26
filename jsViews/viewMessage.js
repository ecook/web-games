var ViewMessage = function(){

	Object.setPrototypeOf(this, new View('Message', 0, 0, 250, 100, 'grey', 99, null))

	this.borderColor = 'white';
	
	this.rulers.add('x1', true, 10 + this.x);
	this.rulers.add('y1', false, 25 + this.y);

	this.button1 = new Button(this, this.x + 10, this.y + this.height - 30, 40, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'ok');
	this.label1 = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', this.message);
	
	this.addControl(this.button1);
	this.addControl(this.label1);
	
	this.draw = function(context) {
	
		if(this.isVisible) {
			// call base draw method
			Object.getPrototypeOf(this).draw(context);
			
			// draw border
			drawTools.context = context;			
			drawTools.recOutline(this.x, this.y, this.width, this.height, this.borderColor, 3);
		}
	}


	this.button1.mouseup = function(caller, event) {
		Object.getPrototypeOf(caller).hide();
	}
	
	this.show = function(x, y, message) {
		var self = Object.getPrototypeOf(this);
		self.x = x;
		self.y = y;
		self.message = message;
		self.isVisible = true;
		self.isActive = true;
		
		//relative update of objects in view
		
	}
		
}