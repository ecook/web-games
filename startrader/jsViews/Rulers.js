var Rulers = function(parent) {

	this.parent = parent;
	this.rulers = [];
	this.lineColor = 'red';
	
	this.get = function(name) {
        var value = 0;
        this.rulers.forEach(function (ruler) {
            if (ruler.name == name) {
                value = ruler.value; // + this.parent.x;
            }
        });
        return value;
	}

	this.add = function(name, isVerticle, value) {

		this.rulers[this.rulers.length] = new Ruler(name, isVerticle, value);

	}
	
	this.draw = function(drawTools) {

		var x1 = this.parent.x;
		var y1 = this.parent.y;
		var x2 = this.parent.x + this.parent.width;
		var y2 = this.parent.y + this.parent.height;
        var lineColor = this.lineColor;

		this.rulers.forEach(function (ruler) {
            if (ruler.isVertical) {
                //draw vertical line
                drawTools.line(ruler.value + x1, y1, ruler.value + x1, y2, lineColor);

            } else {
                //draw horizontal line
                drawTools.line(x1, ruler.value + y1, x2, ruler.value + y1, lineColor);

            }
        });


	}
}


var Ruler = function(name, isVertical, value) {
    this.name = name;
    this.isVertical = isVertical;
    this.value = value;
}