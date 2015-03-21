window.onload = function() {
	extend(Base, Derived);

	example = new Derived('example');
	Derived.staticMethod();
	example.instanceMethod();

	example = new Derived('example');
	otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();
}

function Base(name) {
	this.instanceVariable = name;
}

Base.prototype.instanceMethod = function() {
	document.write("This is from Base class instance-method, static-variable is: " + this.instanceVariable + "<br>");
}

Base.staticVariable = 'Base';
Base.staticMethod = function() {
	document.write("This is from Base class static-method, static-variable is: " + this.staticVariable + "<br>");
}


function Derived(name) {
	this.instanceVariable = name;
}

Derived.staticVariable = 'Derived';


function extend(base, derived) {
	derived.staticMethod = function() {
		base.staticMethod.call(this, derived.staticVariable);
		document.write("This is from Derived class static-method, static-variable is: " + this.staticVariable + "<br>");
	}

	derived.prototype.instanceMethod = function() {
		base.prototype.instanceMethod.call(this);
		document.write("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
	}
}
