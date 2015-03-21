window.onload = function() {

	// Base构造函数
	var Base = function(x) {
		this.instanceVariable = x;
	};

	// 定义Base自身的类变量，类方法
	Base.staticVariable = "Base";
	Base.staticMethod = function() {
		console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
	};

	// 把instanceMethod方法加到构造函数中去
	Base.prototype.instanceMethod = function() {
		console.log("This is from Base class static-method, static-variable is: " + this.instanceVariable);
	};

	// Derived构造函数
	var Derived = function(x) {
		this.instanceVariable = x;
	};

	// 定义Derived自身的类变量
	Derived.staticVariable = "Derived";

	// 用Derived继承Base
	function extend(base, derived) {
		derived.prototype = new base;

		derived.staticMethod = function() {
			base.staticMethod.call(this);
			console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
		};

		derived.prototype.instanceMethod = function() {
			base.prototype.instanceMethod.call(this);
			console.log("This is from Derived class static-method, static-variable is: " + this.instanceVariable);
		};
	}

	// 执行该函数
	extend(Base, Derived);

	////////////////////////////////////////////

	//第一小题

	example = new Derived('example');
	Derived.staticMethod();
	example.instanceMethod();

	//第二小题

	example = new Derived('example');
	otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();
}