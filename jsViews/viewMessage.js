var ViewMessage = function(){

	this.width = 450; //message.length;
	this.height = 300;
	this.message = '';
	this.x = 0;
	this.y = 0;

	//this.__proto__ = new View(name, x, y, width, height, action);
	Object.setPrototypeOf(this, new View('Message', this.x, this.y, this.width, this.height, 'grey', 99, null))

	this.borderColor = 'white';
	
	this.rulers.add('x1', true, 10 + this.x);
	this.rulers.add('y1', false, 10 + this.y);

	this.button1 = new Button(this, this.x + 10, this.y + this.height - 30, 40, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'ok', 10, 'Arial', 12);
	this.label1 = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', this.message, 'Arial', 20);
	
	this.addControl(this.button1);
	this.addControl(this.label1);
	
	this.draw = function(context) {
	
		if(this.isVisible) {
			// call base draw method
			Object.getPrototypeOf(this).draw(context);
			
			// draw border
			context.strokeStyle = this.borderColor;
			context.beginPath();
			context.moveTo(this.x, this.y);
			context.lineTo(this.x + this.width, this.y);
			context.lineTo(this.x + this.width, this.y + this.height);
			context.lineTo(this.x, this.y + this.height);
			context.lineTo(this.x, this.y);
			context.closePath();
			context.stroke();
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
	}
		
}