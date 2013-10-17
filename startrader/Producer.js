function Producer(planet, item, level) {

    this.planet = planet;
    this.item = item;
    this.efficiency = 0;
	this.workersNeeded = 0;
	this.daysRequired = 0;
    this.workers = 0;
    //this.stores = new ItemStore();
	this.level = level;
	this.cash = settings.producerStartCash;
	this.wage = settings.producerStartWage;
	this.margin = settings.producerStartMargin;
	this.nextProduction = 0;
	this.trend = 0;
	this.madeMoney = true;
	this.isOpen = true;
	this.selected = false;
	// for(var i in this.item.dependentItems) {
		// this.stores[this.stores.length] = Items.getClone(this.item.dependentItems[i].name);
	// }
	
	this.item.result = new saleResult();

    this.produce = function() {
		if(this.isOpen) {
			if(days >= this.nextProduction) {
			
				// attempt production
				var startingCash = this.cash;
				
				//hire workers
				if(this.workers < this.workersNeeded) {
					this.workers += this.planet.hire(this.workersNeeded, this.level);
				} else if(this.trend > settings.producerHireThreshold) {
					this.trend = 0;
					this.workers += this.planet.hire(this.workersNeeded, this.level);
				}
				
				// update inventory
				var totalPossible = this.workers / this.workersNeeded;
				if(this.cash > settings.purchaseInventoryCashTheshold) {
					for(var s in this.item.dependentItems) {
						if(this.item.dependentItems[s].uoh < this.item.dependentItems[s].qty * totalPossible) {
							//try to purchase more
							var qty = (this.item.dependentItems[s].qty * totalPossible) - this.item.dependentItems[s].uoh;
							var result = this.planet.market.buy(this.item.dependentItems[s].name, qty, this.planet.market.price(this.item.dependentItems[s].name));
							if(result.success) {
								this.cash -= result.totalPrice;
								this.item.dependentItems[s].uoh += result.qty;
							}
							this.item.dependentItems[s].lastSaleResult = result;
							if(this.cash < settings.purchaseInventoryCashTheshold)
								break;
						}	
					}								
				}
				
				//check for total items possible
				var count = 0;
				for(var s in this.item.dependentItems) {
					count = this.item.dependentItems[s].uoh / this.item.dependentItems[s].qty;
					if(count < totalPossible) totalPossible = count;
				}
							
				//produce and sell product
				var produced = this.workers / this.workersNeeded;
				if(produced <= totalPossible) {
					this.item.result = this.planet.market.sell(this.item.name, produced, this.item.basePrice + (this.item.basePrice * this.margin));
					if(this.item.result != undefined && this.item.result.success) {
						this.cash += parseInt(this.item.result.totalPrice);
					}
				}
				
				// pay workers
				this.cash -= this.wage * this.workers;
				this.planet.cash += this.wage * this.workers;
				
				// pay for facilities
				this.cash -= settings.dailyFacilityCost;
				this.planet.cash += settings.dailyFacilityCost;
			
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
				if(this.workers > this.workersNeeded) {
					if(this.trend < settings.producerLayoffThreshold) {
						this.workers -= this.workersNeeded;
						this.planet.layoff(this.workersNeeded, this.level);
					}
				}				
				
				// check for closer
				if(this.cash < 0) {
					//layoff the last of the workers and close the plant
					this.planet.layoff(this.workersNeeded, this.level);
					this.isOpen = false;
				}
			
				this.calcNextProduction();
			}
		} else if(this.cash > 0) {
			this.isOpen = true;
		}
    }
	
	this.calcNextProduction = function() {
		this.nextProduction = days + parseInt(this.daysRequired);
	}

    this.draw = function(c, x, y, size) {
	
		// cache hit box
		this.x = x;
		this.y = y;
		this.width = size * 2;
		this.height = size;
	
		// building
		drawShape('rectangle', '#686856', size, x, y);
		
		if(this.isOpen) {
		
			//workers
			var j = x + 5;
			var k = y + size - 3;
			for(var i = 0; i < this.workers; i+=settings.workersPerIcon) {
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
			
			if(this.selected) {
			
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
				drawText(statsX, statsY+=statsSpacing, statsColor, 'item: ' + this.item.name);
				drawText(statsX, statsY+=statsSpacing, statsColor, 'last sales: ' + this.item.result.message);
				drawText(statsX, statsY+=statsSpacing, statsColor, 'tech level: ' + this.level);
				drawText(statsX, statsY+=statsSpacing, statsColor, 'efficiency: ' + this.efficiency);
				drawText(statsX, statsY+=statsSpacing, statsColor, 'workers: ' + this.workers);
				drawText(statsX, statsY+=statsSpacing, statsColor, 'cash: ' + this.cash);
				drawText(statsX, statsY+=statsSpacing, statsColor, 'wage: ' + this.wage);
				drawText(statsX, statsY+=statsSpacing, statsColor, 'madeMoney: ' + this.madeMoney);
				drawText(statsX, statsY+=statsSpacing, statsColor, 'margin: ' + this.margin);
				drawText(statsX, statsY+=statsSpacing, statsColor, 'trend: ' + this.trend);
				
				if(this.item.dependentItems.length > 0) {
					statsY = settings.producerStatsY;
					drawText(statsX + 150, statsY+=statsSpacing, statsColor, 'dependent Items: ' + this.item.dependentItems.length);
					statsY += statsSpacing;
					for(var idx in this.item.dependentItems) {
						statsY += idx * statsSpacing;
						drawText(statsX + 150, statsY, statsColor, 'uoh: ' + this.item.dependentItems[idx].uoh);
						drawText(statsX + 190, statsY, statsColor, 'qty: ' + this.item.dependentItems[idx].qty);
						drawText(statsX + 250, statsY, statsColor, 'name: ' + this.item.dependentItems[idx].name);
						if(this.item.dependentItems[idx].lastSaleResult != undefined)
							drawText(statsX + 390, statsY, statsColor, 'last purchase: ' + this.item.dependentItems[idx].lastSaleResult.message);
					}
				}
			}
		
		} else {
			
			// draw closed
			drawShape('rectangleX', 'red', size, x, y);		
		}
    }
	
	this.hit = function(x, y) {
		if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) 
			return true;
		else
			return false;
	
	}
	
	this.setEfficiency = function() {
	
		var days = this.item.days - ((this.planet.madeOf(this.item.name) / 100) * this.item.days);
		var workers = this.item.workers - ((this.planet.madeOf(this.item.name) / 100) * this.item.workers);
		
		if(this.planet.type.temperature != 'temperate') {
			days += (settings.producerModExtremeTemperature * this.item.days);
			workers += (settings.producerModExtremeTemperature * this.item.workers);
		}
		
		if(this.planet.type.weather == 'severe') {
			days += (settings.producerModSevereWeather * this.item.days);
			workers += (settings.producerModSevereWeather * this.item.days);
		}
		
		this.daysRequired = parseInt(days);
		this.workersNeeded = parseInt(workers);
	}
	
	this.setEfficiency();
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