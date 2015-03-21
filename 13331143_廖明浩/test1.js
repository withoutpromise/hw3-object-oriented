//参考资料：http://blog.csdn.net/ls510671759/article/details/6410881（里面讲的具体！）
window.onload = function() {
	extend(Base, Derived);
	example = new Derived('example');
    Derived.staticMethod();
    example.instanceMethod();

    example = new Derived('example');
    otherExample = new Derived('other-example');
    Derived.staticMethod();
    example.instanceMethod();
    otherExample.instanceMethod();
}


var Base = function(instanceVariable) {
	this.instanceVariable = instanceVariable;
	//这里不用this.instanceMethod = function(){}的原因是在第40行（函数外部）时无法调用instanceMethod
};
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	document.write("This is from Base class static-method, static-variable is: " + this.staticVariable + "<br/>");
};
//用classname.prototype.fucntionname = function(){}这种方法可以在40行（函数外部）使用
Base.prototype.instanceMethod = function() {
	document.write("This is from Base class instance-method, instanceVariable is: " + this.instanceVariable + "<br/>");
};


function Derived(instanceVariable) {
	this.instanceVariable = instanceVariable;
}
Derived.staticVariable = 'Derived';
function extend(Base, Derived) {
    Derived.staticMethod = function() {
    	Base.staticMethod.call(this);
    	document.write("This is from Derived class static-method, static-variable is: " + this.staticVariable + "<br/>");
    };
    Derived.prototype.instanceMethod = function() {
    	Base.prototype.instanceMethod.call(this);
    	document.write("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable + "<br/>");
    };
}

//总结：属性和方法的引用有3种 
//1.私有属性与方法，只能在对象内部引用 实现方式为： {var f = function() {.....};}
//2.实例属性与方法，可以在任何地方使用，但必须通过对象来引用。 {this.functionname = function(){....};}
                     //或 classname.prototype.functionname = function(){...};（（这个可以在函数外部使用）
//3.类属性与方法，可以在任何地方使用，但不能通过对象的实例来引用 classname.functionname = functionname() {};