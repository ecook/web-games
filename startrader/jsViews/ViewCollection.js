ViewCollection = function(canvas) {

    this.drawTools = new DrawTools(canvas);
	this.views = [];
	this.modalMessage = new ViewMessage();

    this.add = function(view) {

        this.views[this.views.length] = view;

        this.views.sort(function(a,b){return b.drawOrder < a.drawOrder});

    };

    this.add(this.modalMessage);

    this.draw = function() {
        //clear the canvas
        var dt = this.drawTools;
        this.drawTools.ClearCanvas();

        this.views.forEach(function (view) {
            view.draw(dt);
        });
    };

    this.process = function() {
        this.views.forEach(function (view) {
            view.process();
        });
    };

    this.events = function(event) {
        this.views.forEach(function (view) {
            view.eventHandler(event);
        });
    };

    this.show = function (name, x, y) {
        this.views.forEach(function (view) {
            if (view.name == name) {
                view.show(x, y);
                return;
            }
        });
    };

    this.hide = function (name) {
        this.views.forEach(function (view) {
            if (view.name == name) {
                view.hide();
                return;
            }
        });
    };

    this.showMessage = function(x, y, message) {
        this.modalMessage.show(x, y, message);
    };

};