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

function refreshUi(mode) {
	
	if(settings.debug) {
		drawText(10, 50, 'yellow', 'x: ' + mouse.x);
		drawText(10, 60, 'yellow', 'y: ' + mouse.y);
	}
	
	//ship stats
	drawText(10, 15, 'yellow', 'days: ' + days);
	drawText(150, 15, 'yellow', 'cash: ' + ship.cash);
	drawText(250, 15, 'yellow', 'speed: ' + ship.speed);
	drawText(350, 15, 'yellow', 'cargo: ' + ship.cargoAmount() + '/' + ship.capacity);	

    if(mode == 'galaxy'){

        if(ship.destination != null) {
			if(ship.destination.x > drawingCanvas.width - 120 || ship.destination.y > drawingCanvas.height - 55) {
				// shift to upper right
				btnTravel.move(ship.destination.x - ship.destination.size * 2 - 100, ship.destination.y - 15);
				drawText(ship.destination.x - ship.destination.size * 2 - 100, ship.destination.y - ship.destination.size * 2, 'yellow', 'days to travel: ' + ship.daysToTravel());				
			} else {	
				btnTravel.move(ship.destination.x + ship.destination.size * 2, ship.destination.y + 25);
				drawText(ship.destination.x + ship.destination.size * 2, ship.destination.y + ship.destination.size * 2, 'yellow', 'days to travel: ' + ship.daysToTravel());
			}
			btnTravel.visible = true;

        } else {
			btnTravel.visible = false;		

        }
		
		btnLand.visible = true;
		btnTakeOff.visible = false;
		btnMarketBuy.visible = false;
		//btnMarketSell.visible = false;
		
    } else if(mode == 'planet') {
		btnLand.visible = false;
		btnTakeOff.visible = true;
		btnTravel.visible = false;
		btnMarketBuy.visible = true;
		//btnMarketSell.visible = true;
    }
	
	if(modal.isActive) {
	
		//draw modal
	
	}
	
	for(var btn in buttons) {
		buttons[btn].draw(context);
	}
	
	if(viewTrade.visible)
		viewTrade.draw(context);
		
	// draw sale modal
	
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

function drawText(x, y, color, text) {

	context.fillStyle = color;
	//context.font = "bold 16px Arial";
	context.font = "12px Arial";
	context.fillText(text, x, y);

}
