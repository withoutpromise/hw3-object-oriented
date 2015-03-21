//定义基类实例属性
function Base(s1) {
	this.instanceVariable = s1;
}

//定义基类静态属性
Base.staticVariable = 'Base';

//定义基类静态方法
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

//定义基类实例方法
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
};

//定义继承类静态属性
Derived.staticVariable = "Derived";

function extend(base, derived) {
	//derived继承base, derived 就有了base属性和方法
	derived.prototype = new base();
	//重写derived的静态方法以满足输出需求
	derived.staticMethod = function() {
		base.staticMethod.apply(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	};
	//重写derived的实例方法以满足输出需求
	derived.prototype.instanceMethod = function() {
		Base.prototype.instanceMethod.apply(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
}

//执行代码
extend(Base, Derived);
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
