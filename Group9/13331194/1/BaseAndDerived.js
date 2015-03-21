function Base(variable){
	this.instanceVariable = variable;
}

Base.staticVariable = "Base";
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

Base.prototype.instanceMethod = function() {
	//Base.staticMethod.apply(Derived, arguments);
	Derived.staticMethod.apply(Derived, arguments);
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}

function Derived(variable){
	this.instanceVariable = variable;
}

Derived.staticVariable = "Derived";
Derived.staticMethod = function() {
	//Base.staticMethod.call(this, arguments);
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

Derived.prototype.instanceMethod = function() {
	//Derived.staticMethod.apply(Derived, arguments);
	//Base.instanceMethod.call(this, arguments);
	console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
}

function extend(base, derived) {
	var newClass = function() {
		base.apply(this, arguments);
		derived.apply(this, arguments);
	}

	Inheritance(newClass, base);
	Inheritance(newClass, derived);
	Inheritance(newClass.prototype, base.prototype);
	Inheritance(newClass.prototype, derived.prototype);

	return newClass;
}

function Inheritance(newClass, oldClass) {
	for (var key in oldClass) {
		if (typeof oldClass[key] === "function") {
			var f = newClass[key];
			newClass[key] = function() {
				if (typeof f === "function") {
					f.apply(this, arguments);
				}
				oldClass[key].apply(this, arguments);
			}
		} else {
			newClass[key] = oldClass[key];
		}
	}
}

Derived = extend(Base, Derived);

console.log("------------------------The 1st one------------------------");

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("------------------------The 2nd one------------------------");

example = new Derived('example');
otherExample = new Derived('other-example');
example.instanceMethod();
otherExample.instanceMethod();