var PlanetView = function(name, width, height, backColor, action){

	Object.setPrototypeOf(this, new View(name, width, height, backColor, action))

	this.borderColor = 'white';
	this.planet;
	
	this.rulers.add('x1', true, 10);
	this.rulers.add('y1', false, height - 30);
	this.rulers.add('x2', true, width - 50);
	
	this.btnLand = new Button(this, this.rulers.get('x2'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'test');
	this.lblVersion = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', settings.version);
	this.lblX = new Label(this, this.rulers.get('x1'), 10, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');
	this.lblY = new Label(this, this.rulers.get('x1'), 40, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');
	this.btnTravel = new Button(this, 0, 0, 40, 20, 'yellow', 'blue', 'Go');
	this.lblDestination= new Label(this, 0, 10, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');
	this.lblDaysToTravel = new Label(this, 0, 40, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');
	
	this.addControl(this.btnLand);
	this.addControl(this.lblVersion);
	this.addControl(this.lblX);
	this.addControl(this.lblY);
	this.addControl(this.btnTravel);
	this.addControl(this.lblDestination);
	this.addControl(this.lblDaysToTravel);
	
	this.draw = function(context) {
	
		if(this.isVisible) {
			// call base draw method
			var parent = Object.getPrototypeOf(this);
			parent.draw(context);
			
			// draw border
			drawTools.context = context;			
			drawTools.recOutline(this.x, this.y, this.width, this.height, this.borderColor, 2);
			
			// draw the planet
			this.planet.drawDetails(context, canvas);

		}
	}
	
	this.process = function() {
		if(this.planet != null) {
			this.planet.ai();
		}	
	}
	
	this.btnLand.mouseup = function(caller, event) {
		views.showMessage(500, 300, 'Land button clicked');
	}
	
	this.btnTravel.mouseup = function(caller, event) {
		ship.travel();
	}
	
	this.mouseup = function(caller, event) {
		var p = findPlanet(event.x, event.y);

		if( p != null && ship.location != p ) {
			if(ship.destination != null) ship.destination.isDestination = false;
			ship.destination = p;
			p.isDestination = true;
		}	
	}
	
	this.mousemove = function(caller, event) {
		var parent = Object.getPrototypeOf(caller);
		parent.mousemove(caller, event);
		
		this.lblX.value = 'X: ' + event.x;
		this.lblY.value = 'Y: ' + event.y;	
	}
	
	this.show = function(x, y) {
		this.planet = ship.planet;
		
		var parent = Object.getPrototypeOf(this);
		parent.show(x, y);
		parent.x = x;
		parent.y = y;
		parent.isVisible = true;
		parent.isActive = true;
	}
	
}
