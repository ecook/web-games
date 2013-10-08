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
var btnLand = new Button(675, 710, 60, 20, 'yellow', 'blue', 'Land', 'Arial', 12, land);
var btnTakeOff = new Button(675, 450, 60, 20, 'yellow', 'blue', 'TakeOff', 'Arial', 12, takeOff);
var btnTravel = new Button(10, 10, 30, 20, 'yellow', 'blue', 'Go', 'Arial', 10, travel);

$('document').ready( function() {

    drawingCanvas = document.getElementById('myDrawing');
    drawingCanvas.mode = 'galaxy';
	
	buttons[0] = btnLand;
	buttons[1] = btnTakeOff;
	buttons[2] = btnTravel;

    //status
    uiPositionX = document.getElementById('positionX');
    uiPositionY = document.getElementById('positionY');
    uiDays = document.getElementById('days');

    //destination
    uiTravelDays = document.getElementById('travelDays');
    uiDestinationX = document.getElementById('destinationX');
    uiDestinationY = document.getElementById('destinationY');

    //ship
    uiSpeed = document.getElementById('speed');
    uiCargoMax = document.getElementById('cargoMax');
    uiCargoAmount = document.getElementById('cargoAmount');

    // Check the element is in the DOM and the browser supports canvas
    if(drawingCanvas != null && drawingCanvas.getContext) {
        // Initaliase a 2-dimensional drawing context
        context = drawingCanvas.getContext('2d');
        //Canvas commands go here

		Items = new ItemStore();
		
        for(var i = 0; i<settings.planetCount; i++) {
            var x = random(1, drawingCanvas.width);
            var y = random(1, drawingCanvas.height);
            var p = new Planet(x, y);
            galaxy[i] = p;
        }

        ship = new Ship(galaxy[0]);

        setInterval(tick, settings.ticksPerMinute);
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

