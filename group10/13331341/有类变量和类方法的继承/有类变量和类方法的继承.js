function Base(instanceVariable) {
	Base.staticVariable = 'Base';//静态变量
	Base.staticMethod = function() {
		console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
	}//静态方法
	this.instanceVariable = instanceVariable;//实例变量
}

Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);	
}//实例方法

function Derived(instanceVariable) {
	Derived.staticVariable = 'Derived';//静态变量
	this.instanceVariable = instanceVariable;//实例变量
}

function extend(base, derived) {
	derived.prototype = new base();
	derived.prototype.constructor = derived;//继承
    derived.staticMethod = function() {
    	base.staticMethod.apply(this);
    	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    }//静态方法扩展
    derived.prototype.instanceMethod = function() {
    	base.prototype.instanceMethod.apply(this);
    	console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    }//实例方法扩展
}

extend(Base, Derived);//调用扩展函数
