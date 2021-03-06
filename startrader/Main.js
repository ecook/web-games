var drawingCanvas;
var context;
var ship;
var galaxy = new Array();
var uiPositionX;
var uiPositionY;
var uiTravelDays;
var uiDestinationX;
var uiDestinationY;
var uiCargoMax;
var uiCargoAmount;
var uiSpeed;
var uiDays;
var mouse = { x:0, y:0 };
var days = 0;
var Items;
var modal = new Modal();
var buttons = new Array();
var btnLand = new Button(1200, 690, 60, 20, 'yellow', 'blue', 'Land', 10, 'Arial', 12, land);
var btnTakeOff = new Button(1200, 660, 60, 20, 'yellow', 'blue', 'TakeOff', 10, 'Arial', 12, takeOff);
var btnTravel = new Button(100, 100, 30, 20, 'yellow', 'blue', 'Go', 10, 'Arial', 12, travel);
var btnMarketBuy = new Button(600, 400, 70, 20, 'yellow', 'blue', 'Market', 10, 'Arial', 14, marketBuy);
var viewTrade;

$('document').ready( function() {

    drawingCanvas = document.getElementById('myDrawing');
    drawingCanvas.mode = 'galaxy';
	
	buttons[0] = btnLand;
	buttons[1] = btnTakeOff;
	buttons[2] = btnTravel;
	buttons[3] = btnMarketBuy;

    // Check the element is in the DOM and the browser supports canvas
    if(drawingCanvas != null && drawingCanvas.getContext) {
        // Initialise a 2-dimensional drawing context
        context = drawingCanvas.getContext('2d');
        //Canvas commands go here

		viewTrade = new Trade(drawingCanvas.width / 2 - 330, drawingCanvas.height / 2 - 330, 660, 680);
		
		Items = new ItemStore();
		
        for(var i = 0; i<settings.planetCount; i++) {
            var x = random(1, drawingCanvas.width);
            var y = random(1, drawingCanvas.height);
            var p = new Planet(x, y);
            galaxy[i] = p;
        }

        ship = new Ship(galaxy[0]);

        setInterval(tick, settings.ticksPerSecond);
    }

});

function random(min, max) {
    var ran = Math.random();
    return Math.floor((ran*max)+min)

}

function distance(x1, y1, x2, y2) {

    var xs = x2 - x1;
    var ys = y2 - y1;
    xs = xs * xs;
    ys = ys * ys;
    var retVal = Math.sqrt(xs + ys);

    return retVal;

}

function findPlanet(x, y) {

    for(var i = 0; i < galaxy.length; i++) {
        if(galaxy[i].find(x, y)) {
            return galaxy[i];
        }
    }
    return null;
}



