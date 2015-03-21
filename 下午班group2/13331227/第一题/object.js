window.onload = function() {
	extend(Base, Derived);
	//1
	example = new Derived('example');
	Derived.staticMethod();
	example.instanceMethod();
	//2
	example = new Derived('example');
	otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();
}
//基类Base
function Base(name) {
	this.instanceVariable = name;  //实例变量通过constructor初始化
}

//类变量：staticVariable = 'Base'
Base.staticVariable = 'Base';
//类方法:staticMethod 运行时输出："This is from Base class static-method, static-variable is: " + staticVariabl
Base.staticMethod = function() {
	document.write("This is from Base class static-method, static-variable is: " + this.staticVariable + "<br>");
}
//实例方法:instanceMethod，运行时输出："This is from Base class instance-method, static-variable is: " + instanceVariable
Base.prototype.instanceMethod = function() {
	document.write("This is from Base class instance-method, static-variable is: " + this.instanceVariable + "<br>");
}

//派生类Derived
function Derived(name) {
	this.instanceVariable = name;   //实例变量：instanceVariable，通过constructor初始化
}
//类变量：staticVariable = 'Derived'
Derived.staticVariable = 'Derived';

//继承方法function extend(base, derived)
function extend(base, derived) {
//类方法：staticMethod ，运行时，先调用Base的staticMethod，然后输出："This is from Derived class static-method, static-variable is: " + staticVariable
derived.staticMethod = function() {
	base.staticMethod.call(this, derived.staticVariable);
	document.write("This is from Derived class static-method, static-variable is: " + this.staticVariable + "<br>");
}
//instanceMethod，运行时，先调用Base的instanceMethod，然后输出：输出："This is from Derived class instance-method, instance-variable is: " + instanceVariable
derived.prototype.instanceMethod = function() {
	base.prototype.instanceMethod.call(this);
	document.write("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
}
