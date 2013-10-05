function ItemStore() {

    this.data = [
    {level: 1, days: 3, workers: 5, basePrice: 100, mass: 10, quantity: 0, cost: 0, name: 'ore', 			 color: 'grey',    shape: 'circle', dependentItems: [] },
    {level: 1, days: 5, workers: 5, basePrice: 600, mass: 10, quantity: 0, cost: 0, name: 'precious metals', color: 'yellow',  shape: 'circle', dependentItems: [] },
    {level: 1, days: 4, workers: 5, basePrice: 250, mass: 10, quantity: 0, cost: 0, name: 'crystals', 		 color: 'blue',    shape: 'circle', dependentItems: [] },
    {level: 1, days: 3, workers: 5, basePrice: 200, mass: 10, quantity: 0, cost: 0, name: 'chemicals',  	 color: 'red',     shape: 'circle', dependentItems: [] },
    {level: 1, days: 3, workers: 5, basePrice: 210, mass: 10, quantity: 0, cost: 0, name: 'animals', 		 color: '#663300', shape: 'circle', dependentItems: [] },
    {level: 1, days: 3, workers: 5, basePrice: 210, mass: 10, quantity: 0, cost: 0, name: 'food', 			 color: 'green',   shape: 'circle', dependentItems: [] },
    {level: 2, days: 3, workers: 5, basePrice: 100, mass: 10, quantity: 0, cost: 0, name: 'electronics',     color: 'blue',    shape: 'doubleCircle', dependentItems: [{name: 'precious metals', qty: 2}, {name: 'crystals', qty: 1}] },
    {name: 'medicine', level: 2, days: 3, color: 'red', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'chemicals', qty: 1}, {name: 'food', qty: 1}] },
    {name: 'textiles', level: 2, days: 3, color: 'green', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'animals', qty: 1}, {name: 'chemicals', qty: 1}] },
    {name: 'processed foods', level: 2, days: 3, color: '#663300', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'food', qty: 2}, {name: 'chemicals', qty: 1}] },
    {name: 'explosives', level: 2, days: 3, color: 'yellow', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'ore', qty: 2}, {name: 'chemicals', qty: 1}] },
    {name: 'jewelry', level: 2, days: 3, color: '#6600FF', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'precious metals', qty: 2}, {name: 'crystals', qty: 1}] },
    {name: 'refined metals', level: 2, days: 3, color: 'grey', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'ore', qty: 1}, {name: 'chemicals', qty: 1}] },
    {name: 'engines', level: 3, days: 3, color: 'grey', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'refined metals', qty: 4}, {name: 'electronics', qty: 1}] },
    {name: 'arms', level: 3, days: 3, color: 'red', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'refined metals', qty: 1}, {name: 'explosives', qty: 1}] },
    {name: 'sensors', level: 3, days: 3, color: 'yellow', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'electronics', qty: 1}, {name: 'precious metals', qty: 1}] },
    {name: 'shields', level: 3, days: 3, color: 'blue', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'electronics', qty: 2}, {name: 'crystals', qty: 5}] },
    {name: 'missiles', level: 3, days: 3, color: 'green', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [{name: 'electronics', qty: 1}, {name: 'explosives', qty: 1}] }
    ];


	this.get = function(name) {
		for(i in this.data){
			if(this.data[i].name == name){
				return this.data[i];
			}
		}
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

