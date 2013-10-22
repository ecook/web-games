var SampleView = function(name, x, y, width, height, backColor, action){

	//this.__proto__ = new View(name, x, y, width, height, action);
	Object.setPrototypeOf(this, new View(name, x, y, width, height, backColor, action))

	this.borderColor = 'white';
	
	this.rulers.add('x1', true, 50);
	this.rulers.add('y1', false, 100);
	this.rulers.add('x2', true, 150);
	this.rulers.add('y2', false, 150);
	this.views = new ViewCollection();
	this.views.add( new ViewMessage('testModal', 110, 150, 'This is a test message.'));

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
			
			this.views.draw(context);
		}
	}
	
	this.test = function() {
		this.parent.views.show('testModal');
	}

	//add controls
	// this.controls[0] = new Button(this.x + this.width - 70, this.y + this.height - 30, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'cancel', 10, 'Arial', 12, this.hide);
	// this.controls[1] = new Button(this.x + 10, this.y + this.height - 30, 40, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'ok', 10, 'Arial', 12, this.ok);
	this.controls[0] = new Button(this, this.rulers.get('x2'), this.rulers.get('y2'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'test', 10, 'Arial', 12, this.test);
	this.controls[1] = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label', 'Arial', 20, null);

	
		
}
