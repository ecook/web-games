var settings = {

	//general
	version: '11-12-2013 10:30PM',
	debug: true,
    ticksPerSecond: 33,
	ticksPerAi: 1,
    ticksPerFrame: 1,
	ticksPerDayGalaxy: 30,
	ticksPerDayPlanet: 300,
	canvasBackColor: '#A37A00',

    //ship
	shipStartCash: 500,
    shipStartCapacity: 25,
    shipStartSpeed: 30,

    //planets
    planetCount: 50,
    minStartPop: 10,
    maxStartPop: 100,
    basePopGrowthPerDay: .2,
	planetStartCash: 50000,
	planetLivingCost: 10,
	planetSize: 10,
    minWagePerDay: 15,
	workerStartLevels: [0.5, 0.3, 0.2],
	populationPerIcon: 5,
	planetStatsColor: 'yellow',
	planetStatsX: 10,
	planetStatsY: 60,
	populationCashThreshold: 1000,
	populationDecreasePerDay: 1,
	atmoColorNone: '',
	atmoColorMild: 'blue',
	atmoColorSevere: 'white',
	planetColorHot: '#4A1919',
	planetColorTemperate: '#244700',
	planetColorCold: '#006699',
	planetMadeOfStatsX: 800,
	planetMadeOfStatsY: 400,
	planetMadeOfStatsColor: 'black',
	
	//market
	marketStartMoney: 10000,
	marketMargin: .3,
	marketStatsColor: 'yellow',
	marketStatsX: 1130,
	marketStatsY: 5,
	marketStartStock: [10, 5, 1],

    //producers
    producerStartCash: 5000,
	producerStartWage: 50,
	producerStartMargin: 0.3,
	producerLevelOneMin: 2,
	producerLevelOneMax: 6,
	producerLayoffThreshold: -5,
	producerHireThreshold: 10,
	workersPerIcon: 5,
	dailyFacilityCost: 100,
	producerStatsColor: 'white',
	producerStatsX: 10,
	producerStatsY: 230,
	purchaseInventoryCashTheshold: 500,
	producerModExtremeTemperature: 0.5,
	producerModSevereWeather: 1.5,
	producerNextProductionColor: '#FF9999'

}

Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
    obj.__proto__ = proto;
    return obj; 
}

Object.getPrototypeOf = Object.getPrototypeOf || function (obj) {
	return obj.__proto__;
}