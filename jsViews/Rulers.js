var Rulers = function(x, y, width, height) {

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.rulers = new Array();
	this.lineColor = 'red';
}

Rulers.prototype.draw = function(context) {

	for(var i in this.rulers) {
		if(this.rulers[i].isVerticle) {
			//draw verticle line
			context.strokeStyle = this.lineColor;
			context.moveTo(this.rulers[i].value + this.x, this.y);
			context.lineTo(this.rulers[i].value + this.x, this.height + this.y);
			context.stroke();
		} else {
			//draw horizontal line
			context.strokeStyle = this.lineColor;
			context.moveTo(this.x, this.rulers[i].value + this.y);
			context.lineTo(this.width + this.x, this.rulers[i].value + this.y);
			context.stroke();
		}	
	}	

}

Rulers.prototype.get = function(name) {

	for(var i in this.rulers) {
		if(this.rulers[i].name == name) {
			if(this.rulers[i].isVerticle) {
				return this.rulers[i].value + this.x;
			} else {
				return this.rulers[i].value + this.y;
			}
			break;
		}	
	}
	return 0;
}

Rulers.prototype.add = function(name, isVerticle, value) {

	this.rulers[this.rulers.length] = { name: name, isVerticle: isVerticle, value: value };

}