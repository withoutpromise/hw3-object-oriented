var Base = function (name) {
	this.instanceVariable = name;
	this.instanceMethod = function() {
		console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
	};
}

Base.staticVariable = 'Base';
Base.staticMethod = function () {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}  

var Derived = function(name) {
	this.instanceVariable = name;
};

function extend(baseClass, derivedClass) {
	// 通过prototype继承基类的实例方法
	var temp = new baseClass();
	derivedClass.prototype.instanceMethod = function() {
		temp.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}

	/**  不可用
	derivedClass = function(name) {
		baseClass.call(this, name);
		var tempFunction = this.instanceMethod;
		this.instanceMethod = function() {
			tempFunction.call(this);
			console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
		}
	}
	**/

	// 通过调用基类方法继承基类静态方法
	derivedClass.staticVariable = 'Derived';
	derivedClass.staticMethod = function() {
		baseClass.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	}

}