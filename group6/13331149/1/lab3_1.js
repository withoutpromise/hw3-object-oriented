/***********   Base class definition *******************************************/
var Base = function (name) {
	this.instanceVariable = name;
};

Base.staticVariable = 'Base';

Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

/***********   Derived class definition *******************************************/
var Derived = function(name) {
	this.instanceVariable = name;
}

Derived.staticVariable = 'Derived';

Derived.staticMethod = function() {
	console.log("This is from Derived class static-method, static-variable is: " + staticVariable);
}
Derived.prototype.instanceMethod = function() {
	console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
};


/***********   extend function *******************************************/
function extend(Base, Derived) {
	Derived.prototype = new Base();
	Derived.prototype.superclass = Base;
	Derived.staticMethod = function() {
		Derived.prototype.superclass.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	}
	Derived.prototype.instanceMethod = function() {
		Derived.prototype.superclass.prototype.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
};


/***********   Test . 1 *******************************************/
extend(Base, Derived);
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

/* output:
 * This is from Base class static-method, static-variable is: Derived
 *
 * This is from Derived class static-method, static-variable is: Derived
 *
 * This is from Base class instance-method, instance-variable is: example
 *
 * This is from Derived class instance-method, instance-variable is: example
 */
/***********   Test . 2 *******************************************/
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();

/* output:
 * This is from Base class static-method, static-variable is: Derived
 *
 * This is from Derived class static-method, static-variable is: Derived
 *
 * This is from Base class instance-method, instance-variable is: example
 *
 * This is from Derived class instance-method, instance-variable is: example
 *
 * This is from Base class instance-method, instance-variable is: other-example
 *
 * This is from Derived class instance-method, instance-variable is: other-example
 */