function Planet(x, y) {

	this.name = this.newPlanetName();
    this.x = x;
    this.y = y;
    this.type = this.GeneratePlanetType();
	this.workers = [];
    this.size = settings.planetSize;
    this.isDestination = false;
    this.market = new Market(this);
    this.producers = GenerateProducers(this);
    this.population = random(settings.minStartPop, settings.maxStartPop);
	this.popChange = settings.basePopGrowthPerDay;
	this.cash = settings.planetStartCash;
	this.nextAi = 0;
	this.newWorkers = 0;
	
	for(var i in settings.workerStartLevels) {
		this.workers[i] = parseInt(this.population * settings.workerStartLevels[i]);
	}

    this.drawDetails = function(drawTools) {
		
		//planet stats
		var statsX = settings.planetStatsX;
		var statsY = settings.planetStatsY;
		var statsSpacing = 20;
		var pixels = 12;
		var font = 'arial';
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetStatsColor, 'name: ' + this.name);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetStatsColor, 'temperature: ' + this.type.temperature);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetStatsColor, 'weather: ' + this.type.weather);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetStatsColor, 'population: ' + this.population);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetStatsColor, 'cash: ' + parseInt(this.cash));
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetStatsColor, 'available workers');
		for(var level in this.workers) {
			drawTools.text(statsX + 20, statsY+=statsSpacing, pixels, font, settings.planetStatsColor, 'level ' + (parseInt(level) + 1) + ':      ' + this.workers[level]);
		}
		
		//madeOf stats
		statsX = settings.planetMadeOfStatsX;
		statsY = settings.planetMadeOfStatsY;
		statsSpacing = 20;
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetMadeOfStatsColor, 'water: ' + this.type.madeOf.water);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetMadeOfStatsColor, 'ore: ' + this.type.madeOf.ore);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetMadeOfStatsColor, 'gases: ' + this.type.madeOf.gases);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetMadeOfStatsColor, 'crystals: ' + this.type.madeOf.crystals);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetMadeOfStatsColor, 'precious Metals: ' + this.type.madeOf.preciousMetals);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetMadeOfStatsColor, 'plants: ' + this.type.madeOf.plants);
		drawTools.text(statsX, statsY+=statsSpacing, pixels, font, settings.planetMadeOfStatsColor, 'animals: ' + this.type.madeOf.animals);
		
    };

    this.ai = function()
    {
		if(days >= this.nextAi) {
		
			if(this.population > 0) {
				// check for population decrease
				if(this.cash < settings.populationCashThreshold) {
					this.population -= settings.populationDecreasePerDay;
					this.newWorkers = 0;
					
					// remove workers from pool
					var workersLeaving = settings.populationDecreasePerDay;
					workersLeaving = this.removeWorkers(workersLeaving, 2);
					workersLeaving = this.removeWorkers(workersLeaving, 1);
					workersLeaving = this.removeWorkers(workersLeaving, 0);
				
				}	
			
				// population increase
				this.newWorkers += this.popChange;
				if(this.newWorkers > 0) {
					var newPeople = parseInt(this.newWorkers);
					this.newWorkers -= newPeople;
					this.population += newPeople;
					// add new people to worker pools
					var rnd = random(1, 10);
					if(rnd < settings.workerStartLevels[2] * 10) {
						this.workers[2] += newPeople;
					} else if(rnd < settings.workerStartLevels[1] * 10) {
						this.workers[1] += newPeople;
					} else {
						this.workers[0] += newPeople;
					}
				}
				
				// pay cost of living
				var livingCost = settings.planetLivingCost * this.population;
				if(livingCost > this.cash) {
					this.market.cash += this.cash;
					this.cash = 0;
				} else {
					this.market.cash += livingCost;
					this.cash -= livingCost;
				}	
			
				// production phase
				for(var i = 0; i < this.producers.length; i++) {
					this.producers[i].produce();
				}
			}
			
			this.nextAi = days + 1;
		}
    }
	
	this.hire = function(workers, level) {
		
		if(this.workers[level-1] != undefined && this.workers[level-1] >= workers) {
			// assign workers
			this.workers[level-1] -= workers;
			return workers;
		} else {
			return 0;
		}
	
	}
	
	this.layoff = function(workers, level) {
		this.workers[level-1] += workers;
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
        switch(this.type.temperature) {
			case 'hot':
				return settings.planetColorHot;
			case 'cold':
				return settings.planetColorCold;
			default:
				return settings.planetColorTemperate;
		}
    }
	
	this.atmoColor = function() {
        switch(this.type.weather) {
			case 'mild':
				return settings.atmoColorMild;
			case 'severe':
				return settings.atmoColorSevere;
			default:
				return settings.atmoColorNone;
		}
	}
	
	this.removeWorkers = function(workersLeaving, level) {
		if(workersLeaving > 0 && this.workers[level] > 0) {
			if(workersLeaving > this.workers[level]) {
				workersLeaving -= this.workers[level];
				this.workers[level] = 0;
			} else {
				this.workers[level] -= workersLeaving;
				workersLeaving = 0;
			}		
		}
		return workersLeaving;
	}

}

