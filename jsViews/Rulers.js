var Rulers = function(parent) {

	this.parent = parent;
	this.rulers = new Array();
	this.lineColor = 'red';
	
	this.get = function(name) {

		for(var i in this.rulers) {
			if(this.rulers[i].name == name) {
				if(this.rulers[i].isVerticle) {
					return this.rulers[i].value; // + this.parent.x;
				} else {
					return this.rulers[i].value; // + this.parent.y;
				}
				break;
			}	
		}
		return 0;
	}

	this.add = function(name, isVerticle, value) {

		this.rulers[this.rulers.length] = { name: name, isVerticle: isVerticle, value: value };

	}
	
	this.draw = function(context) {

		var x1 = this.parent.x;
		var y1 = this.parent.y;
		var x2 = this.parent.x + this.parent.width;
		var y2 = this.parent.y + this.parent.height;

		for(var i in this.rulers) {
			if(this.rulers[i].isVerticle) {
				//draw verticle line
				context.strokeStyle = this.lineColor;
				context.moveTo(this.rulers[i].value + x1, y1);
				context.lineTo(this.rulers[i].value + x1, y2);
				context.stroke();
			} else {
				//draw horizontal line
				context.strokeStyle = this.lineColor;
				context.moveTo(x1, this.rulers[i].value + y1);
				context.lineTo(x2, this.rulers[i].value + y1);
				context.stroke();
			}	
		}	


	}
}


