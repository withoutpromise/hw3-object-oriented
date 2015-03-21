//13331203
function Base(variable) {
	this.instanceVariable = variable;
	this.instanceMethod = function() {
	    console.log("This if from Base class instance-method, static-variable is: "+this.instanceVariable);
    };
}
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log("This if from Base class static-method, static-variable is: "+this.staticVariable);
};
function Derived(variable) {
	this.instanceVariable = variable;
	this.instanceMethod = function() {
		var base = new Base();
		base.instanceMethod.call(this);
	    console.log("This if from Derived class instance-method, static-variable is: "+this.instanceVariable);
    };
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	Derived.__proto__.staticMethod.call(this);
	console.log("This if from Derived class static-method, static-variable is: "+this.staticVariable);
};
function extend(base, derived) {
	derived.prototype = new base();
	derived.__proto__ = base;
}
extend(Base, Derived);
console.log("----------------------执行代码1----------------------------");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();
console.log("----------------------执行代码2----------------------------");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();