/*
  ekuri wrote this "base and derived.js" on 2015-3-20
  laterly written on 2015-3-20
*/

Base = function(initData) {
	this.instanceMethod = function() {
		console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
	}
	this.instanceVariable = initData;
}
Base.staticVariable = "Base";
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

Derived = function(initData) {
	this.instanceVariable = initData;
	this.instanceMethod = function() {
		this.__proto__.instanceVariable = this.instanceVariable;
		this.__proto__.instanceMethod();
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
}

function extend(base, derived) {
	derived.prototype = new base();
	derived.parent = base;
};
extend(Base, Derived);

Derived.staticVariable = "Derived";
Derived.staticMethod = function() {
	this.parent.staticVariable = this.staticVariable;
	this.parent.staticMethod();
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

