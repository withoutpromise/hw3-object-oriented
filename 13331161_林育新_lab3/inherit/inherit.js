window.onload = function() {
	extend(Base, Derived);

	example = new Derived("example");
	Derived.staticMethod();
	example.instanceMethod();

	document.write("<br>");

	example = new Derived("example");
	otherExample = new Derived("other-example");
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();
}

function Base(variable) {
	this.instanceVariable = variable;
}

Base.prototype.instanceMethod = function() {
	document.write("This is from Base class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
}

Base.staticVariable = "Base";

Base.staticMethod = function() {
	document.write("This is from Base class staic-method, static-variable is: " + this.staticVariable + "<br>");
}

function Derived(variable) {
	this.instanceVariable = variable;
}


Derived.staticVariable = "Derived";

function extend(Base, Derived) {
	Derived.prototype.instanceMethod = function() {
		Base.prototype.instanceMethod.call(this);
		document.write("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
	}

	Derived.staticMethod = function() {
		Base.staticMethod.call(this);
		document.write("This is from Derived class staic-method, static-variable is : " + this.staticVariable + "<br>");
	}
}
