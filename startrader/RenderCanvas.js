var ticks = 0;

function tick() {

    ticks++;
    if(ticks > settings.ticksPerDay) {
        days++;
        ticks = 0;
    }

    //process planet ai
    for(var i = 0; i < galaxy.length; i++) {
        galaxy[i].ai();
    }
    clear(context);
    draw(context, drawingCanvas.mode);
    refreshUi(drawingCanvas.mode);

}

oldMode = '';
function refreshUi(mode) {

    uiPositionX.value = mouse.x;
    uiPositionY.value = mouse.y;
    uiDays.value = days;

    if(mode == 'galaxy'){

        if(ship.destination != null) {
            uiDestinationX.value = ship.destination.x;
            uiDestinationY.value = ship.destination.y;
            uiTravelDays.value = ship.daysToTravel();
        } else {
            uiDestinationX.value = '';
            uiDestinationY.value = '';
            uiTravelDays.value = '';
        }

        uiSpeed.value = ship.speed;
        uiCargoMax.value = ship.capacity;
        uiCargoAmount.value = ship.cargoAmount();
    } else if(mode == 'planet') {


    }

    if(mode != oldMode){
        oldMode = mode;
        if(mode == 'galaxy'){
            $('#galaxyControls').show('fast');
            $('#planetControls').hide('fast');
        } else {
            $('#galaxyControls').hide('fast');
            $('#planetControls').show('fast');
        }
    }
}

function clear(c) {
    c.fillStyle = "black";
    c.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

function draw(c, mode) {
    if(mode == 'galaxy'){
        for(var i = 0; i < galaxy.length; i++) {
            galaxy[i].draw(c);
        }
        ship.draw(c);
    }else if(mode == 'planet'){
        ship.planet.drawDetails(c, drawingCanvas);
    }
}

function drawShape(shape, color, size, x, y) {

	switch(shape){
		case 'circle': {		
			context.strokeStyle = color;
			context.fillStyle = color;
			context.beginPath();
			context.arc(x,y,size,0,Math.PI*2,true);
			context.closePath();
			context.stroke();
			context.fill();
			break;
		}
		case 'doubleCircle': {
			context.strokeStyle = color;
			context.fillStyle = color;
			context.beginPath();
			context.arc(x,y,size,0,Math.PI*2,true);
			context.closePath();
			context.stroke();
			context.fill();
			x+=size;
			context.beginPath();
			context.arc(x,y,size,0,Math.PI*2,true);
			context.closePath();
			context.stroke();
			context.fill();
		
			break;
		}
		case 'triangle': {
			context.strokeStyle = color;
			context.fillStyle = color;
			context.beginPath();
			context.moveTo(x, y - size);
			context.lineTo(x + size, y + size);
			context.lineTo(x - size, y + size);
			context.lineTo(x, y - size);
			context.closePath();
			context.stroke();
			context.fill();
		
			break;
		}
		case 'arrowUp': {
			context.strokeStyle = 'white';
			context.fillStyle = color;
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x + size, y + size);
			context.lineTo(x + size * 0.25, y + size);
			context.lineTo(x + size * 0.25, y + size * 2);
			context.lineTo(x - size * 0.25, y + size * 2);
			context.lineTo(x - size * 0.25, y + size);
			context.lineTo(x - size, y + size);
			context.lineTo(x, y);
			context.closePath();
			context.stroke();
			context.fill();			
			break;
		}
		case 'arrowDown': {
			context.strokeStyle = 'white';
			context.fillStyle = color;
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x + size * 0.3, y);
			context.lineTo(x + size * 0.3, y + size * 2);
			context.lineTo(x + size * 0.6, y + size * 2);
			context.lineTo(x + size * 0.15, y + size * 2 + size);
			context.lineTo(x - size * 0.3, y + size * 2);
			context.lineTo(x, y + size * 2);
			context.lineTo(x, y);
			context.closePath();
			context.stroke();
			context.fill();		
			break;
		}
		case 'square': {
			context.strokeStyle = color;
			context.fillStyle = color;
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x + size, y);
			context.lineTo(x + size, y + size);
			context.lineTo(x, y + size);
			context.lineTo(x, y);
			context.closePath();
			context.stroke();
			context.fill();
			break;
		}
		case 'rectangle': {
			context.strokeStyle = color;
			context.fillStyle = color;
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x + size * 2, y);
			context.lineTo(x + size * 2, y + size);
			context.lineTo(x, y + size);
			context.lineTo(x, y);
			context.closePath();
			context.stroke();
			context.fill();
		
			break;
		}
		case 'rectangleX': {
			context.strokeStyle = color;
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x + size * 2, y + size);
			context.moveTo(x, y + size);
			context.lineTo(x + size * 2, y);
			context.closePath();
			context.stroke();		
			break;
		}
	}
}