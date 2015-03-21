//Base
function Base(variable) {
	this.instanceVariable = variable;
}

Base.staticVariable = "Base";

Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}

Base.staticMethod = function() {
	console.log("This is from Base class staic-method, static-variable is: " + this.staticVariable);
}

function Derived(variable) {
	this.instanceVariable = variable;
}

//Derived
Derived.staticVariable = "Derived";

function extend(Base, Derived) {
	Derived.prototype.instanceMethod = function() {
		Base.prototype.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}

	Derived.staticMethod = function() {
		Base.staticMethod.call(this);
		console.log("This is from Derived class staic-method, static-variable is : " + this.staticVariable);
	}
}


//运行

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