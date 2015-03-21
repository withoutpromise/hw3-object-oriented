// constructor for base
function Base(v) {
	this.instanceVariable = v;
	this.instanceMethod = function () {
		document.writeln("<p>This is from Base class instance-method, instance-variable is: " + this.instanceVariable+"</p>");
	};
	return this;
}
Base.staticVariable = 'Base';
Base.staticMethod = function () {
	document.writeln("<p>This is from Base class static-method, static-variable is: " + Base.staticVariable+"</p>");
};

function extend(base, derived) {
	var f = function () {};
	f.prototype = base.prototype.constructor;
	derived.prototype = new f();
	derived.prototype.constructor = derived;
}

function Derived(v) {
	var base = new Base(v);
	this.instanceMethod = function () {
		base.instanceMethod();
		document.writeln("<p>This is from Derived class instance-method, instance-variable is: " + base.instanceVariable+"</p>");
	}
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function () {
	this.prototype.staticMethod();
	document.writeln("<p>This is from Derived class static-method, static-variable is: " + Derived.staticVariable+"</p>");
}

window.onload = function () {
	extend(Base, Derived);
	var example = new Derived('example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample = new Derived('other-example');
	otherExample.instanceMethod();
}
