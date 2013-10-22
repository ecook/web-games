var ViewMessage = function(name, x, y, message){

	this.width = 200; //message.length;
	this.height = 50;

	//this.__proto__ = new View(name, x, y, width, height, action);
	Object.setPrototypeOf(this, new View(name, x, y, this.width, this.height, 'gray', null))

	this.borderColor = 'white';
	
	this.rulers.add('x1', true, 10);
	this.rulers.add('y1', false, 10);

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

	//add controls
	// this.controls[0] = new Button(this.x + this.width - 70, this.y + this.height - 30, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'cancel', 10, 'Arial', 12, this.hide);
	this.controls[0] = new Button(this, this.x + 10, this.y + this.height - 30, 40, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'ok', 10, 'Arial', 12, this.hide);
	//this.controls[0] = new Button(this.rulers.get('x2'), this.rulers.get('y2'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'test', 10, 'Arial', 12, this.test);
	this.controls[1] = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', message, 'Arial', 20, null);

	
		
}