ViewCollection = function() {

	this.views = new Array();
	this.modalMessage = new ViewMessage();

	this.add(this.modalMessage);
}

ViewCollection.prototype.add = function(view) {

	this.views[this.views.length] = view;
	
	this.views.sort(function(a,b){return b.drawOrder < a.drawOrder});

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

ViewCollection.prototype.show = function(name, x, y) {
	for(var v in this.views) {
		if(this.views[v].name == name) {
			this.views[v].show(x, y);
			break;
		}
	}	
}

ViewCollection.prototype.showMessage = function(x, y, message) {
	this.modalMessage.show(x, y, message);
}