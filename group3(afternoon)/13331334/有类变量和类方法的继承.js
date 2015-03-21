function Base (initialInstanceVariable) {
	this.instanceVariable = initialInstanceVariable;
	this.instanceMethod = function() {
		console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
	};
}

Base.staticVariable = 'Base';
Base.staticMethod = function () {
	console.log("This is from Base class static-method, static-variable is: " + Base.staticVariable);
}

function Derived (initialInstanceVariable) {
	this.instanceVariable = initialInstanceVariable;
	this.instanceMethod = function() {
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
		this.__proto__.instanceMethod.apply(this);
	};
}

Derived.staticVariable = 'Derived';
Derived.staticMethod = function () {
	console.log("This is from Derived class static-method, static-variable is: " + Derived.staticVariable);
	Derived.prototype.constructor.staticMethod();
}

function extend(base, derived) {
	derived.prototype = new base();
}

extend(Base, Derived);