Planet.prototype.madeOf = function(itemName) {
		
	switch(itemName) {
		case 'ore': return this.type.madeOf.ore;
		case 'water': return this.type.madeOf.water;
		case 'precious metals': return this.type.madeOf.preciousMetals;
		case 'crystals': return this.type.madeOf.crystals;
		case 'gases': return this.type.madeOf.gases;
		case 'plants': return this.type.madeOf.plants;
		case 'animals': return this.type.madeOf.animals;
		default: return 0;
	}
}

Planet.prototype.GeneratePlanetType = function() {

    var rand = Math.random();
    var pt = {
		atmosphere: '',
		temperature: '',
		weather: '',
		madeOf: {
			water: '',		
			ore: '',
			preciousMetals: '',
			crystals: '',
			gases: '',
			plants: '',
			animals: ''
		}
    }
	
	//weather & atmosphere
	if(rand > 0.66) {
		pt.atmosphere = false;
		pt.weather = 'none';
	} else if(rand > 0.33) {
		pt.atmosphere = true;
		pt.weather = 'mild';
	} else {
		pt.atmosphere = true;
		pt.weather = 'severe';
	}		

	//temperature
	rand = Math.random();
    if(rand < 0.33) {
        pt.temperature = 'hot';
    }else if(rand < 0.66) {
        pt.temperature = 'temperate';
    } else {
        pt.temperature = 'cold';
    }

	// water
	rand = Math.random();
	pt.madeOf.water = parseInt(rand * 100);
	
	var whatsLeft = 100 - pt.madeOf.water;
	
	//what its made of
	pt.madeOf.ore = random(0, whatsLeft);
	whatsLeft -= pt.madeOf.ore;
	
	pt.madeOf.gases = random(0, whatsLeft);
	whatsLeft -= pt.madeOf.gases;
	
	if(pt.atmosphere && pt.madeOf.water > 0) {
		pt.madeOf.plants = random(0, whatsLeft);
		whatsLeft -= pt.madeOf.plants;
		
		pt.madeOf.animals = random(0, whatsLeft);
		whatsLeft -= pt.madeOf.animals;
	}
	
	pt.madeOf.crystals = random(0, whatsLeft);
	whatsLeft -= pt.madeOf.crystals;
	
	pt.madeOf.preciousMetals = whatsLeft;
	
    return pt;
}

currentNameIndex = -1;
currentNameSuffix = 0;

Planet.prototype.newPlanetName = function() {
	currentNameIndex++;
	if(currentNameIndex > this.names.length -1) {
		currentNameIndex = 0;
		currentNameSuffix++;
	}
	if(currentNameSuffix > 0) {
		return this.names[currentNameIndex] + ' ' + currentNameSuffix;
	} else {
		return this.names[currentNameIndex];
	}
}

Planet.prototype.names = [
		'Talitha',
		'Alula',
		'Ursa',
		'Esther',
		'Roxana',
		'Vesper',
		'Tana',
		'Seren',
		'Adara',
		'Alya',
		'Chara',
		'Danica',
		'Navi',
		'Lyra',
		'Vega',
		'Makara',
		'Zaniah',
		'Zosma',
		'Yvaine',
		'Shaula',
		'Phoebe',
		'Diana',
		'Selene',
		'Deva',
		'Neoma',
		'Rhiannon',
		'Lucine',
		'Leda',
		'Helene',
		'Calypso',
		'Cordelia',
		'Ophelia',
		'Bianca',
		'Cressida',
		'Juliet',
		'Portia',
		'Rosalind',
		'Belinda',
		'Miranda',
		'Ariel',
		'Thalassa',
		'Despina',
		'Larissa',
		'Evanthe',
		'Sunniva',
		'Marisol',
		'Soledad',
		'Solina',
		'Soleil',
		'Aideen',
		'Rabia',
		'Mitra',
		'Apollonia',
		'Draco',
		'Orpheus',
		'Leo',
		'Archer',
		'Sagittarius',
		'Callisto',
		'Umbriel',
		'Oberon',
		'Prospero',
		'Stephano',
		'Kale',
		'Apollo',
		'Feivel',
		'Faivish',
		'Phoibus',
		'Ravi',
		'Galileo',
		'Tycho',
		'Johannes',
		'Neil',
		'Aldren	'
	];
