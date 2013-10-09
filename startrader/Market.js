function Market(planet) {

    this.planet = planet;
    this.items = new ItemStore;
    this.money = settings.marketStartMoney;
    this.priceMod = Math.random();
	this.cash = 10000;
	this.margin = settings.marketMargin;

    this.draw = function(c) {
		
		//draw stats
		var statsX = settings.marketStatsX;
		var statsY = settings.marketStatsY;
		var statsSpacing = 20;
		drawText(statsX, statsY+=statsSpacing, settings.marketStatsColor, 'Market inventory');
		drawText(statsX, statsY+=statsSpacing, settings.marketStatsColor, 'cash on hand: ' + parseInt(this.cash));
		drawText(statsX, statsY+=statsSpacing, settings.marketStatsColor, '----------------');
		for(var i in this.items.data) {
			drawText(statsX, statsY+=statsSpacing, settings.marketStatsColor, this.items.data[i].quantity + ' : ' + this.items.data[i].name);
		}
    }
	
	this.sell = function(name, qty, price) {
		var result = new saleResult;
		result.qty = qty;
		result.totalPrice = qty * price;	
		
		if(this.cash > qty * price) {
			var item = this.items.get(name);
			item.quantity += qty;
			this.cash -= qty * price;	
			result.message = 'agreed';
			result.success = true;
		} else {
			result.message = 'market short on funds';
			result.success = false;	
		}
		return result;
	}
	
	this.buy = function(name, qty, offer) {
	
		var result = new saleResult;
		var item = this.items.get(name);
		
		if(item.quantity <= 0) {
			result.message = 'out of stock';
			result.success = false;	
		} else {
			var each = item.basePrice + (item.basePrice * this.margin);
			if(each > offer) {
				result.message = 'offer too low';
				result.success = false;	
			} else {
				if(qty * each > offer) {
					result.message = 'not enough money for quantity requested';
					result.success = false;	
				} else {
					result.message = 'agreed';
					result.success = true;
					result.qtyPurchaced = qty;
					result.totalPrice = qty * each;
					item.quantity -= result.qtyPurchaced;
					this.cash += result.totalPrice;
				}	
			}
		}
		return result;
	
	}
	
	this.price = function(name) {
		var item = this.items.get(name);
		return item.basePrice + (item.basePrice * this.margin);
	}
	
	this.displayInventory = function() {
		var list = 'Market inventory\n';
		list += 'cash on hand: ' + this.cash + '\n';
		for(var i in this.items.data) {
			list += this.items.data[i].name + ': ' + this.items.data[i].quantity + '\n';
		}
		
		return list;
	}
}

function saleResult() {

	this.message = 'no sale'; 
	this.success = false;
	this.qty = 0;
	this.totalPrice = 0;
	
};


