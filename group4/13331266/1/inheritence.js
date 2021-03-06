var Base = function(id) {
	this.instanceVariable = id;
};

Base.staticVariable = "Base"; //point!

Base.staticMethod = function(){
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

Base.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

var Derived = function(id) {	
	this.instanceVariable = id;
};

Derived.staticVariable = "Derived";

function extend(base, derived) {
    derived.staticMethod = function() {
		base.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	};
	derived.prototype.instanceMethod = function() {
		base.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	};
};

extend(Base, Derived);

/////////////////test code/////////////////
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();

