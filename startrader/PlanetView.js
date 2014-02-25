var PlanetView = function(name, width, height, backColor, action){

	Object.setPrototypeOf(this, new View(name, width, height, backColor, 2, action))

	this.borderColor = 'white';
	this.planet;
	
	this.rulers.add('x1', true, 10);
	this.rulers.add('y1', false, height - 30);
	this.rulers.add('x2', true, width - 50);
	
	this.btnLaunch = new Button(this, this.rulers.get('x2') -100, this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'Launch');
    this.addControl(this.btnLaunch);

//    this.producer1 = new Shape(this, x, y, width, height, foreColor, backColor, 'producer');
//    this.addControl(this.producer1);
	

	
	this.draw = function(drawTools) {
	
		if(this.isVisible) {
			// call base draw method
			var parent = Object.getPrototypeOf(this);
			parent.draw(drawTools);
			
			// draw border
			drawTools.recOutline(this.x, this.y, this.width, this.height, this.borderColor, 2);
			
			// draw the planet
            //planet background
            if(this.planet.type.atmosphere) {
                drawTools.arc(drawTools.canvas.width/2, drawTools.canvas.height, drawTools.canvas.width/2 + 4, 0, Math.PI, this.planet.atmoColor());
            }

            drawTools.arc(drawTools.canvas.width/2, drawTools.canvas.height, drawTools.canvas.width/2, 0, Math.PI, this.planet.color());
			//this.planet.drawDetails(drawTools);

            parent.drawControls(drawTools);

            //draw producer details

		}
	}
	
	this.process = function() {
		if(this.planet != null) {
			this.planet.ai();
		}	
	}
	
	this.btnLaunch.mouseup = function(caller, event) {
		//views.showMessage(500, 300, 'Launch button clicked');
        views.show('viewGalaxy', 0, 0);
        views.hide(caller.name);
	}
	
	this.show = function(x, y) {
		var parent = Object.getPrototypeOf(this);
		parent.show(x, y);

        this.planet = ship.planet;
        setTicksPerDay(settings.ticksPerDayPlanet);
	}
	
}
