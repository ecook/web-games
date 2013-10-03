var ticks = 0;

function tick() {

    ticks++;
    if(ticks > settings.ticksPerDay) {
        days++;
        ticks = 0;
    }

    //process planet ai
    for(var i = 0; i < galaxy.length; i++) {
        galaxy[i].ai();
    }
    clear(context);
    draw(context, drawingCanvas.mode);
    refreshUi(drawingCanvas.mode);

}

oldMode = '';
function refreshUi(mode) {

    uiPositionX.value = mouse.x;
    uiPositionY.value = mouse.y;
    uiDays.value = days;

    if(mode == 'galaxy'){

        if(ship.destination != null) {
            uiDestinationX.value = ship.destination.x;
            uiDestinationY.value = ship.destination.y;
            uiTravelDays.value = ship.daysToTravel();
        } else {
            uiDestinationX.value = '';
            uiDestinationY.value = '';
            uiTravelDays.value = '';
        }

        uiSpeed.value = ship.speed;
        uiCargoMax.value = ship.capacity;
        uiCargoAmount.value = ship.cargoAmount();
    } else if(mode == 'planet') {


    }

    if(mode != oldMode){
        oldMode = mode;
        if(mode == 'galaxy'){
            $('#galaxyControls').show('fast');
            $('#planetControls').hide('fast');
        } else {
            $('#galaxyControls').hide('fast');
            $('#planetControls').show('fast');
        }
    }
}

function clear(c) {
    c.fillStyle = "black";
    c.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

function draw(c, mode) {
    if(mode == 'galaxy'){
        for(var i = 0; i < galaxy.length; i++) {
            galaxy[i].draw(c);
        }
        ship.draw(c);
    }else if(mode == 'planet'){
        ship.planet.drawDetails(c, drawingCanvas);
    }
}