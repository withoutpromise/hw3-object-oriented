var Base = function( arg ) {
	//instance-variable
	this.instanceVariable = arg;
};
//static-variable
Base.staticVariable = "Base";
//static-method
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}
//instance-method
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
};

var Derived = function( arg ) {
	//instance-variable
	this.instanceVariable = arg;
}
//static-variable
Derived.staticVariable = "Derived";

function extend(base, derived) {
	derived.prototype = new base;
	//static-method
	derived.staticMethod = function() {
		base.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	}
	//static-variable
	derived.prototype.instanceMethod = function() {
		base.prototype.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	};
}

extend(Base, Derived);

//1)
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();
//2)
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();