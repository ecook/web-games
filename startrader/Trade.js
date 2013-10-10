function Trade() {

	this.visible = false;
	this.x = 60;
	this.y = 60;
	this.width = 660;
	this.height = 660;
	this.fillStyle = "rgba(0, 0, 0, 0.9)";
	this.controls = new Array();
	this.marketItems;
	this.shipItems;
	this.isDraging = false;
	this.dragItem = null;
	
	this.draw = function(c) {
	
		c.strokeStyle = 'white';
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
		
		//draw market inventory
		
		
		//draw controls
		for(var i in this.controls) {
			if(this.controls[i].visible) {
				this.controls[i].draw(context);
			}
		}
		
		//draw ship items
		for(var i in this.shipItems) {
			if(this.shipItems[i].visible) {
				this.shipItems[i].draw(context);
			}
		}	
		
		//draw market items
		for(var i in this.marketItems) {
			if(this.marketItems[i].visible) {
				this.marketItems[i].draw(context);
			}
		}		
		
		//draw drag item
		if(this.isDraging && this.dragItem != null) {
			drawShape(this.dragItem.item.shape, this.dragItem.item.color, 10, mouse.x, mouse.y);
			
		}	
	
	}
	
	this.event = function(e, type) {
	
		var mx = mouse.x - this.x;
		var my = mouse.y - this.y;
		
		if(type == 'mouseup') {
	
			if(this.isDraging) {
			
				var text = 'trading ' + this.dragItem.item.name;
				this.isDraging = false;
				this.dragItem = null;				
				alert(text);

			}
			
			for(var i in this.controls) {
				if(this.controls[i].hit(mouse.x, mouse.y)) {
					var action = this.controls[i].action;
					break;
				}
			}
			
			if(action != null)
				action(this);
		
			
		} else if(type == 'mousedown') {
			
			for(var i in this.marketItems) {
				if(this.marketItems[i].visible && this.marketItems[i].hit(mouse.x, mouse.y)) {
					this.dragItem = this.marketItems[i];
					break;
				}
			}
			if(this.dragItem == null) {
				for(var i in this.shipItems) {
					if(this.shipItems[i].visible && this.shipItems[i].hit(mouse.x, mouse.y)) {
						this.dragItem = this.shipItems[i];
						break;
					}
				}
			}
			
			if(this.dragItem != null)
				this.isDraging = true;


		}
		
	
	}
	
	this.show = function() {
	
		this.visible = true;
		for(var i in this.controls) {
			this.controls[i].visible = true;
		}
		
		//load market items
		this.marketItems = new Array();
		var x = this.x + 400;
		var y = this.y + 50;
		for(var i in ship.planet.market.items.data) {
			y+=30;
			this.marketItems[i] = new InvItem(x, y, 150, 30, 'white', 'black', ship.planet.market.items.data[i], 'Arial', 14, null);
			this.marketItems[i].visible = true;
		}
		
		//load ship items
		this.shipItems = new Array();
		x = this.x + 40;
		y = this.y + 50;
		for(var i in ship.items.data) {
			y+=30;
			this.shipItems[i] = new InvItem(x, y, 150, 30, 'white', 'black', ship.items.data[i], 'Arial', 14, null);
			this.shipItems[i].visible = true;
		}	
	}
	
	this.hide = function() {
	
		this.visible = false;
		for(var i in this.controls) {
			this.controls[i].visible = false;
		}
	
	}
	
	this.cancel = function(t) {
	
		t.hide();
	
	}
	
	// add controls
	this.controls[0] = new Button(this.x + this.width - 70, this.y + this.height - 30, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'cancel', 'Arial', 12, this.cancel);
	this.controls[1] = new Label(this.x + 40, this.y + 50, 100, 20, 'yellow', 'black', 'Ship Inventory', 'Arial', 18, null);
	this.controls[2] = new Label(this.x + 400, this.y + 50, 100, 20, 'yellow', 'black', 'Market Inventory', 'Arial', 18, null);
	

}