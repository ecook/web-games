$('document').ready( function() {


    $('#myDrawing').on('mousemove', function(e) {

        mouse.x = e.pageX - this.offsetLeft; // - settings.mouseAdjustOffset;
        mouse.y = e.pageY - this.offsetTop; // - settings.mouseAdjustOffset;

    });
	
	$('#myDrawing').on('mouseup', function(e) {

        //mouse.x = e.pageX - this.offsetTop;
        //mouse.y = e.pageY - this.offsetLeft;

		var action = null;
		
		// check buttons
		for(var btn in buttons) {
			if(buttons[btn].visible && buttons[btn].hit(mouse.x, mouse.y)) {
				action = buttons[btn].action;
				break;
			}
		}
		
		if(action == null) {
		
			if(drawingCanvas.mode == 'planet') {
				//test producers
				for(var f in ship.planet.producers) {
					if(ship.planet.producers[f].hit(mouse.x, mouse.y)) {
						ship.planet.producers[f].selected = true;
					} else {
						ship.planet.producers[f].selected = false;
					}
				}
			}
		
			var p = findPlanet(mouse.x, mouse.y);

			if( p != null && ship.location != p ) {
				if(ship.destination != null) ship.destination.isDestination = false;
				ship.destination = p;
				p.isDestination = true;
			} else {
				//alert('planet not found');
			}
		} else {
			action();
		}
		
    });

});

function travel() {
    ship.travel();
}

function currentLocation() {
    alert(ship.planet.displayText());
}

function land() {
    drawingCanvas.mode = 'planet';
}

function takeOff() {
    drawingCanvas.mode = 'galaxy';
}

function marketBuy() {
	alert('buy stuff');
}

function marketSell() {
	alert('sell stuff');
}

