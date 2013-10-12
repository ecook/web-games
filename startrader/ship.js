function Ship(planet) {

    this.size = 3;
    this.x = planet.x;
    this.y = planet.y;
    this.planet = planet;
    this.destination;
    this.offset = planet.size / 2;
    this.capacity = settings.shipStartCapacity;
    this.items = new ItemStore();
    this.speed = settings.shipStartSpeed;
    this.isTraveling = false;
	this.cash = settings.shipStartCash;

    this.draw = function(c)
    {
        // draw the ship
        c.strokeStyle = "red";
        c.fillStyle = "white";
        c.beginPath();
        c.arc(this.x - this.offset, this.y - this.offset,this.size,0,Math.PI*2,true);
        c.closePath();
        c.stroke();
        c.fill();

		// draw the destination line
        if(this.destination != null && this.isTraveling == false) {
            c.strokeStyle = "white";
            c.beginPath();
            c.moveTo(this.x, this.y);
            c.lineTo(this.destination.x, this.destination.y);
            c.closePath();
            c.stroke();
        }


    }
	
	this.move = function() {
        if(this.isTraveling){
            if(this.daysToTravel() < 1){
                //ship has arrived
                this.isTraveling = false;
                this.planet = this.destination;
				this.destination.isDestination = false;
                this.destination = null;
                this.x = this.planet.x - this.offset;
                this.y = this.planet.y - this.offset;
            } else {
				var totalDistance = distance(this.x, this.y, this.destination.x, this.destination.y);
				var travel = parseInt(totalDistance / (this.daysToTravel()));
				
				// var newX = parseInt((totalDistance / this.x) * travel);
				// var newY = parseInt((totalDistance / this.y) * travel);			
			
                // still traveling
                // calculate next x and y toward destination
				if(this.destination.x > this.x)
					this.x += travel;
				else
					this.x -= travel;
					
				if(this.destination.y > this.y)
					this.y += travel;
				else	
					this.y -= travel;
            }
        }	
	}

    this.travel = function(){
        if(this.destination != null){
            this.isTraveling = true;
            this.planet = null;
        }
    }

    this.cargoAmount = function() {

        var total = 0;
        for(var i in this.items.data) {
            total += this.items.data[i].quantity;
        }

        return total;
    }

    this.daysToTravel = function() {

        if(this.destination != null) {
            var d = distance(this.x, this.y, this.destination.x + this.destination.size / 2, this.destination.y + this.destination.size / 2);
            var t = parseInt(d) / parseInt(this.speed);
            return parseInt(t);
        }
    }

}