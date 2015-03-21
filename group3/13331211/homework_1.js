var Base = function (iV) {
	var staticVariable = 'Base';
	var staticMethod = function(staticVariable) {
		console.log("This is from Base class static-method, static-variable is: " + staticVariable);
	};
	this.instanceVariable = iV;
	this.instanceMethod = function(iV) {
		console.log("This is from Base class instance-method, static-variable is: " + iV);
	};
	return {sM : staticMethod};
};

var Derived = function(iV) {
	Variable = iV;
	var staticVariable = 'Derived';
	var staticMethod = function() {
		Base().sM(staticVariable);
		console.log("This is from Derived class static-method, static-variable is: " + staticVariable);
	}();
	this.instanceMethod = function() {
		this.instanceMethod(iV);
		console.log("This is from Derived class static-method, static-variable is: " + iV);
	}();
};

function extend(base, derived) {
	derived.prototype = base;
}

extend(Base, Derived);

