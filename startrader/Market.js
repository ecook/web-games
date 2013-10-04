function Market(planet) {

    this.planet = planet;
    this.items = new ItemStore;
    this.money = settings.marketStartMoney;
    this.priceMod = Math.random();
	this.cash = 10000;
	this.margin;

    this.draw = function(c) {
        var x = 300;
        var y = 300;
        var size = 30;
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
	
	
	this.sell = function(name, qty, price) {
		var item = this.items.get(name);
		item.quantity += qty;
		this.cash -= qty * price;	
		return qty * price;
	
	}
}