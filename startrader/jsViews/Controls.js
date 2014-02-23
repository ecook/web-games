function Control(parent, x, y, width, height, foreColor, backColor, value) {

	this.parent = parent;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.foreColor = foreColor;
	this.backColor = backColor;	
	this.value = value;
	
	this.px = 12;
	this.font = 'Arial';
	
	this.isEnabled = true;
	this.isVisible = true;

    this.mousemove = function (caller, event) {};
    this.mouseup = function (caller, event) {};
    this.mousedown = function (caller, event) {};
    this.keyup = function (caller, event) {};
    this.keydown = function (caller, event) {};
	
	this.move = function(x, y) {
		this.x = x;
		this.y = y;
	
	}
	
	this.isHit = function(x, y) {
		// var x = x + parent.x;
		// var y = y + parent.y;
		if(this.isVisible && this.isEnabled) {
            return x >= this.x + this.parent.x && x <= this.x + this.parent.x + this.width && y >= this.y + this.parent.y && y <= this.y + this.parent.y + this.height;
		} else {
			return false;
		}	
	}

    this.hide = function() {
        this.isVisible = false;
    }

    this.show = function() {
        this.isVisible = true;
    }

}

function Button(parent, x, y, width, height, foreColor, backColor, value) {

	Object.setPrototypeOf(this, new Control(parent, x, y, width, height, foreColor, backColor, value));

	this.isPressed = false;

	
	this.draw = function(drawTools) {
	
		if(this.isVisible) {
			var x1 = this.x + this.parent.x;
			var y1 = this.y + this.parent.y;

			drawTools.recFill(x1, y1, this.width, this. height, this.backColor);
			drawTools.recOutline(x1, y1, this.width, this. height, this.foreColor, 1);
		
			// draw button text
            drawTools.text(x1, y1 + this.height, this.px, this.font, this.foreColor, this.value);
		}
	
	}

}


function Label(parent, x, y, width, height, foreColor, backColor, value) {

	Object.setPrototypeOf(this, new Control(parent, x, y, width, height, foreColor, backColor, value));
	
	this.draw = function(drawTools) {
		var x1 = this.x + this.parent.x;
		var y1 = this.y + this.parent.y;
	
		if(this.isVisible) {
		
			// draw label text
            drawTools.text(x1, y1 + this.height, this.px, this.font, this.foreColor, this.value);
		}
	
	}

}

function Checkbox(parent, x, y, foreColor, backColor) {
	Object.setPrototypeOf(this, new Control(parent, x, y, 15, 15, foreColor, backColor, 'unchecked'));
	
	this.draw = function(drawTools) {
		var x1 = this.x + this.parent.x;
		var y1 = this.y + this.parent.y;
	
		if(this.isVisible) {
		
			// draw box
			drawTools.recOutline(x1, y1, this.width, this.height, this.foreColor, 1);
			
			// draw value
			if(this.value == 'checked') {
				drawTools.customShape('checkboxX', x1, y1, .15, this.backColor, null);
			}
		}
	
	}

    this.mouseup = function(obj, event) {
        if(this.value == 'checked') {
            this.value = 'unchecked';
        } else {
            this.value = 'checked';
        }
    }

}

function TextBox(parent, x, y, width, height, foreColor, backColor, value) {
	Object.setPrototypeOf(this, new Control(parent, x, y, width, height, foreColor, backColor, value));
	
	this.isActive = false;
	this.cursorPos = value.length;
	this.valueWidth = 0;
	
	this.mouseup = function(obj, event) {
		this.isActive = !this.isActive;
	}
	
	this.keyup = function(obj, event) {
		switch(event.keyCode) {
			
			case 46:  { // delete
				if(this.cursorPos > 0 && this.cursorPos < this.value.length) {
					this.value = this.value.substr(0, this.cursorPos) + this.value.substr(this.cursorPos + 1);
					this.cursorPos--;
				}
				break;
			}
			case 37: { // left arrow
				this.cursorPos--;
				if(this.cursorPos < 0) {
					this.cursorPos = 0;
				}	
			
				break;
			}			
			case 39: { // right arrow
				this.cursorPos++;
				if(this.cursorPos > this.value.length) {
					this.cursorPos = this.value.length;
				}					
				break;
			}	
			case 13:  { // enter key
				this.isActive = !this.isActive;
				break;
			}
			default: {
				if(this.valueWidth < this.width) {
					this.value = this.value.substr(0, this.cursorPos) + String.fromCharCode(event.keyCode) + this.value.substr(this.cursorPos);
					this.cursorPos++;
				}
				break;
			}
		}
		
	}
	
	this.draw = function(drawTools) {
		var x1 = this.x + this.parent.x;
		var y1 = this.y + this.parent.y;
	
		if(this.isVisible) {

			drawTools.recOutline(x1, y1, this.width, this.height, this.foreColor, 1);
            drawTools.text(x1, y1 + this.height, this.px, this.font, this.foreColor, this.value);
			
			if(this.isActive) {
			
				// draw high lights
				drawTools.recOutline(x1 - 2, y1 - 2, this.width + 4, this.height + 4, this.backColor, 2);
			
				// draw cursor
				this.valueWidth = drawTools.textWidth(this.value);
				var x2 = drawTools.textWidth(this.value.substr(0, this.cursorPos));
				var cursorWidth = drawTools.textWidth(this.value.substr(this.cursorPos - 1, 1));
				drawTools.recOutline(x1 + x2, y1 +1, cursorWidth, this.height - 2, this.backColor, 1);
			}
		}
	
	}

}

