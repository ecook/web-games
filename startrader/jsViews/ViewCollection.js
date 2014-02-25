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
        this.drawTools.ClearCanvas();

        this.views.forEach(function (view) {
            view.draw(this.drawTools);
        }, this);
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
        for(var i in this.views) {
            if(this.views[i].name == name) {
                this.views[i].show(x, y);
                break;
            }
        }
    };

    this.hide = function (name) {
        for(var i in this.views) {
            if(this.views[i].name == name) {
                this.views[i].hide();
                break;
            }
        }
    };

    this.showMessage = function(x, y, message) {
        this.modalMessage.show(x, y, message);
    };

};