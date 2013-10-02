function ItemStore() {

    var data = [
    {name: 'ore', description: 'rocks', tier: 1, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'precious metals', description: 'rocks', tier: 1, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'crystals', description: 'rocks', tier: 1, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'chemicals', description: 'rocks', tier: 1, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'animals', description: 'rocks', tier: 1, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'food', description: 'rocks', tier: 1, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'electronics', description: 'rocks', tier: 2, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0,
        dependentItems: [{name: 'precious metals', qty: 2}, {name: 'crystals', qty: 1}] },
    {name: 'medicine', description: 'rocks', tier: 2, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'textiles', description: 'rocks', tier: 2, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'processed foods', description: 'rocks', tier: 2, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'explosives', description: 'rocks', tier: 2, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'jewelry', description: 'rocks', tier: 2, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'refined metals', description: 'rocks', tier: 2, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'engines', description: 'rocks', tier: 3, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'arms', description: 'rocks', tier: 3, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'sensors', description: 'rocks', tier: 3, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'shields', description: 'rocks', tier: 3, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] },
    {name: 'missiles', description: 'rocks', tier: 3, days: 3, workers: 5, basePrice: 10, mass: 10, quantity: 0, dependentItems: [] }
    ]
};

ItemStore.prototype.Get = function(name) {
    for(i in this.data){
        if(i.name == name){
            return i;
        }
    }
}

function Item(planetType) {

    this.name;
    this.price;
    this.mass;
    this.description;
    this.madeOf = new Array();
    this.typeWeighting;
    this.days;
    this.tier;
    this.workers;

    switch(planetType) {
        case 'water':
        {
            this.name ='food';
            this.price = 10;
            this.mass = 1;
            break;
        }
        case 'agriculture':
        {
            this.name ='food';
            this.price = 5;
            this.mass = 1;
            break;
        }
        case 'mineral':
        {
            this.name ='iron';
            this.price = 45;
            this.mass = 10;
            break;
        }
        case 'industrial':
        {
            this.name ='electronics';
            this.price = 35;
            this.mass = 5;
            break;
        }
    }


}

function ItemCollection() {

    this.items = new Array();
    this.qty = new Array();

    this.add = function(item) {

        for(var i = 0; i < this.items.length; i++) {
            if(this.items[i] == null) {
                this.items[i] = item;
                break;
            }
        }

    }

    this.findByName = function(name) {

        var found = null;
        for(var i = 0; i < items.length; i++) {
            if(this.items[i] != null && this.items[i].name == name) {
                found = this.items[i];
                break;
            }
        }

        return found;
    }

    this.findByIndex = function(index) {

        var found = this.items[index];

        return found;

    }

}

