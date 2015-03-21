
function extend(base, derived) {
	derived.staticMethod = function() {
		base.staticMethod();
		document.writeln("This is from Derived class static-method, static-variable is: " + this.staticVariable + "<br />");
	};
	derived.prototype.instanceMethod = function() {
		k = new Base(this.instanceVariable);
		k.instanceMethod();
		k = null;
		document.writeln("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable + "<br />");
	};
}



function Base(v) {
	this.instanceVariable = v;
}
Base.staticVariable = "Base";
Base.staticMethod = function() {
	document.writeln("This is from Base class static-method, static-variable is: " + this.staticVariable + "<br />");
}
Base.prototype.instanceMethod = function() {
	document.writeln("This is from Base class instance-method, instance-variable is: " + this.instanceVariable + "<br />");
}


function Derived(v) {
	Base.call(this, v);
}
Derived.staticVariable = "Derived";



	extend(Base, Derived);

	example = new Derived("example");
	Derived.staticMethod();
	example.instanceMethod();

	example = new Derived('example');
	otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();