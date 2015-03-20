// 实例变量
var Base = function(instance_variable) {
	this.instanceVariable = instance_variable;
};

// 原型方法---节省空间
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method,static-variable is:"+this.instanceVariable);
}

// 静态变量和方法
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log("This is from Base class static-method,static-variable is:"+this.staticVariable);
};

// 继承类的实例变量
var Derived = function(instance_variable) {
	this.instanceVariable = instance_variable;
	this.instanceMethod = function() {
		this.__proto__.instanceMethod.apply(this);
		console.log("This is from Derived class instance-method,instance-variable is:"+this.instanceVariable);
	}
}

// 继承类的静态变量
Derived.staticVariable = 'Derived';

function extend(base, derived) {

	derived.staticMethod = function() {
		base.staticMethod.apply(this);
		console.log("This is from Derived class static-method,static-variable is:"+this.staticVariable);
	}
	derived.prototype = new Base();
	derived.prototype.constructor = derived;
};

extend(Base, Derived);

/**
 *测试样例一
 */
example = new Derived("example");
Derived.staticMethod();
example.instanceMethod();

/**
 *测试样例二
 */
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();