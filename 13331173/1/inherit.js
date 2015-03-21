(function () {
	var Base = function (insV) {
		this.instanceVariable = insV;
	}
	Base.staticVarible = 'Base';
	Base.prototype.instanceMethod = function () {
		document.writeln("This is from Base class static-method, static-variable is: " + instanceVariable);
	}
	Base.staticMethod = function () {
		document.writeln("This is from Derived class static-method, static-variable is: " + staticVariable);
	}

	var Derived = function (insV) {
		this.instanceVariable = insV;
	}
	Derived.staticVariable = 'Derived';
	Derived.prototype.instanceMethod = function () {
		document.writeln("This is from Derived class instance-method, instance-variable is: " + instanceVariable);
	}
	Derived.staticMethod = function () {
		document.writeln("This is from Derived class static-method, static-variable is: " + staticVariable);
	}

	
});