function Ship(planet) {

    this.size = 3;
    this.x = planet.x;
    this.y = planet.y;
    this.planet = planet;
    this.destination;
    this.offset = planet.size / 2;
    this.capacity = settings.shipStartCapacity;
    this.cargo = new Array();
    this.speed = settings.shipStartSpeed;
    this.isTraveling = false;

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
        if(this.destination != null) {
            c.strokeStyle = "white";
            c.beginPath();
            c.moveTo(this.x, this.y);
            c.lineTo(this.destination.x, this.destination.y);
            c.closePath();
            c.stroke();
        }

        if(this.isTraveling){
            if(this.destination.x + this.destination.size > this.x && this.destination.x - this.destination.size < this.x
                && this.destination.y + this.destination.size > this.y && this.destination.y - this.destination.size < this.y){
                //ship has arrived
                this.isTraveling = false;
                this.planet = this.destination;
				this.destination.isDestination = false;
                this.destination = null;
                this.x = this.planet.x - this.offset;
                this.y = this.planet.y - this.offset;
            } else {
                // still traveling
                // calculate next x and y toward destination
                this.x = this.destination.x;
                this.y = this.destination.y;
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
        for(var i = 0; i < this.cargo.length; i++) {

            total += this.cargo[i].mass * this.cargo[i].quantity;
        }

        return total;
    }

    this.daysToTravel = function() {

        if(this.destination != null && this.planet != null) {
            var d = distance(this.planet.x, this.planet.y, this.destination.x, this.destination.y);
            var t = parseInt(d) / parseInt(this.speed);
            return t;
        }
    }

}