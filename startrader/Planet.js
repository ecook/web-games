function Planet(x, y) {

    this.x = x;
    this.y = y;
    this.type = this.GeneratePlanetType();
    this.size = 10;
    this.isDestination = false;
    this.market = new Market(this);
    this.producers = GenerateProducers(this);
    this.population = random(settings.minStartPop, settings.maxStartPop);

    this.draw = function(c)
    {
        c.strokeStyle = "white";
        c.fillStyle = this.color();
        c.beginPath();
        c.arc(this.x,this.y,this.size,0,Math.PI*2,true);
        c.closePath();
        c.stroke();
        c.fill();

        if(this.isDestination) {
            c.strokeStyle = "white";
            //c.fillStyle = this.color();
            c.beginPath();
            c.arc(this.x,this.y,this.size + 5,0,Math.PI*2,true);
            c.closePath();
            c.stroke();
        }
    }

    this.drawDetails = function(c, drawingCanvas) {

        //planet background
        c.strokeStyle = "white";
        c.fillStyle = this.color();
        c.beginPath();
        c.arc(drawingCanvas.width/2, drawingCanvas.height, drawingCanvas.width/2,0,Math.PI,true);
        c.closePath();
        c.stroke();
        c.fill();

        //market
        //this.market.draw(c);

        //producers
        var x = 50;
        var y = drawingCanvas.height - 50;
        var size = 30;
        for(var p in this.producers){
            this.producers[p].draw(c, x, y, size);
            x += size + 10;
        }
    }

    this.ai = function()
    {
        for(var i = 0; i < this.producers.length; i++) {
            this.producers[i].produce();
        }
    }

    this.find = function(x, y) {

        //return true if x, y are near this planet
        if((x < this.x + this.size && x > this.x - this.size)
            && (y < this.y + this.size && y > this.y - this.size )) {
            return true;
        } else {
            return false;
        }

    }

    this.displayText = function() {

        var text = '';
        text += 'X: ' + this.x;
        text += '\n';
        text += 'Y: ' + this.y;
        text += '\n';
        text += 'Type: ' + this.type.type;
        text += '\n';
        text += 'Population: ' + this.population;

        return text;
    }

    this.color = function() {
        return this.type.color;
    }


}

Planet.prototype.GeneratePlanetType = function() {

    var rand = Math.random();
    var pt = {
        type: '',
        color: ''
    }


    if(rand < 0.30) {
        pt.type = 'agriculture';
        pt.color = 'green';

    }else if(rand < 0.60) {
        pt.type = 'water';
        pt.color = 'blue';

    }else if(rand < 0.90) {
        pt.type = 'mineral';
        pt.color = 'brown';

    }else {
        pt.type = 'industrial';
        pt.color = 'grey';

    }

    return pt;
}


