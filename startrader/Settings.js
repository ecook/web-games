var settings = {

    //general
	debug: true,
    ticksPerDayGalaxy: 30,
	ticksPerDayPlanet: 300,
    ticksPerSecond: 33,
    //mouseAdjustOffset: 10,

    //ship
	shipStartCash: 500,
    shipStartCapacity: 25,
    shipStartSpeed: 30,

    //planets
    planetCount: 50,
    minStartPop: 10,
    maxStartPop: 100,
    basePopGrowthPerDay: .2,
	planetStartCash: 10000,
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
	
	//market
	marketStartMoney: 10000,
	marketMargin: .3,
	marketStatsColor: 'yellow',
	marketStatsX: 1130,
	marketStatsY: 5,
	marketStartStock: [10, 5, 1],

    //producers
    producerStartCash: 5000,
	producerStartWage: 25,
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
	purchaseInventoryCashTheshold: 500

}