function Planet(x, y) {

    this.x = x;
    this.y = y;
    this.type = this.GeneratePlanetType();
	this.workers = new Array();
    this.size = settings.planetSize;
    this.isDestination = false;
    this.market = new Market(this);
    this.producers = GenerateProducers(this);
    this.population = random(settings.minStartPop, settings.maxStartPop);
	this.popChange = settings.basePopGrowthPerDay;
	this.cash = settings.planetStartCash;
	this.nextAi = 0;
	
	for(var i in settings.workerStartLevels) {
		this.workers[i] = this.population * settings.workerStartLevels[i];
	}

    this.draw = function(c)
    {
		drawShape('circle', this.color(), this.size, this.x, this.y);

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
		
		// population
		var x = 20;
		var y = drawingCanvas.height - 10;
		for(var i = 0; i < this.population; i+=settings.popRep) {
			drawShape('circle', 'white', 5, x, y);
			x+=15;
		}

        //market
        //this.market.draw(c);

        //producers
		var x = new Array();
		var y = new Array();
        x[0] = 50;
        y[0] = drawingCanvas.height - 75;
        x[1] = 75;
        y[1] = drawingCanvas.height - 125;		
        x[2] = 100;
        y[2] = drawingCanvas.height - 175;			
		
        var size = 40;
        for(var p in this.producers){
            this.producers[p].draw(c, x[this.producers[p].level-1], y[this.producers[p].level-1], size);
            x[this.producers[p].level-1] += (size * 2) + 10;
        }
    }

    this.ai = function()
    {
		if(days >= this.nextAi) {
			this.population += this.popChange;
		
			for(var i = 0; i < this.producers.length; i++) {
				this.producers[i].produce();
			}
			
			this.nextAi = days + 1;
		}
    }
	
	this.hire = function(workers, level) {
		
		if(this.workers[level-1] != undefined && this.workers[level-1] >= workers) {
			// assign workers
			this.workers[level-1] - workers;
			return workers;
		} else {
			return 0;
		}
	
	}
	
	this.layoff = function(workers, level) {
		this.workers[level-1] + workers;
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
        text += 'Type: ' + this.type;
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
        color: '',
		terain: '',
		temperature: '',
		weather: '',
		hasEcosystem: ''
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


