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
	
	this.buy = function(name, qty, offer) {
	
		var result = new saleResult;
		var item = this.items.get(name);
		
		if(item.quantity <= 0) {
			result.message = 'out of stock';
		} else {
			var each = item.basePrice + (item.basePrice * this.margin);
			if(each > offer) {
				result.message = 'not enough money';
			} else {
				if(qty * each > offer) {
					result.message = 'not enough money for quantity requested';
				} else {
					result.message = 'agreed';
					result.qtyPurchaced = qty;
					result.totalPrice = qty * each;
					item.quantity -= result.qtyPurchaced;
					this.cash += result.totalPrice;
				}	
			}
		}
		return result;
	
	}
}

function saleResult() {

	this.message = 'no sale'; 
	this.qtyPurchaced = 0;
	this.totalPrice = 0;
	
};


