View = function (name, width, height, backColor, drawOrder, action) {

    this.name = name;
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.fillStyle = backColor;
    this.action = action;
    this.isVisible = false;
    this.isActive = false;
    this.isDragable = true;
    this.drawOrder = drawOrder;
    this.controls = [];
    this.rulers = new Rulers(this);
    this.isMoving = false;
    this.movingOffset = {x: 0, y: 0};

    this.mousemove = function (caller, event) {};
    this.mouseup = function (caller, event) {};
    this.mousedown = function (caller, event) {};
    this.keyup = function (caller, event) {};
    this.keydown = function (caller, event) {};

    this.dragButton = new Button(this, 0, 0, 20, 20, 'yellow', 'rgba(0, 0, 255, 0.7)', '+');
    this.addControl(this.dragButton);

    this.setDragable = function (isDragable) {
        if(this.hasOwnProperty('isDragable')) {
            this.isDragable = isDragable;
            this.dragButton.isVisible = this.isDragable;
            this.dragButton.isEnabled = this.isDragable;
        } else {
            var parent = Object.getPrototypeOf(this);
            if(parent.hasOwnProperty('isDragable')) {
                parent.isDragable = isDragable;
                parent.dragButton.isVisible = this.isDragable;
                parent.dragButton.isEnabled = this.isDragable;
            }
        }
    };

    this.setVisible = function (isVisible) {
        if(this.hasOwnProperty('isVisible')) {
            this.isVisible = isVisible;
        } else {
            var parent = Object.getPrototypeOf(this);
            if(parent.hasOwnProperty('isVisible')) {
                parent.isVisible = isVisible;
            }
        }
    };

    this.setActive = function(isActive) {
        if(this.hasOwnProperty('isActive')) {
            this.isActive = isActive;
        } else {
            var parent = Object.getPrototypeOf(this);
            if(parent.hasOwnProperty('isActive')) {
                parent.isActive = isActive;
            }
        }
    }

    this.setX = function(x) {
        if(this.hasOwnProperty('x')) {
            this.x = x;
        } else {
            var parent = Object.getPrototypeOf(this);
            if(parent.hasOwnProperty('x')) {
                parent.x = x;
            }
        }
    }

    this.setY = function(y) {
        if(this.hasOwnProperty('y')) {
            this.y = y;
        } else {
            var parent = Object.getPrototypeOf(this);
            if(parent.hasOwnProperty('y')) {
                parent.y = y;
            }
        }
    }

    this.dragButton.mousedown = function (caller, event) {
        Object.getPrototypeOf(caller).isMoving = true;
        this.movingOffset = {x: event.layerX - Object.getPrototypeOf(caller).x, y: event.layerY - Object.getPrototypeOf(caller).y}
    };

    this.mouseup = function (caller, event) {
        Object.getPrototypeOf(caller).isMoving = false;
    };

    this.mousemove = function (caller, event) {
        if (caller.isMoving) {
            Object.getPrototypeOf(caller).x = event.layerX - caller.movingOffset.x;
            Object.getPrototypeOf(caller).y = event.layerY - caller.movingOffset.y;
        }
    };

    this.draw = function (drawTools) {

        if (this.isVisible) {
            // draw background
            drawTools.recFill(this.x, this.y, this.width, this.height, this.fillStyle);

            //draw rulers
            if (settings.debug) {
                this.rulers.draw(drawTools);
            }

            this.drawControls(drawTools);
        }

    };

    this.drawControls = function (drawTools) {
        //draw controls
        this.controls.forEach(function (control) {
            control.draw(drawTools);
        });
    };

    this.process = function () {

    };

    this.eventHandler = function (event) {
        if (this.isActive) {
            switch (event.type) {
                case 'mouseup':
                {
                    if (this.mouseup != null) {
                        this.mouseup(this, event);
                    }
                    for (var i in this.controls) {
                        if (this.controls[i].isHit(event.layerX, event.layerY)) {
                            if (this.controls[i].mouseup != null) {
                                this.controls[i].mouseup(this, event);
                            }
                            break;
                        }
                    }
                    break;
                }
                case 'mousedown':
                {
                    if (this.mousedown != null) {
                        this.mousedown(this, event);
                    }
                    for (var i in this.controls) {
                        if (this.controls[i].isHit(event.layerX, event.layerY)) {
                            if (this.controls[i].mousedown != null) {
                                this.controls[i].mousedown(this, event);
                            }
                            break;
                        }
                    }
                    break;
                }
                case 'mousemove':
                {
                    if (this.mousemove != null) {
                        this.mousemove(this, event);
                    }
                    for (var i in this.controls) {
                        if (this.controls[i].isHit(event.layerX, event.layerY)) {
                            if (this.controls[i].mousemove != null) {
                                this.controls[i].mousemove(this, event);
                            }
                            break;
                        }
                    }
                    break;
                }
                case 'keyup':
                {
                    if (this.keyup != null) {
                        this.keyup(this, event);
                    }
                    for (var i in this.controls) {
                        if (this.controls[i].isActive) {
                            if (this.controls[i].keyup != null) {
                                this.controls[i].keyup(this, event);
                            }
                            break;
                        }
                    }
                    break;
                }
                case 'keydown':
                {
                    if (this.keydown != null) {
                        this.keydown(this, event);
                    }
                    for (var i in this.controls) {
                        if (this.controls[i].isHit(event.layerX, event.layerY)) {
                            if (this.controls[i].keydown != null) {
                                this.controls[i].keydown(this, event);
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        }
    };

    this.show = function (x, y) {
        this.setX(x);
        this.setY(y);
        this.setVisible(true);
        this.setActive(true);
    };

    this.hide = function () {
        this.setVisible(false);
        this.setActive(false);
    }

};

View.prototype.addControl = function (control) {
    control.x += this.x;
    control.y += this.y;
    this.controls[this.controls.length] = control;
};