function SaleView(x, y, width, height, callback) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.borderColor = 'white';
	this.fillStyle = "#6B6B47";
	this.visible = false;
	this.callback = callback;
	this.cancel = true;
	
	this.controls = new Array();
	this.rows = [20, 70, 120, 170, 220, 270, 320];
	this.cols = [10, 60, 110, 160, 210, 260, 310, 360];
	
	//update rows with window offset
	for(var i in this.rows) {
		this.rows[i] += this.y;
	}

	//update cols with window offset
	for(var i in this.cols) {
		this.cols[i] += this.x;
	}	
	
	this.mode;  // buy sell
	this.cash = 0;
	this.capacity = 0;
	this.item;
	this.qty;
	this.price;
	this.newQty = 0;
	this.message = '';
	
	this.clearValues = function() {
		this.mode = '';
		this.cash = 0;
		this.capacity = 0;
		this.item = null;
		this.qty = 0;
		this.price = 0;
		this.newQty = 0;
		this.message = '';
	}

	this.show = function() {
		this.cancel = true;
		this.visible = true;
		for(var i in this.controls) {
			this.controls[i].visible = true;
		}
	}
	
	hide = function(o) {
		o.cancel = true;
		o.visible = false;
		for(var i in o.controls) {
			o.controls[i].visible = false;
		}	
	}

	this.event = function(e, type) {
	
		if(type == 'mouseup') {
		
				for(var i in this.controls) {
				if(this.controls[i].hit(mouse.x, mouse.y)) {
					this.controls[i].action(this);
					break;
				}
			}
	
		}
	}


	this.draw = function(c) {
	
		// draw background
		c.strokeStyle = this.borderColor;
		c.fillStyle = this.fillStyle;
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.lineTo(this.x + this.width, this.y);
		c.lineTo(this.x + this.width, this.y + this.height);
		c.lineTo(this.x, this.y + this.height);
		c.lineTo(this.x, this.y);
		c.closePath();
		c.stroke();
		c.fill();
		
		// draw grid
		// var size = 50;
		// for(var i in this.rows) {
			// var y = this.rows[i];
			// for(var j in this.cols) {
				// var x = this.cols[j];
				// context.strokeStyle = 'grey';
				// context.beginPath();
				// context.moveTo(x, y);
				// context.lineTo(x + size, y);
				// context.lineTo(x + size, y + size);
				// context.lineTo(x, y + size);
				// context.lineTo(x, y);
				// context.closePath();
				// context.stroke();
			// }
		// }	
		
		// set dynamic control values
		this.controls[3].text = this.item.name;
		this.controls[4].text = this.mode + ' price:';
		this.controls[5].text = this.price;
		this.controls[7].text = this.newQty;
		this.controls[18].text = this.message;
	
		//draw controls
		for(var i in this.controls) {
			if(this.controls[i].visible) {
				this.controls[i].draw(context);
			}
		}
	}
	
	this.ok = function(o) {
	
		if(o.message.length == 0) {
			hide(o);
			o.cancel = false;
			o.callback(o);
		}
	}
	
	this.all = function(o) {
		o.newQty = o.qty;
	}
	
	this.none = function(o) {
		o.newQty = 0;
	}
	
	this.onePlus = function(o) {
		o.calcQty(1);
	}
	
	this.oneMinus = function(o) {
		o.calcQty(-1);
	}
	
	this.tenPlus = function(o) {
		o.calcQty(10);
	}
	
	this.tenMinus = function(o) {
		o.calcQty(-10);
	}
	
	this.hundredPlus = function(o) {
		o.calcQty(100);
	}
	
	this.hundredMinus = function(o) {
		o.calcQty(-100);
	}
	
	this.thousandPlus = function(o) {
		o.calcQty(1000);
	}
	
	this.thousandMinus = function(o) {
		o.calcQty(-1000);
	}
	
	this.calcQty = function(change) {
		var newVal = this.newQty + change;
		if(newVal < 0) {
			this.newQty = 0;
		} else if(newVal > this.qty) {
			this.newQty = this.qty;
		} else {
			this.newQty += change;
		}
		
		this.message = '';
		
		if(this.mode == 'buy') {
			if(this.newQty > this.capacity) {
				this.message = 'not enough cargo space on ship';
			}
			
			if(this.newQty > this.qty) {
				this.message = 'market does not have enough stock';
			}	
			
			if((this.price * this.newQty) > this.cash) {
				this.message = 'not enough cash for purchase';
			}	
		
		} else if(this.mode == 'sell') {
			
			if((this.price * this.newQty) > this.cash) {
				this.message = 'market does not enough cash for sale';
			}

			if(this.newQty > this.qty) {
				this.message = 'ship does not have enough stock';
			}			
		}
	}

	//add controls
	this.controls[0] = new Button(this.x + this.width - 70, this.y + this.height - 30, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'cancel', 10, 'Arial', 12, hide);
	this.controls[1] = new Button(this.x + 10, this.y + this.height - 30, 40, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'ok', 10, 'Arial', 12, this.ok);
	
	this.controls[2] = new Label(this.cols[0], this.rows[0], 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'Item: ', 'Arial', 20, null);
	this.controls[3] = new Label(this.cols[2], this.rows[0], 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '', 'Arial', 20, null);
	this.controls[4] = new Label(this.cols[0], this.rows[1], 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'Price:', 'Arial', 20, null);
	this.controls[5] = new Label(this.cols[2], this.rows[1], 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '', 'Arial', 20, null);
	this.controls[6] = new Label(this.cols[0], this.rows[2], 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'Qty: ', 'Arial', 20, null);
	this.controls[7] = new Label(this.cols[2], this.rows[2], 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '', 'Arial', 20, null);
	
	this.controls[8] = new Button(this.cols[0], this.rows[4], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', 'all', 10, 'Arial', 14, this.all);
	this.controls[9] = new Button(this.cols[0], this.rows[5], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', 'none', 10, 'Arial', 14, this.none);
	
	this.controls[10] = new Button(this.cols[7], this.rows[4], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', '+1', 10, 'Arial', 14, this.onePlus);
	this.controls[11] = new Button(this.cols[7], this.rows[5], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', '-1', 10, 'Arial', 14, this.oneMinus);
	this.controls[12] = new Button(this.cols[6], this.rows[4], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', '+10', 10, 'Arial', 14, this.tenPlus);
	this.controls[13] = new Button(this.cols[6], this.rows[5], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', '-10', 10, 'Arial', 14, this.tenMinus);
	this.controls[14] = new Button(this.cols[5], this.rows[4], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', '+100', 10, 'Arial', 14, this.hundredPlus);
	this.controls[15] = new Button(this.cols[5], this.rows[5], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', '-100', 10, 'Arial', 14, this.hundredMinus);
	this.controls[16] = new Button(this.cols[4], this.rows[4], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', '+1000', 5, 'Arial', 14, this.thousandPlus);
	this.controls[17] = new Button(this.cols[4], this.rows[5], 50, 25, 'yellow', 'rgba(0, 0, 255, 0.7)', '-1000', 5, 'Arial', 14, this.thousandMinus);
	
	this.controls[18] = new Label(this.cols[1], this.rows[3], 60, 20, '#800000', 'backcolor', 'message', 'Arial', 20, null);
}