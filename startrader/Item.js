function ItemStore() {

    this.data = [
    {level: 1, days: 2, workers: 2, basePrice: 150, mass: 10, quantity: 0, cost: 0, name: 'ore', 			 color: 'grey',    shape: 'circle', dependentItems: [] },
    {level: 1, days: 5, workers: 5, basePrice: 600, mass: 10, quantity: 0, cost: 0, name: 'precious metals', color: 'yellow',  shape: 'circle', dependentItems: [] },
    {level: 1, days: 4, workers: 3, basePrice: 250, mass: 10, quantity: 0, cost: 0, name: 'crystals', 		 color: 'red',     shape: 'circle', dependentItems: [] },
    {level: 1, days: 3, workers: 2, basePrice: 300, mass: 10, quantity: 0, cost: 0, name: 'gases', 		 	 color: 'aqua',   shape: 'circle', dependentItems: [] },
    {level: 1, days: 3, workers: 2, basePrice: 210, mass: 10, quantity: 0, cost: 0, name: 'animals', 		 color: '#663300', shape: 'circle', dependentItems: [] },
    {level: 1, days: 3, workers: 1, basePrice: 150, mass: 10, quantity: 0, cost: 0, name: 'plants',			 color: 'green',   shape: 'circle', dependentItems: [] },
	{level: 1, days: 1, workers: 1, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'water',			 color: 'blue',    shape: 'circle', dependentItems: [] },
	
    {level: 2, days: 3, workers: 2, basePrice: 200, mass: 10, quantity: 0, cost: 0, name: 'chemicals',  	 color: 'red',     shape: 'doubleCircle', dependentItems: [{name: 'gases', qty: 1, uoh: 0}, {name: 'plants', qty: 1, uoh: 0}] },	
    {level: 2, days: 3, workers: 2, basePrice: 100, mass: 10, quantity: 0, cost: 0, name: 'electronics',     color: 'blue',    shape: 'doubleCircle', dependentItems: [{name: 'precious metals', qty: 1, uoh: 0}, {name: 'crystals', qty: 1, uoh: 0}] },
    {level: 2, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'medicine',        color: 'red',     shape: 'doubleCircle', dependentItems: [{name: 'chemicals', qty: 1, uoh: 0}, {name: 'plants', qty: 1, uoh: 0}] },
    {level: 2, days: 3, workers: 3, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'textiles',        color: 'green',   shape: 'doubleCircle', dependentItems: [{name: 'animals', qty: 1, uoh: 0}, {name: 'plants', qty: 1, uoh: 0}] },
    {level: 2, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'foods', 			 color: '#663300', shape: 'doubleCircle', dependentItems: [{name: 'plants', qty: 1, uoh: 0}] },
    {level: 2, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'explosives',      color: 'yellow',  shape: 'doubleCircle', dependentItems: [{name: 'ore', qty: 1, uoh: 0}, {name: 'chemicals', qty: 1, uoh: 0}] },
    {level: 2, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'jewelry',         color: '#6600FF', shape: 'doubleCircle', dependentItems: [{name: 'precious metals', qty: 1, uoh: 0}, {name: 'crystals', qty: 1, uoh: 0}] },
    {level: 2, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'refined metals',  color: 'grey',    shape: 'doubleCircle', dependentItems: [{name: 'ore', qty: 1, uoh: 0}] },
	
    {level: 3, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'engines',         color: 'grey',    shape: 'triangle', dependentItems: [{name: 'refined metals', qty: 1, uoh: 0}, {name: 'electronics', qty: 1, uoh: 0}] },
    {level: 3, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'arms',            color: 'red',     shape: 'triangle', dependentItems: [{name: 'refined metals', qty: 1, uoh: 0}, {name: 'explosives', qty: 1, uoh: 0}] },
    {level: 3, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'sensors',         color: 'yellow',  shape: 'triangle', dependentItems: [{name: 'electronics', qty: 1, uoh: 0}, {name: 'precious metals', qty: 1, uoh: 0}] },
    {level: 3, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'shields',         color: 'blue',    shape: 'triangle', dependentItems: [{name: 'electronics', qty: 1, uoh: 0}, {name: 'crystals', qty: 1, uoh: 0}] },
    {level: 3, days: 3, workers: 2, basePrice: 10,  mass: 10, quantity: 0, cost: 0, name: 'missiles',        color: 'green',   shape: 'triangle', dependentItems: [{name: 'electronics', qty: 1, uoh: 0}, {name: 'explosives', qty: 1, uoh: 0}] }
    ];
	
	this.calcBasePrice = function() {
		var list = this.data;
		for(var i in list) {
			if(list[i].dependentItems.length > 0) {
				for(var j in list[i].dependentItems) {
					var item = this.get(list[i].dependentItems[j].name);
					list[i].basePrice += item.basePrice * list[i].dependentItems[j].qty;
				}
			}
		}
	}

	this.get = function(name) {
		for(i in this.data){
			if(this.data[i].name == name){
				return this.data[i];
			}
		}
	}
	
	this.getIndex = function(name) {
		for(i in this.data){
			if(this.data[i].name == name){
				return i;
			}
		}	
		return -1;
	}
	
	this.getClone = function(name) {
	
		var orig = this.get(name);
		var copy = {
			level: orig.level,
			days: orig.days,
			workers: orig.workers,
			basePrice: orig.basePrice,
			mass: orig.mass,
			quantity: orig.quantity,
			cost: orig.cost,
			name: orig.name,
			color: orig.color,
			shape: orig.shape,
			dependentItems: orig.dependentItems		
		};
		
		return copy;
	
	}

	this.pick = function(level) {
	
		var shortList = new Array();
		var j = 0;
		for(var i in this.data) {
			if(this.data[i].level == level) {
				shortList[j++] = this.data[i].name;
			}
		}
		
		var num = random(0, shortList.length - 1);
		return shortList[num];

	}
	
	this.calcBasePrice();
}

// function Item(planetType) {

    // this.name;
    // this.price;
    // this.mass;
    // this.description;
    // this.madeOf = new Array();
    // this.typeWeighting;
    // this.days;
    // this.level;
    // this.workers;

    // switch(planetType) {
        // case 'water':
        // {
            // this.name ='food';
            // this.price = 10;
            // this.mass = 1;
            // break;
        // }
        // case 'agriculture':
        // {
            // this.name ='food';
            // this.price = 5;
            // this.mass = 1;
            // break;
        // }
        // case 'mineral':
        // {
            // this.name ='iron';
            // this.price = 45;
            // this.mass = 10;
            // break;
        // }
        // case 'industrial':
        // {
            // this.name ='electronics';
            // this.price = 35;
            // this.mass = 5;
            // break;
        // }
    // }


// }

// function ItemCollection() {

    // this.items = new Array();
    // this.qty = new Array();

    // this.add = function(item) {

        // for(var i = 0; i < this.items.length; i++) {
            // if(this.items[i] == null) {
                // this.items[i] = item;
                // break;
            // }
        // }

    // }

    // this.findByName = function(name) {

        // var found = null;
        // for(var i = 0; i < items.length; i++) {
            // if(this.items[i] != null && this.items[i].name == name) {
                // found = this.items[i];
                // break;
            // }
        // }

        // return found;
    // }

    // this.findByIndex = function(index) {

        // var found = this.items[index];

        // return found;

    // }

// }

