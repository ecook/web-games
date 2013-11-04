var GalaxyView = function(name, width, height, backColor, action){

	Object.setPrototypeOf(this, new View(name, width, height, backColor, action))

	this.borderColor = 'white';
	
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
			
			// draw the planets
			for(var i in galaxy) {
				galaxy[i].draw(context);
			}	
			
			if(ship.destination != null) {
				if(ship.destination.x > canvas.width - 120 || ship.destination.y > canvas.height - 55) {
					// shift to upper right
					this.lblDestination.move(ship.destination.x - ship.destination.size * 2 - 100, ship.destination.y - (ship.destination.size * 2) - 10);
					this.btnTravel.move(ship.destination.x - ship.destination.size * 2 - 100, ship.destination.y - 15);
					this.lblDestination.move(ship.destination.x - ship.destination.size * 2 - 100, ship.destination.y - ship.destination.size * 2);				
				} else {	
					this.lblDestination.move(ship.destination.x + ship.destination.size * 2, ship.destination.y + (ship.destination.size * 2) - 10);
					this.btnTravel.move(ship.destination.x + ship.destination.size * 2, ship.destination.y + 25);
					this.lblDestination.move(ship.destination.x + ship.destination.size * 2, ship.destination.y + ship.destination.size * 2);	
				}
				this.lblDestination.value = ship.destination.name;
				this.lblDaysToTravel.value =  'days to travel: ' + ship.daysToTravel();
				
				if(!ship.isTraveling)
					this.btnTravel.visible = true;
				else
					this.btnTravel.visible = false;

			} else {
				this.btnTravel.visible = false;		
			}
			
			if(!ship.isTraveling) 
				this.btnLand.visible = true;
			else
				this.btnLand.visible = false;
		
		
			// drawTools.recOutline(this.x + 300, this.y + 200, 300, 200, 'red', 3);
			// drawTools.recFill(this.x + 100, this.y + 50, 100, 50, 'green');	
			// drawTools.circle(this.x + 30, this.y + 100, 25, 'white', 'blue');
			// drawTools.circle(this.x + 425, this.y + 330, 50, 'green');
			// drawTools.circle(this.x + 325, this.y + 375, 25, 'white', 'blue');
			// drawTools.circle(this.x + 325, this.y + 475, 25, null, 'yellow');
			
			// draw the travel info
			//drawTools.customShape('triangle', this.x + 400, this.y + 300, .25, 'red', 'yellow');

		}
	}
	
	this.btnLand.mouseup = function(caller, event) {
		views.showMessage(500, 300, 'Land button clicked');
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
	
}
