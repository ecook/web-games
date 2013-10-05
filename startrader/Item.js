function ItemStore() {

    this.data = [
    {name: 'ore', description: 'rocks', level: 1, days: 3, color: 'grey', shape: 'circle', workers: 5, basePrice: 100, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'precious metals', description: 'rocks', level: 1, days: 5, color: 'yellow', shape: 'circle', workers: 5, basePrice: 600, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'crystals', description: 'rocks', level: 1, days: 4, color: 'blue', shape: 'circle', workers: 5, basePrice: 250, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'chemicals', description: 'rocks', level: 1, days: 3, color: 'red', shape: 'circle', workers: 5, basePrice: 200, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'animals', description: 'rocks', level: 1, days: 3, color: '#663300', shape: 'circle', workers: 5, basePrice: 210, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'food', description: 'rocks', level: 1, days: 3, color: 'green', shape: 'circle', workers: 5, basePrice: 210, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'electronics', description: 'rocks', level: 2, days: 3, color: 'blue', shape: 'doubleCircle', workers: 5, basePrice: 100, mass: 10, quantity: 0,
        dependentItems: [{name: 'precious metals', qty: 2}, {name: 'crystals', qty: 1}] },
    {name: 'medicine', description: 'rocks', level: 2, days: 3, color: 'red', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'textiles', description: 'rocks', level: 2, days: 3, color: 'green', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'processed foods', description: 'rocks', level: 2, days: 3, color: '#663300', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'explosives', description: 'rocks', level: 2, days: 3, color: 'yellow', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'jewelry', description: 'rocks', level: 2, days: 3, color: '#6600FF', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'refined metals', description: 'rocks', level: 2, days: 3, color: 'grey', shape: 'doubleCircle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'engines', description: 'rocks', level: 3, days: 3, color: 'grey', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'arms', description: 'rocks', level: 3, days: 3, color: 'red', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'sensors', description: 'rocks', level: 3, days: 3, color: 'yellow', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'shields', description: 'rocks', level: 3, days: 3, color: 'blue', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'missiles', description: 'rocks', level: 3, days: 3, color: 'green', shape: 'triangle', workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] }
    ];


	this.get = function(name) {
		for(i in this.data){
			if(this.data[i].name == name){
				return this.data[i];
			}
		}
	}

	this.pickName = function(level) {
	
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

