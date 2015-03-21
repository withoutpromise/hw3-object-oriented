function Base(myVariable) {
	this.instanceVariable = myVariable;
}

Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}

Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

Base.staticVariable = 'Base';

function Derived(myVariable) {
	this.instanceVariable = myVariable;
}

Derived.staticVariable = 'Derived';

function extend(base, derived) {
	derived.prototype = new base();
	derived.prototype.instanceMethod = function() {
		//derived.staticMethod();
		derived.prototype.__proto__.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
	derived.staticMethod = function() {
		derived.prototype.constructor.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	}
}

extend(Base, Derived);

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();