// Base definition
var Base = function(instanceVariable) {
	this.instanceVariable = instanceVariable;
};

Base.staticVariable = "Base";
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

// Derived definition
var Derived = function(instanceVariable) {
	this.instanceVariable = instanceVariable;
};

Derived.staticVariable = 'Derived';
extend(Base, Derived);

function extend(base, derived) {
	derived.staticMethod = function() {
		Base.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable)
	};
	derived.prototype.instanceMethod = function() {
		Base.prototype.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	};
}

// to-do
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("====================================");

// to-do
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
