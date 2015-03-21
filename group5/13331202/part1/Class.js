//Base Class
function Base(instanceVariable) {
	this.instanceVariable = instanceVariable;
};
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};
Base.staticVariable = "Base";
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

//Derived Class
function Derived(instanceVariable) {
	this.instanceVariable = instanceVariable;
};
Derived.prototype.instanceMethod = function() {
	console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
};
Derived.staticVariable = "Derived";
Derived.staticMethod = function() {
	  console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

//extend function
function extend(base, derived) {
	var prevent_staticMethod = derived.staticMethod;
	derived.staticMethod = function() {
		base.staticMethod.apply(this);
		prevent_staticMethod.apply(this);
	}
	var prevent_instanceMethod = derived.prototype.instanceMethod;
	derived.prototype.instanceMethod = function() {
		base.prototype.instanceMethod.apply(this);
		prevent_instanceMethod.apply(this);
	}
	return derived;
}

Derived = extend(Base, Derived);


/* test1

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

*/

/* test2

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();

*/
