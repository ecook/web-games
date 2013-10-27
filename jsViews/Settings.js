var settings = {

    //general
	version: '10-20-2013 11:00PM',
	debug: true,
    ticksPerSecond: 33,
	ticksPerAi: 1,
    ticksPerFrame: 1,
	canvasBackColor: '#A37A00'


}

 
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
    obj.__proto__ = proto;
    return obj; 
}

Object.getPrototypeOf = Object.getPrototypeOf || function (obj) {
	return obj.__proto__;
}