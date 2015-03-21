var Base = function (insV) {
	var staticVarible = 'Base';
	var instanceVariable = insV;
	var staticMethod = function () {
		alert("This is from Base class static-method, static-variable is: " + staticVarible);
	};
	var instanceMethod = function () {
		alert("This is from Base class static-method, static-variable is: " + instanceVariable);
	};
};

var Derived = function (insV) {};

function extend(Base, Derived) {
	Derived.staticVarible = 'Derived';
	Derived.instanceVariable = Derived.arguments[0];
	Derived.staticMethod = function () {
		Base.staticMethod();
		alert("This is from Derived class static-method, static-variable is: " + staticVariable);
	};
	Derived.instanceMethod = function () {
		Base.instanceMethod();
		alert("This is from Derived class instance-method, instance-variable is: " + instanceVariable);
	}
};







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