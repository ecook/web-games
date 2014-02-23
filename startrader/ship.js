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
				var travel = totalDistance / (this.daysToTravel() * settings.ticksPerDayGalaxy);
				
				var r = travel / totalDistance; //segment ratio

				this.x = r * this.destination.x + (1 - r) * this.x; //find point that divides the segment
				this.y = r * this.destination.y + (1 - r) * this.y; //into the ratio (1-r):r				

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
        this.items.data.forEach(function (item) {
            total += item.quantity;
        });

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