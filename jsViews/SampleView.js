var SampleView = function(name, x, y, width, height, action){

	//this.__proto__ = new View(name, x, y, width, height, action);
	Object.setPrototypeOf(this, new View(name, x, y, width, height, action))

	this.borderColor = 'white';
	this.fillStyle = "#6B6B47";
	this.callback;
	this.isCancel = true;
	
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
	
	this.ok = function(o) {
	
		hide(o);
		o.isCancel = false;
		o.callback(o);
	}
	
	this.all = function(o) {
		o.newQty = o.qty;
		o.validateSale();
	}
	
	this.none = function(o) {
		o.newQty = 0;
		o.validateSale();
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
		
		this.validateSale();
	}
	
	this.validateSale = function() {

	
	}

	//add controls
	this.controls[0] = new Button(this.x + this.width - 70, this.y + this.height - 30, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'cancel', 10, 'Arial', 12, this.hide);
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
