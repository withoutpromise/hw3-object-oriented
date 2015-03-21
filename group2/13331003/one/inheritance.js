//class Base
function Base(string) {
	this.instanceVariable = string;
}
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);

}
Base.instanceMethod = function() {
	console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
}

//inheritance class Derived
function Derived(string) {
	this.instanceVariable = string;
}
Derived.staticVariable = 'Derived';

//extend func
function extend(base, derived) {
	derived.prototype = new base;
	derived.staticMethod = function() {
		base.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	};
	derived.prototype.instanceMethod = function() {
		base.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
}
extend(Base, Derived);

console.log("Part 1");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("Part 2")
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();