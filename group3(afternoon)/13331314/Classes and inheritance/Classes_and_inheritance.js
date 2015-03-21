// this function is used for output
var write = function(content) {
	document.write(content);
	document.write("<br>");
	console.log(content);
}

/*
* Class Base
*/
function Base(instanceVariable) {
	//Initialization of variables and methods of a class
	Base.staticVariable = 'Base';
	Base.staticMethod = function() {
		write("This is from Base class static-method, static-variable is: " + this.staticVariable);
	}
	//Initialization of variables and method of an instance
	Base.prototype.instanceVariable = instanceVariable;
	Base.prototype.instanceMethod = function() {
		write("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
	}
}

// the extend function for derived
function extend(base, derived) {
	// copy all static porperties and functions
	for(var i in Base) {
		derived[i] = base[i];
	}
	// copy all instance properties and functions
	derived.prototype = new base();
	derived.prototype.constructor = derived;
	// use for derived class to call base function
	//supr : super class
	derived.prototype.supr = Base.prototype;
	derived.supr = Base;
}

/*
* Class Derived
*/
function Derived(instanceVariable) {
	//Initialization of variables and methods of a class
	Derived.staticVariable = 'Derived';
	Derived.staticMethod = function() {
		// first method : use Base directly to call staticMethod
		//Base.staticMethod.call(this);
		// second method : use usper class from extend
		Derived.supr.staticMethod.call(this);
		write("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	};	
	////Initialization of variables and methods of a instance
	this.instanceVariable = instanceVariable;
	Derived.prototype.instanceMethod =  function() {
		// first method : use Base directly to call instanceMethod
		//Base.prototype.instanceMethod.call(this);
		// second method : use usper class from extend
		Derived.prototype.supr.instanceMethod.call(this);
		write("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	};
}

window.onload = function() {
	extend(Base, Derived);
	extend(Base, Derived);

	//the question code required
	write("Question 1 : ")
	example = new Derived('example');
	Derived.staticMethod();
	example.instanceMethod();

	write(" ");
	write("Question 2 : ");
	example = new Derived('example');
	otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();
}
