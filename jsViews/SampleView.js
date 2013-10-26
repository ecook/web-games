var SampleView = function(name, x, y, width, height, backColor, action){

	//this.__proto__ = new View(name, x, y, width, height, action);
	Object.setPrototypeOf(this, new View(name, x, y, width, height, backColor, action))

	this.borderColor = 'white';
	
	this.rulers.add('x1', true, 50 + this.x);
	this.rulers.add('y1', false, 100 + this.y);
	this.rulers.add('x2', true, 150 + this.x);
	this.rulers.add('y2', false, 150 + this.y);
	
	this.button1 = new Button(this, this.rulers.get('x2'), this.rulers.get('y2'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'test', 10, 'Arial', 12);
	this.label1 = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label', 'Arial', 20);
	
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
		views.showMessage(caller.x + 50, caller.y + 50, 'test message');
	}
	
}
