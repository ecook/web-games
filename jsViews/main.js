// globals
var drawTools = new DrawTools();
var views = new ViewCollection();
var canvas = null;
var context = null;
var interval;  //use this reference to stop the interval

// code starts here
initialize = function() {

	// setup globals and views
	canvas = document.getElementById('canvas1');
	context = canvas.getContext('2d');
	
	// initialize project objects
	views.add( new SampleView('viewMain', 800, 500, 'black', null));
	//views.add( new SampleView('viewMain', 110, 150, 300, 200, null));
	
	views.show('viewMain', 100, 100);
	
	// start the main loop
	interval = setInterval(tick, settings.ticksPerSecond);

}

var ticksPerAi = 0;
var ticksPerFrame = 0;
// main tick loop
tick = function() {

	// project logic or ai
	if(ticksPerAi >= settings.ticksPerAi) {
		ticksPerAi = 0;

		// process ai logic
		views.process();
	
	} else {
		ticksPerAi++;
	}
	
	// draw views
	if(ticksPerFrame >= settings.ticksPerFrame) {
		ticksPerFrame = 0;
	
		//clear the canvas
		context.fillStyle = settings.canvasBackColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
		
		// draw views
		views.draw(context);

	} else {
		ticksPerFrame++;
	}

}

fireEvent = function(event) {
	views.events(event);
	return false;
}





