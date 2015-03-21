//object的构造函数
var object = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
}

//通过构造一个object来实现继承
function extent(base, derived) {
	var prototype = object(base.prototype);
	prototype.constructor = derived;
	prototype.superClass = base.prototype;
	prototype.instanceMethod = function() {
		prototype.superClass.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
	derived.prototype = prototype;
}

function Base(instanceVariable) {
	this.instanceVariable = instanceVariable;
}

Base.staticVariable = 'Base';

Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

function Derived(instanceVariable) {
	Base.call(this, instanceVariable);
	this.instanceVariable = instanceVariable;
}

Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	this.prototype.superClass.constructor.staticMethod.call(this);
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
};

extent(Base, Derived);