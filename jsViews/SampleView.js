var SampleView = function(name, x, y, width, height, backColor, action){

	Object.setPrototypeOf(this, new View(name, x, y, width, height, backColor, action))

	this.borderColor = 'white';
	
	this.rulers.add('x1', true, 50 + this.x);
	this.rulers.add('y1', false, 100 + this.y);
	this.rulers.add('x2', true, 150 + this.x);
	this.rulers.add('y2', false, 150 + this.y);
	
	this.button1 = new Button(this, this.rulers.get('x2'), this.rulers.get('y2'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'test');
	this.label1 = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');
	
	this.addControl(this.button1);
	this.addControl(this.label1);

	this.draw = function(context) {
	
		if(this.isVisible) {
			// call base draw method
			Object.getPrototypeOf(this).draw(context);
			
			// draw border
			drawTools.context = context;			
			drawTools.recOutline(this.x, this.y, this.width, this.height, this.borderColor, 2);
			

			drawTools.recOutline(this.x + 300, this.y + 300, 300, 200, 'red', 3);
			drawTools.recFill(350, 50, 100, 50, 'green');	
			drawTools.circle(325, 375, 25, 'white', 'blue');
			drawTools.circle(425, 375, 50, 'green');
			drawTools.circle(325, 375, 25, 'white', 'blue');
			drawTools.circle(325, 475, 25, null, 'yellow');
			
			drawTools.customShape('triangle', 800, 200, .25, 'red', 'yellow');

		}
	}
	
	this.button1.mouseup = function(caller, event) {
		views.showMessage(caller.x + 50, caller.y + 50, 'test message');
	}
	
}
