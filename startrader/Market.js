function Market(planet) {

    this.planet = planet;
    this.items = new ItemStore();
    this.money = settings.marketStartMoney;
    this.priceMod = Math.random();
	this.cash = settings.marketStartMoney;
	this.margin = settings.marketMargin;
	
	for(var i in this.items.data) {
		this.items.data[i].quantity = settings.marketStartStock[this.items.data[i].level-1];
	}

    this.draw = function(drawTools) {
		
		//draw stats
		var statsX = settings.marketStatsX;
		var statsY = settings.marketStatsY;
		var statsSpacing = 20;
		var pixels = 12;
		var font = 'arial';
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.marketStatsColor, 'Market inventory');
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.marketStatsColor, 'cash on hand: ' + parseInt(this.cash));
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.marketStatsColor, '----------------');
		for(var i in this.items.data) {
			drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.marketStatsColor, this.items.data[i].quantity + ' : ' + this.items.data[i].name);
		}
    };
	
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
		var index = this.items.getIndex(name);
		var price = this.price(name);
		
		if(this.items.data[index].quantity <= 0) {
			result.message = 'out of stock';
			result.success = false;	
		} else {
			if(price > offer) {
				result.message = 'offer too low';
				result.success = false;	
			} else {
				if(qty * price > offer) {
					result.message = 'not enough money for quantity requested';
					result.success = false;	
				} else {
					result.message = 'agreed';
					result.success = true;
					result.qty = qty;
					result.totalPrice = qty * price;
					this.items.data[index].cost = price / qty;
					this.items.data[index].quantity -= result.qty;
					this.cash += result.totalPrice;
				}	
			}
		}
		return result;
	
	}
	
	this.price = function(name) {
		var item = this.items.get(name);
		if(item.cost > 0){
			return parseInt(item.cost + (item.cost * this.margin));
		}else{
			return parseInt(item.basePrice + (item.basePrice * this.margin));
		}
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


