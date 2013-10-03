$('document').ready( function() {


    $('#myDrawing').on('click', function(e) {

        //mouse.x = e.pageX - this.offsetTop;
        //mouse.y = e.pageY - this.offsetLeft;

        var p = findPlanet(mouse.x, mouse.y);

        if( p != null && ship.location != p ) {
            if(ship.destination != null) ship.destination.isDestination = false;
            ship.destination = p;
            p.isDestination = true;
        } else {
            //alert('planet not found');
        }
    });

    $('#myDrawing').on('mousemove', function(e) {

        mouse.x = e.pageX - this.offsetLeft - settings.mouseAdjustOffset;
        mouse.y = e.pageY - this.offsetTop - settings.mouseAdjustOffset;

    });

});

function travel() {

    ship.travel();
    //days += ship.daysToTravel();
    //ship.planet = ship.destination;
    //ship.destination.isDestination = false;
    //ship.destination = null;
}

function currentLocation() {

    alert(ship.planet.displayText());

}

function land() {
    drawingCanvas.mode = 'planet';
}

function takeOff() {
    drawingCanvas.mode = 'galaxy';
}

