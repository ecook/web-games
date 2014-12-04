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
                producer.x = x;
                producer.y = y;
                drawTools.drawShape(x, y, producer.image());
                this.drawProducer(drawTools, x, y, producer);
                x += 100;
            }, this)

		}
	};

    this.drawProducer = function(drawTools, x, y, producer) {

//        drawTools.customShape('producer', x, y, 1, 'while', 'grey');
        drawTools.recFill(x, y, producer.width, producer.height, '#686856');

        if(producer.isOpen) {

            if(producer.workers >= producer.workersNeeded) {
                //next production
                var npHeight = producer.height;
                var npPixelsPerDay = parseInt(producer.width / producer.daysRequired);
                var npWidth = (producer.daysRequired - (producer.nextProduction - days)) * npPixelsPerDay;
                drawTools.recFill(x, y, npWidth, npHeight, settings.producerNextProductionColor, settings.producerNextProductionColor);
            }

            //workers
            var j = x + 5;
            var k = y + producer.height - 4;
            for(var i = 0; i < producer.workers; i++) {
                drawTools.circle(j, k, 3, 'black', 'black');
                j+=8;
            }

            // product
            drawTools.customShape(producer.item.shape, x, y, 2, producer.item.color, producer.item.color);

            // arrow
            if(producer.madeMoney) {
                drawTools.customShape('arrowUp', x + 25, y + 10, 3, 'green', 'green');
            } else {
                drawTools.customShape('arrowDown', x + 25, y + 10, 3, 'red', 'red');
            }

            // required products
            var depend;
            j = x + 45;
            k = y + 15;
            if(producer.item.dependentItems.length != 0) {
                for(var i in producer.item.dependentItems) {
                    depend = Items.get(producer.item.dependentItems[i].name);
                    //drawShape(depend.shape, depend.color, 6, j, k);
                    drawTools.customShape(depend.shape, j, k, 2, depend.color, depend.color);
                    j += 20;
                }
            }

            if(producer.selected) {

                //draw selection box
                drawTools.recOutline(x, y, producer.width, producer.height, 'red', 3);

                //draw stats
                var statsX = settings.producerStatsX;
                var statsY = settings.producerStatsY;
                var statsColor = settings.producerStatsColor;
                var statsSpacing = 20;
                var pixels = 14;
                var font = 'areal';
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'item: ' + producer.item.name);
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'last sales: ' + producer.item.result.message);
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'tech level: ' + producer.level);
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'uoh: ' + producer.item.quantity);
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'workers: ' + producer.workers);
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'cash: ' + producer.cash);
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'wage: ' + producer.wage);
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'madeMoney: ' + producer.madeMoney);
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'margin: ' + producer.margin);
                drawTools.text(statsX, statsY+=statsSpacing, pixels, font, statsColor, 'trend: ' + producer.trend);

                if(producer.item.dependentItems.length > 0) {
                    statsY = settings.producerStatsY;
                    drawTools.text(statsX + 150, statsY+=statsSpacing, pixels, font, statsColor, 'dependent Items: ' + producer.item.dependentItems.length);
                    statsY += statsSpacing;
                    for(var idx in producer.item.dependentItems) {
                        statsY += idx * statsSpacing;
                        drawTools.text(statsX + 150, statsY, pixels, font, statsColor, 'uoh: ' + producer.item.dependentItems[idx].uoh);
                        drawTools.text(statsX + 190, statsY, pixels, font, statsColor, 'qty: ' + producer.item.dependentItems[idx].qty);
                        drawTools.text(statsX + 250, statsY, pixels, font, statsColor, 'name: ' + producer.item.dependentItems[idx].name);
                        if(producer.item.dependentItems[idx].lastSaleResult != undefined)
                            drawTools.text(statsX + 390, statsY, pixels, font, statsColor, 'last purchase: ' + producer.item.dependentItems[idx].lastSaleResult.message);
                    }
                }
            }

        } else {

            // draw closed
            //drawShape('rectangleX', 'red', size, x, y);
            drawTools.line(x, y, x + producer.width, y + producer.height, 'red');
            drawTools.line(x, y + producer.height, x + producer.width, y, 'red');
        }
    };
	
	this.process = function() {
		if(this.planet != null) {
			this.planet.ai();
		}	
	};
	
	this.btnLaunch.mouseup = function(caller, event) {
		//views.showMessage(500, 300, 'Launch button clicked');
        views.show('viewGalaxy', 0, 0);
        views.hide(caller.name);
	};

    this.mouseup = function (caller, event) {
        this.planet.producers.forEach(function(p){
            if(p.hit(event.x, event.y)){
                p.selected = true;
            } else {
                p.selected = false;
            }
        });

    };
	
	this.show = function(x, y) {
		var parent = Object.getPrototypeOf(this);
		parent.show(x, y);

        this.planet = ship.planet;
        setTicksPerDay(settings.ticksPerDayPlanet);
	}
	
};
