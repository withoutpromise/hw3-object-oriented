var Base = function() {
	this.instanceVariable = arguments[0] || 'someVariable';
	this.instanceMethod = function() {
		console.log('This is from Base class instance-method, instance-variable is: ' + this.instanceVariable);
	}
};
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log('This is from Base class static-method, static-variable is: ' + Base.staticVariable);
};

var extend = function (base, derived) {
	derived = function (variable) {
		this.instanceVariable = variable;
		this.instanceMethod = function () {
			derived.prototype.instanceMethod.apply(this, arguments);
			console.log('This is from Derived class instance-method, instance-variable is: ' + this.instanceVariable);
		};
	};
	derived.prototype = new base();
	derived.staticVariable = 'Derived';
	derived.staticMethod = function () {
		this.prototype.constructor.staticMethod.apply(this, arguments);
		console.log('This is from Derived class static-method, static-variable is: ' + this.staticVariable);
	};
	return derived;
}

var Derived;
Derived = extend(Base, Derived);

console.log('Test 1:')
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log('Test 2:');
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();