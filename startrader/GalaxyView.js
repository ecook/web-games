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
    this.lblX = new Label(this, this.rulers.get('x1'), 10, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');
    this.lblY = new Label(this, this.rulers.get('x1'), 40, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');
    this.btnTravel = new Button(this, 0, 0, 40, 20, 'yellow', 'blue', 'Go');
    this.lblDestination = new Label(this, 0, 10, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');
    this.lblDaysToTravel = new Label(this, 0, 40, 60, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', 'This is a label');

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
                planet.draw(drawTools);
            });

            if (ship.destination != null) {
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

                if (!ship.isTraveling)
                    this.btnTravel.visible = true;
                else
                    this.btnTravel.visible = false;

            } else {
                this.btnTravel.visible = false;
            }

            if (!ship.isTraveling)
                this.btnLand.visible = true;
            else
                this.btnLand.visible = false;

            ship.draw(drawTools);

            parent.drawControls(drawTools);
        }
    }

    this.process = function () {
        ship.move();
    }

    this.btnLand.mouseup = function (caller, event) {
        //views.showMessage(500, 300, 'Land button clicked');
        views.show('viewPlanet', 0, 0);
        caller.hide();
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
