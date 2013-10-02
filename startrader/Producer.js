function Producer(planet, item) {

    this.planet = planet;
    this.item = item;
    this.efficiency;
    this.workers;
    this.stores = new Array();

    this.produce = function() {

    }

    this.draw = function(c, x, y, size) {
        c.strokeStyle = "white";
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x + size, y);
        c.lineTo(x + size, y + size);
        c.lineTo(x, y + size);
        c.lineTo(x, y);
        c.closePath();
        c.stroke();
    }
}


GenerateProducers = function(planet) {

    var prods = new Array();

    for(var i = 0; i < random(1, 5); i++) {
        prods[i] = new Producer(this, new Item(planet.type));
    }

    return prods;
}