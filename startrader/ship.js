function Ship(planet) {

    this.size = 3;
    this.location = planet;
    this.destination;
    this.offset = 5;
    this.capacity = settings.shipStartCapacity;
    this.cargo = new Array();
    this.speed = settings.shipStartSpeed;

    this.draw = function(c)
    {
        // Create the green pellet
        c.strokeStyle = "red";
        c.fillStyle = "white";
        c.beginPath();
        c.arc(this.location.x - this.location.size - this.offset, this.location.y - this.location.size - this.offset,this.size,0,Math.PI*2,true);
        c.closePath();
        c.stroke();
        c.fill();

        if(this.destination != null) {
            c.strokeStyle = "white";
            c.beginPath();
            c.moveTo(this.location.x, this.location.y);
            c.lineTo(this.destination.x, this.destination.y);
            c.closePath();
            c.stroke();
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

        if(this.destination != null) {
            var d = distance(this.location.x, this.location.y, this.destination.x, this.destination.y);
            var t = parseInt(d) / parseInt(this.speed);
            return t;
        }
    }

}