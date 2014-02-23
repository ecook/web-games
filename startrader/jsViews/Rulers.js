var Rulers = function(parent) {

	this.parent = parent;
	this.rulers = [];
	this.lineColor = 'red';
	
	this.get = function(name) {

		this.rulers.forEach(function (ruler) {
            if (ruler.name == name) {
                if (ruler.isVerticle) {
                    return ruler.value; // + this.parent.x;
                } else {
                    return ruler.value; // + this.parent.y;
                }
            }
            return 0;
        });

	}

	this.add = function(name, isVerticle, value) {

		this.rulers[this.rulers.length] = { name: name, isVerticle: isVerticle, value: value };

	}
	
	this.draw = function(drawTools) {

		var x1 = this.parent.x;
		var y1 = this.parent.y;
		var x2 = this.parent.x + this.parent.width;
		var y2 = this.parent.y + this.parent.height;

		this.rulers.forEach(function (ruler) {
            if (ruler.isVerticle) {
                //draw verticle line
                drawTools.line(ruler.value + x1, y1, ruler.value + x1, y2, this.lineColor);

            } else {
                //draw horizontal line
                drawTools.line(x1, ruler.value + y1, x2, ruler.value + y1, this.lineColor);

            }
        });


	}
}


