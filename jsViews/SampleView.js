var SampleView = function(name, x, y, width, height, backColor, action){

	Object.setPrototypeOf(this, new View(name, x, y, width, height, backColor, action))

	this.borderColor = 'white';
	
	this.rulers.add('x1', true, 50);
	this.rulers.add('y1', false, 100);
	this.rulers.add('x2', true, 150);
	this.rulers.add('y2', false, 150);
	
	this.button1 = new Button(this, this.rulers.get('x2'), this.rulers.get('y2'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'test');
	this.label1 = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');
	this.labelX = new Label(this, this.rulers.get('x1'), 0, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'X:');
	this.labelY = new Label(this, this.rulers.get('x2'), 0, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'Y:');
	
	this.addControl(this.button1);
	this.addControl(this.label1);
	this.addControl(this.labelX);
	this.addControl(this.labelY);
	
	this.draw = function(context) {
	
		if(this.isVisible) {
			// call base draw method
			var parent = Object.getPrototypeOf(this);
			parent.draw(context);
			
			// draw border
			drawTools.context = context;			
			drawTools.recOutline(this.x, this.y, this.width, this.height, this.borderColor, 2);
			

			drawTools.recOutline(this.x + 300, this.y + 200, 300, 200, 'red', 3);
			drawTools.recFill(this.x + 100, this.y + 50, 100, 50, 'green');	
			drawTools.circle(this.x + 30, this.y + 100, 25, 'white', 'blue');
			drawTools.circle(this.x + 425, this.y + 330, 50, 'green');
			drawTools.circle(this.x + 325, this.y + 375, 25, 'white', 'blue');
			drawTools.circle(this.x + 325, this.y + 475, 25, null, 'yellow');
			
			drawTools.customShape('triangle', this.x + 400, this.y + 300, .25, 'red', 'yellow');

		}
	}
	
	this.button1.mouseup = function(caller, event) {
		views.showMessage(500, 300, 'test message');
	}
	
	this.mousemove = function(caller, event) {
		this.labelX.value = 'X: ' + event.x;
		this.labelY.value = 'Y: ' + event.y;	
	}
	
}
