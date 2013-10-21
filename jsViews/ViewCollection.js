ViewCollection = function() {

	this.activeView = 0;
	this.views = new Array();

}

ViewCollection.prototype.add = function(view) {

	this.views[this.views.length] = view;

}

ViewCollection.prototype.draw = function(context) {

	for(var v in this.views) {
		this.views[v].draw(context);
	}
}

ViewCollection.prototype.process = function() {
	for(var v in this.views) {
		this.views[v].process();
	}	
}

ViewCollection.prototype.events = function(event) {
	for(var v in this.views) {
		this.views[v].eventHandler(event);
	}	
}

ViewCollection.prototype.show = function(name) {
	for(var v in this.views) {
		if(this.views[v].name == name) {
			this.views[v].show();
			this.activeView = v;
			break;
		}
	}	
}