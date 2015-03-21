function Base (instanceVariable) {
	 this.instanceVariable = instanceVariable;
	// body...
}
Base.prototype.instanceMethod = function(instanceVariable) {
	//instanceVariable = Base.instanceVariable;
	console.log("This is from Derived class instance-method, instance-variable is: " + Base.instanceVariable);
};
Base.staticVariable = 'Base';
Base.staticMethod = function(staticVariable) {

	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}
instanceVariable = new Base();
function extend(base,derived) {
function f() {};
f.prototype = base.prototype;
var obj = new f();
obj.constructor = derived;
derived.prototype = obj;
}
extend(Base,Derived);
function Derived(instanceVariable) {
	Base.call(this);
}

Derived.staticVariable = 'Derived';
Derived.staticMethod = function(staticVariable) {
	Base.staticMethod(this.staticVariable);
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}
Derived.prototype.instanceMethod = function() {
	Base.prototype.instanceMethod();

	console.log("This is from Derived class instance-method, instance-variable is: " + Base.instanceVariable);
}
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod;