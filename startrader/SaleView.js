function SaleView(x, y, width, height, callback) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.borderColor = 'white';
	this.fillStyle = "green";
	this.visible = false;
	this.callback = callback;
	this.cancel = true;
	
	this.controls = new Array();
	this.rows = [10, 60, 110, 160, 210, 260];
	this.cols = [10, 60, 110, 160, 210, 260, 310, 360];
	
	this.item;
	this.qty;
	this.price;

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
		// var size = 40;
		// for(var i in this.rows) {
			// var x = this.rows[i];
			// for(var j in this.cols) {
				// var y = this.cols[j];
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
	
		//draw controls
		for(var i in this.controls) {
			if(this.controls[i].visible) {
				this.controls[i].draw(context);
			}
		}
	}
	
	this.ok = function(o) {
		hide(o);
		o.cancel = false;
		o.callback(o);
	}

	//add controls
	this.controls[0] = new Button(this.x + this.width - 70, this.y + this.height - 30, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'cancel', 'Arial', 12, hide);
	this.controls[1] = new Button(this.x + 10, this.y + this.height - 30, 40, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'ok', 'Arial', 12, this.ok);
	this.controls[2] = new Label(this.x + this.rows[0], this.y + this.cols[0], 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'Item: ', 'Arial', 12, null);
	
	
}