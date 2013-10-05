function Producer(planet, item, level) {

    this.planet = planet;
    this.item = item;
    this.efficiency = 0;
    this.workers = 0;
    this.stores = new ItemStore();
	this.level = level;
	this.cash = settings.producerStartCash;
	this.wage = settings.producerStartWage;
	this.margin = settings.producerStartMargin;
	this.nextProduction = 0;
	this.trend = 0;
	this.madeMoney = true;
	this.isOpen = true;
	for(var i in this.item.dependentItems) {
		this.stores[this.stores.length] = Items.getClone(this.item.dependentItems[i].name);
	}

    this.produce = function() {
		if(this.isOpen) {
			if(days >= this.nextProduction) {
			
				// attempt production
				var startingCash = this.cash;
				
				//hire workers
				var workersNeeded = this.item.workers;
				if(this.workers < workersNeeded) {
					this.workers += this.planet.hire(workersNeeded - this.workers, this.level);
				} else if(this.trend > settings.producerHireThreshold) {
					this.trend = 0;
					this.workers += this.planet.hire(workersNeeded, this.level);
				}
				
				//check for dependant items
				var totalPossible = 99;
				var count = 0;
				for(var s in this.item.dependentItems) {
					count = this.item.dependentItems[s].uoh / this.item.dependentItems[s].qty;
					if(count < totalPossible) totalPossible = count;
				}
							
				//produce and sell product
				var produced = this.workers / workersNeeded;
				if(produced < totalPossible) {
					this.cash += this.planet.market.sell(this.item.name, produced, this.item.basePrice += (this.item.basePrice * this.margin));
				}
				
				// pay workers
				this.cash -= this.wage * this.workers;
				
				// pay for facilities
				this.cash -= settings.dailyFacilityCost;
			
				//calc the trend
				if(startingCash < this.cash) {
					this.madeMoney = true;
					if(this.trend > 0) {
						this.trend += 1;
					} else {
						this.trend = 1;
					}	
				} else {
					this.madeMoney = false;
					if(this.trend < 0) {
						this.trend -= 1;
					} else {
						this.trend = -1;
					}	
				}
				
				// check for need to layoff workers
				if(this.workers > workersNeeded) {
					if(this.trend < settings.producerLayoffThreshold) {
						this.workers -= workersNeeded;
						this.planet.layoff(workersNeeded, this.level);
					}
				}				
				
				// check for closer
				if(this.cash < 0) {
					//layoff the last of the workers and close the plant
					this.planet.layoff(workersNeeded, this.level);
					this.isOpen = false;
				}
			
				this.calcNextProduction();
			}
		} else if(this.cash > 0) {
			this.isOpen = true;
		}
    }
	
	this.calcNextProduction = function() {
		this.nextProduction = days + this.item.days;
	}

    this.draw = function(c, x, y, size) {
	
		// building
		drawShape('rectangle', '#686856', size, x, y);
		
		if(this.isOpen) {
		
			//workers
			var j = x + 5;
			var k = y + size - 3;
			for(var i = 0; i < this.workers; i+=settings.workerRep) {
				drawShape('circle', 'white', 3, j, k);
				j+=8;
			}
			
			// product
			drawShape(this.item.shape, this.item.color, 10, x + 15, y + 15);
			
			// arrow
			if(this.madeMoney) {
				drawShape('arrowUp', 'green', 5, x + 15, y + 10);
			} else {
				drawShape('arrowDown', 'red', 5, x + 15, y + 10);
			}
			
			// required products
			var depend;
			j = x + 45;
			k = y + 15;
			if(this.item.dependentItems.length != 0) {
				for(var i in this.item.dependentItems) {
					depend = Items.get(this.item.dependentItems[i].name);
					drawShape(depend.shape, depend.color, 6, j, k);
					j += 20;
				}
			}
		
		} else {
			
			// draw closed
			drawShape('rectangleX', 'red', size, x, y);		
		}
    }
}


GenerateProducers = function(planet) {

    var prods = new Array();
	var prevCount = 0;
	var level2Count = 0;

    for(var i = 0; i < random(settings.producerLevelOneMin, settings.producerLevelOneMax); i++) {
        prods[i] = new Producer(planet, Items.getClone(Items.pick(1)), 1);
		prevCount++;
    }
	
	for(var i = prevCount; i < random(prevCount, prevCount + prevCount/2); i++) {
		prods[i] = new Producer(planet, Items.getClone(Items.pick(2)), 2);
		level2Count++;
    }	
	
	if(level2Count > 0 && random(1, 10) > 8) {
		prods[prods.length] = new Producer(planet, Items.getClone(Items.pick(3)), 3);
	}

    return prods;
}