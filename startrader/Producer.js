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

    this.produce = function() {
		if(days >= this.nextProduction) {
			// attempt production
			
			//hire workers
			var workersNeeded = Items.get(this.item).workers;
			if(this.workers < workersNeeded) {
				this.workers += this.planet.hire(workersNeeded - this.workers, this.level);
			}
			
			//produce and sell product
			var produced = this.workers / workersNeeded;
			this.cash += this.planet.market.sell(this.item, produced, Items.get(this.item).basePrice += (Items.get(this.item).basePrice * this.margin));
			
			// pay workers
			this.cash -= this.wage * this.workers;
		
			this.calcNextProduction();
		}
    }
	
	this.calcNextProduction = function() {
		this.nextProduction = days + Items.get(this.item).days;
	}

    this.draw = function(c, x, y, size) {
	
		// building
        c.strokeStyle = "white";
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x + size, y);
        c.lineTo(x + size, y + size);
        c.lineTo(x, y + size);
        c.lineTo(x, y);
        c.closePath();
        c.stroke();
		
		//workers
		var j = x + 10;
		var k = y + size - 10;
		for(var i = 0; i < this.workers; i+=5) {
			c.strokeStyle = "white";
			c.fillStyle = "white";
			c.beginPath();
			c.arc(j, k, 3,0,Math.PI * 2,true);
			c.closePath();
			c.stroke();
			c.fill();
			j+=8;
		}
    }
}


GenerateProducers = function(planet) {

    var prods = new Array();
	var prevCount = 0;

    for(var i = 0; i < random(settings.producerLevelOneMin, settings.producerLevelOneMax); i++) {
        prods[i] = new Producer(planet, Items.pickName(), 1);
		prevCount++;
    }
	
	for(var i = prevCount; i < random(prevCount, prevCount + prevCount/2); i++) {
		prods[i] = new Producer(planet, Items.pickName(), 2);
    }	

    return prods;
}