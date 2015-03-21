window.onload = function() {
	extend(Base, Derived);

	example = new Derived('example');
	Derived.staticMethod();
	example.instanceMethod();
	document.write("<br>");

	example = new Derived('example');
	otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();
	document.write("<br>");
}

function Base(name) {
	this.instanceVariable = name;
	this.instanceMethod = function() {
		document.write("This is from Base class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
	}
}
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	document.write("This is from Base class static-method, static-variable is: " + this.staticVariable + "<br>");
}

function Derived(name) {
	this.instanceVariable = name;
	this.instanceMethod = function() {
		(new this.prototype.constructor(this.instanceVariable)).instanceMethod();
		document.write("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
	}
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	if (this.prototype.staticMethod !== undefined)
		this.prototype.staticMethod();
	document.write("This is from Derived class static-method, static-variacle is: " + this.staticVariable + "<br>");
}

function extend(base, derived) {
	derived.prototype = base;
}

// window.onload = function() {
// 	extend(Base, Derived);

// 	example = new Derived('example');
// 	Derived.staticMethod();
// 	example.instanceMethod();
// 	document.write("<br>");

// 	example = new Derived('example');
// 	otherExample = new Derived('other-example');
// 	Derived.staticMethod();
// 	example.instanceMethod();
// 	otherExample.instanceMethod();
// 	document.write("<br>");

// 	A = new Base("a")
// 	Base.staticMethod();
// 	A.instanceMethod();
// 	document.write("<br>");

// 	B = new Derived("b");
// 	Derived.staticMethod();
// 	B.instanceMethod();
// 	document.write("<br>");

// 	document.write("The constructor of Base is " + Base.constructor + "<br>")
// 	document.write("The constructor of Base's instance is " + A.constructor + "<br>")
// 	document.write("The constructor of Derived is " + Derived.constructor + "<br>")
// 	document.write("The constructor of Derived's instance is " + B.constructor + "<br>")
// }

// function Base(name) {
// 	this.instanceVariable = name;
// 	this.instanceMethod = function() {
// 		document.write("This is from Base class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
// 	}
// 	this.staticVariable = 'Base';
// 	this.staticMethod = function() {
// 		document.write("This is from Base class static-method, static-variable is: " + this.staticVariable + "<br>");
// 	}
// }

// function Derived(name) {
// 	this.instanceVariable = name;
// 	this.instanceMethod = function() {
// 		(new this.prototype.constructor(this.instanceVariable)).instanceMethod();
// 		document.write("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
// 	}
// 	this.staticVariable = 'Derived';
// 	this.staticMethod = function() {
// 		if (this.prototype.staticMethod !== undefined)
// 			this.prototype.staticMethod();
// 		document.write("This is from Derived class static-method, static-variacle is: " + this.staticVariable + "<br>");
// 	}
// }

// function extend(base, derived) {
// 	derived.prototype = new base();
// 	derived.prototype.constructor = derived;
// }
