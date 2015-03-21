function Base(args) {
	this.instanceVariable = args;
	
};
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};
// static
Base.staticVariable = "Base";
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};


function Derived(args) {
	this.instanceVariable = args;
};

function extend(base, derived) {
	derived.prototype = new base();
	derived.staticVariable = "Derived";
	derived.staticMethod = function() {
		//base.staticMethod.apply(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	}
	derived.prototype.instanceMethod = function() {
		//base.prototype.instanceMethod.apply(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
	plus(base.prototype, derived.prototype);
	plus(base, derived);
}
function plus(base, derived) {
	for (var func in base) {
		if (typeof base[func] == "function") {
			var temp = derived[func];
			derived[func] = function() {
				base[func].apply(this);
				temp.apply(this);
			}
		}
	}
}



extend(Base, Derived);
// Test code
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();	
console.log("-------------------------------");
// test code II
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();