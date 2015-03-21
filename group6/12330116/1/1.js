"use strict"

var Base = function(_value) {
	this.instanceVariable = _value;
	this.instanceMethod = function() {
		console.log('This is from Base class instance-method,instance-variable is:' + this.instanceVariable);
	};
};
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log('This is from Base class static-method,static-variable is:' + Base.staticVariable);
}

var extend = function(base,derived) {
	derived.staticVariable = 'Derived';
	base.staticVariable = 'Derived';
	derived.staticMethod = function() {
		base.staticMethod();
		console.log('This is from Derived class static-method,static-variable is:' + derived.staticVariable);
	}
	derived.prototype.constructor = base;
	derived.prototype.instanceMethod = function() {
		(new Base(this.instanceVariable)).instanceMethod();
		console.log('This is from Derived class instance-method,instance-variable is:' + this.instanceVariable);
	}
}
 
var Derived = function(_value){
	Base.call(Derived.prototype,_value);
	extend(Base,Derived);
};

var example = new Derived('example');
var otherExample = new Derived('other-example');
example.instanceMethod();
otherExample.instanceMethod();