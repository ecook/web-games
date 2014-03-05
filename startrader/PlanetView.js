var PlanetView = function(name, width, height, backColor, action){

	Object.setPrototypeOf(this, new View(name, width, height, backColor, 2, action))

	this.borderColor = 'white';
	this.planet;
	
	this.rulers.add('x1', true, 10);
	this.rulers.add('y1', false, height - 30);
	this.rulers.add('x2', true, width - 50);
	
	this.btnLaunch = new Button(this, this.rulers.get('x2') -100, this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'Launch');
    this.addControl(this.btnLaunch);
    this.lblDays = new Label(this, this.rulers.get('x2') -50, 20, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'Days: ');
    this.addControl(this.lblDays);

//    this.producer1 = new Shape(this, x, y, width, height, foreColor, backColor, 'producer');
//    this.addControl(this.producer1);
	

	
	this.draw = function(drawTools) {
	
		if(this.isVisible) {
			// call base draw method
			var parent = Object.getPrototypeOf(this);
			parent.draw(drawTools);
			
			// draw border
			drawTools.recOutline(this.x, this.y, this.width, this.height, this.borderColor, 2);

            //planet background
            if(this.planet.type.atmosphere) {
                drawTools.halfCircle(drawTools.canvas.width/2, drawTools.canvas.height + 100, drawTools.canvas.width/2 + 4, 0, Math.PI, this.planet.atmoColor());
            }
            drawTools.halfCircle(drawTools.canvas.width/2, drawTools.canvas.height + 100, drawTools.canvas.width/2, 0, Math.PI, this.planet.color());

            // population
            var x = 20;
            var y = drawTools.canvas.height - 10;
            for(var i = 0; i < this.planet.population; i+=settings.populationPerIcon) {
                drawTools.circle(x, y, 5, 'white', 'white');
                x+=15;
            }

            this.lblDays.value = 'Days: ' + days;
            parent.drawControls(drawTools);

            //draw producer details
            x = 100;
            y = 600;
            var level = 1;
            this.planet.producers.forEach(function(producer) {
                if(producer.level != level) {
                    level++;
                    if(producer.level > 2) {
                        x = 200;
                    } else {
                        x = 100;
                    }
                    y = 600 - (50 * level);
                }
                //this.drawProducer(drawTools, x, y, producer);
                drawTools.drawShape(x, y, producer.image());
                x += 100;
            }, this)

		}
	}

    this.drawProducer = function(drawTools, x, y, producer) {

//        drawTools.customShape('producer', x, y, 1, 'while', 'grey');
        drawTools.recFill(x, y, 70, 50, '#686856');

        if(producer.isOpen) {

            if(producer.workers >= producer.workersNeeded) {
                //next production
                var npHeight = producer.height;
                var npPixelsPerDay = parseInt(producer.width / producer.daysRequired);
                var npWidth = (producer.daysRequired - (producer.nextProduction - days)) * npPixelsPerDay;
                drawTools.recFill(x, y, x + npWidth, y + npHeight, settings.producerNextProductionColor);
//                c.fillStyle = settings.producerNextProductionColor;
//                c.beginPath();
//                c.moveTo(x, y);
//                c.lineTo(x + npWidth, y);
//                c.lineTo(x + npWidth, y + npHeight);
//                c.lineTo(x, y + npHeight);
//                c.lineTo(x, y);
//                c.closePath();
//                c.stroke();
//                c.fill();
            }

            //workers
            var j = x + 5;
            var k = y + producer.size - 3;
            for(var i = 0; i < producer.workers; i+=producer.workersRequired) {
                drawTools.circle(j, k, 3, 'white', 'white');
                j+=8;
            }

            // product
            drawTools.customShape(producer.item.shape, x, y, 2, producer.item.color, producer.item.color);

            // arrow
            if(producer.madeMoney) {
                drawTools.customShape('arrowUp', x + 15, y + 10, 5, 'green', 'green');
            } else {
                drawTools.customShape('arrowDown', x + 15, y + 10, 5, 'red', 'red');
            }

            // required products
            var depend;
            j = x + 45;
            k = y + 15;
            if(producer.item.dependentItems.length != 0) {
                for(var i in producer.item.dependentItems) {
                    depend = Items.get(producer.item.dependentItems[i].name);
                    //drawShape(depend.shape, depend.color, 6, j, k);
                    drawTools.customShape(depend.shape, j, k, 6, depend.color, depend.color);
                    j += 20;
                }
            }

/*            if(producer.selected) {

                //draw selection box
                context.strokeStyle = 'red';
                context.beginPath();
                context.moveTo(x - 2, y - 2);
                context.lineTo(x + size * 2 + 4, y - 2);
                context.lineTo(x + size * 2 + 4, y + size + 2);
                context.lineTo(x - 2, y + size + 2);
                context.lineTo(x - 2, y - 2);
                context.closePath();
                context.stroke();

                //draw stats
                var statsX = settings.producerStatsX;
                var statsY = settings.producerStatsY;
                var statsColor = settings.producerStatsColor;
                var statsSpacing = 20;
                drawText(statsX, statsY+=statsSpacing, statsColor, 'item: ' + producer.item.name);
                drawText(statsX, statsY+=statsSpacing, statsColor, 'last sales: ' + producer.item.result.message);
                drawText(statsX, statsY+=statsSpacing, statsColor, 'tech level: ' + producer.level);
                drawText(statsX, statsY+=statsSpacing, statsColor, 'uoh: ' + producer.item.quantity);
                drawText(statsX, statsY+=statsSpacing, statsColor, 'workers: ' + producer.workers);
                drawText(statsX, statsY+=statsSpacing, statsColor, 'cash: ' + producer.cash);
                drawText(statsX, statsY+=statsSpacing, statsColor, 'wage: ' + producer.wage);
                drawText(statsX, statsY+=statsSpacing, statsColor, 'madeMoney: ' + producer.madeMoney);
                drawText(statsX, statsY+=statsSpacing, statsColor, 'margin: ' + producer.margin);
                drawText(statsX, statsY+=statsSpacing, statsColor, 'trend: ' + producer.trend);

                if(producer.item.dependentItems.length > 0) {
                    statsY = settings.producerStatsY;
                    drawText(statsX + 150, statsY+=statsSpacing, statsColor, 'dependent Items: ' + producer.item.dependentItems.length);
                    statsY += statsSpacing;
                    for(var idx in producer.item.dependentItems) {
                        statsY += idx * statsSpacing;
                        drawText(statsX + 150, statsY, statsColor, 'uoh: ' + producer.item.dependentItems[idx].uoh);
                        drawText(statsX + 190, statsY, statsColor, 'qty: ' + producer.item.dependentItems[idx].qty);
                        drawText(statsX + 250, statsY, statsColor, 'name: ' + producer.item.dependentItems[idx].name);
                        if(producer.item.dependentItems[idx].lastSaleResult != undefined)
                            drawText(statsX + 390, statsY, statsColor, 'last purchase: ' + producer.item.dependentItems[idx].lastSaleResult.message);
                    }
                }
            }*/

        } else {

            // draw closed
            //drawShape('rectangleX', 'red', size, x, y);
            drawTools.line(x, y, x - producer.width, y - producer.height, 'red');
            drawTools.line(x, y + producer.height, x + producer.width, y, 'red');
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
