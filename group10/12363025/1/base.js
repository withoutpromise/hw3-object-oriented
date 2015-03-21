var object = function (prototype) {
    var F = function () {};
    F.prototype = prototype;
    return new F();
}



function extend(base, derived) {
	var prototype = object(base.prototype);
	prototype.constructor = derived;
	prototype.superClass = base.prototype;
	prototype.instanceMethod = function() {
		prototype.superClass.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
	derived.prototype = prototype;
}

function Base(instanceVariable) {
		this.instanceVariable = instanceVariable;
}


Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

function Derived(instanceVariable) {
	Base.call(this, instanceVariable);
	this.instanceVariable = instanceVariable;
}


extend(Base, Derived);

Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	this.prototype.superClass.constructor.staticMethod.call(this);
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
};