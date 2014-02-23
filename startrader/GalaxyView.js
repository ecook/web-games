var GalaxyView = function (name, width, height, backColor, action) {

    Object.setPrototypeOf(this, new View(name, width, height, backColor, 1, action))

    this.borderColor = 'white';

    // add the rulers
    this.rulers.add('x1', true, 10);
    this.rulers.add('y1', false, height - 30);
    this.rulers.add('x2', true, width - 50);

    // add controls
    this.btnLand = new Button(this, this.rulers.get('x2'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'Land');
    this.lblVersion = new Label(this, this.rulers.get('x1'), this.rulers.get('y1'), 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', settings.version);
    this.lblX = new Label(this, this.rulers.get('x1'), 10, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '');
    this.lblY = new Label(this, this.rulers.get('x1'), 40, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '');
    this.btnTravel = new Button(this, 0, 0, 40, 20, 'yellow', 'blue', 'Go');
    this.lblDestination = new Label(this, 0, 10, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '');
    this.lblDaysToTravel = new Label(this, 0, 40, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '');

    this.addControl(this.btnLand);
    this.addControl(this.lblVersion);
    this.addControl(this.lblX);
    this.addControl(this.lblY);
    this.addControl(this.btnTravel);
    this.addControl(this.lblDestination);
    this.addControl(this.lblDaysToTravel);

    this.draw = function (drawTools) {

        if (this.isVisible) {
            // call base draw method
            var parent = Object.getPrototypeOf(this);
            parent.draw(drawTools);

            // draw border
            drawTools.recOutline(this.x, this.y, this.width, this.height, this.borderColor, 2);

            // draw the planets
            galaxy.forEach(function (planet) {
                if(planet.type.atmosphere) {
                    drawTools.circle(planet.x, planet.y, planet.size + 2, planet.atmoColor(), null);
                }
                drawTools.circle(planet.x, planet.y, planet.size + 2, null, planet.color());

                if(this.isDestination) {
                    drawTools.circle(planet.x, planet.y, planet.size + 5, "white", null);
                }
            });

            if (ship.destination != undefined && ship.destination != null) {
                var lblX = 0;
                var lblY = 0;
                if (ship.destination.x > drawTools.canvas.width - 120 || ship.destination.y > drawTools.canvas.height - 55) {
                    // shift to upper left
                    lblX = ship.destination.x - ship.destination.size * 2 - 100;
                    lblY = ship.destination.y - (ship.destination.size * 2);
                    this.lblDestination.move(lblX, lblY - 10);
                    this.btnTravel.move(lblX, lblY - 15);
                    this.lblDaysToTravel.move(lblX, lblY);
                } else {
                    lblX = ship.destination.x + ship.destination.size * 2;
                    lblY = ship.destination.y + (ship.destination.size * 2);
                    this.lblDestination.move(lblX, lblY - 10);
                    this.btnTravel.move(lblX, lblY + 25);
                    this.lblDaysToTravel.move(lblX, lblY);
                }
                this.lblDestination.value = ship.destination.name;
                this.lblDaysToTravel.value = 'days to travel: ' + ship.daysToTravel();
                this.lblDestination.show();
                this.lblDaysToTravel.show();

                if(ship.isTraveling) {
                    this.btnTravel.hide();
                } else {
                    this.btnTravel.show();
                }

            } else {
                this.btnTravel.hide();
                this.lblDestination.hide();
                this.lblDaysToTravel.hide();
            }

            if(ship.isTraveling) {
                this.btnLand.hide();
            } else {
                this.btnLand.show();
            }

            // draw ship
            // draw the ship
            drawTools.circle(ship.x - ship.offset, ship.y - ship.offset, ship.size, "red", "white");

            // draw the destination line
            if(ship.destination != null && ship.isTraveling == false) {
                drawTools.line(ship.x, ship.y, ship.destination.x, ship.destination.y, "white");
            }

            this.drawControls(drawTools);
        }
    }

    this.process = function () {
        ship.move();
    }

    this.btnLand.mouseup = function (caller, event) {
        //views.showMessage(500, 300, 'Land button clicked');
        views.hide(caller.name);
        views.show('viewPlanet', 0, 0);

    }

    this.btnTravel.mouseup = function (caller, event) {
        ship.travel();
    }

    this.mouseup = function (caller, event) {
        var p = findPlanet(event.x, event.y);

        if (p != null && ship.location != p) {
            if (ship.destination != null) ship.destination.isDestination = false;
            ship.destination = p;
            p.isDestination = true;
        }
    }

    this.mousemove = function (caller, event) {
        var parent = Object.getPrototypeOf(caller);
        parent.mousemove(caller, event);

        this.lblX.value = 'X: ' + event.x;
        this.lblY.value = 'Y: ' + event.y;
    }

};
