//基类Base

//实例变量
function Base(argu) {
	this.instanceVariable = argu;
}

//类变量
Base.staticVariable = 'Base';

//类方法
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

//实例方法
Base.instanceMethod = function() {
	console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
}

//派生类Derived

//实例变量
function Derived(argu) {
	this.instanceVariable = argu;
}

//类变量
Derived.staticVariable = 'Derived';

//继承方法
function extend(base, derived) {
	derived.prototype = new base;

	//类方法
	derived.staticMethod = function() {
		base.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	};

	//实例方法
	derived.prototype.instanceMethod = function() {
		base.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
}


//应用
extend(Base, Derived);


//案例1
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();


//案例2
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();