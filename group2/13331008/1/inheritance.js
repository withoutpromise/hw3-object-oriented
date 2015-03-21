function Base(instance) {
	this.instanceVariable = instance;
}
Base.prototype.instanceMethod = function() {
		console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
	};
Base.staticVariable = 'Base';
Base.staticMethod = function() {
		console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

function Derived(instance) {
	this.instanceVariable = instance;
}
Derived.staticVariable = 'Derived';

function extend(base, derived) {
	derived.staticMethod = function() {
		base.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	};

	derived.prototype.instanceMethod = function() {
		derived.staticMethod();
		base.prototype.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	};

}

extend(Base, Derived);

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("----------------------------------------------------------------------------");

example = new Derived('example');
otherExample = new Derived('other-example');
example.instanceMethod();
otherExample.instanceMethod();