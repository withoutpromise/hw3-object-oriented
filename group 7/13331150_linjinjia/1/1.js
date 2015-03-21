
function extand_st() {
	Base.staticVariable = Derived.staticVariable;
	Base.staticMethod();
}

function extand_in(name) {
	var new_Base = new Base(name);
	new_Base.instanceMethod();
}

var Base = function(name) {
	var instanceVariable = name;
	this.instanceMethod = function() {
		return console.log("This is from Base class instance-method, static-variable is: " + instanceVariable);
	}

}

Base.staticVariable = "Base";
Base.staticMethod = function() {
	return console.log("This is from Base class static-method, static-variable is: " + Base.staticVariable);
}

var Derived = function(name) {
	var instanceVariable = name;
	this.instanceMethod = function() {
		extand_in(name);
		return console.log("This is from Derived class instance-method, instance-variable is: " + instanceVariable);
	}
	
}

Derived.staticVariable = "Derived";
Derived.staticMethod = function() {
	extand_st(Base, Derived);
	return console.log("This is from Derived class static-method, static-variable is: " + Derived.staticVariable);
}
