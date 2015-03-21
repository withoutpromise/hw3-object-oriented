/**
 * FileName: table.js;
 * Author: linyiting;
 */

window.onload = function() {
    Derived = extend(Base, Derived);

    example = new Derived('example');
    Derived.staticMethod();
    example.instanceMethod();

    console.log("----------------------------\n");

    example = new Derived('example');
	otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();

};

/**
 * Base
 */
function Base(instanceVariable) {
    this.instanceVariable = instanceVariable;    //实例变量
}
Base.staticVariable = 'Base';                    //类变量
Base.staticMethod = function() {                 //类方法
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}
Base.prototype.instanceMethod = function() {     //实例方法
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}

/**
 * Derived
 */
function Derived(instanceVariable) {
	this.instanceVariable = instanceVariable;         //实例变量
}
Derived.staticVariable = 'Derived';                   //类变量
Derived.staticMethod = function() {                   //类方法
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}
Derived.prototype.instanceMethod = function() {       //实例方法
	console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
}

/*
 * extend方法
 */
function extend(base, derived) {
	var Derived = function() {     // 获取base, derived的实例变量
		base.apply(this, arguments);
		derived.apply(this, arguments);
	}
	inher(Derived, base, derived);   // 获取derived的类变量, base, derived的类方法
	inher(Derived.prototype, base.prototype, derived.prototype);  // 获取base, derived的实例方法
    return Derived;
};

function inher(obj, base, derived) {
	for (var key in derived) {
        obj[key] = derived[key];
	}
    for (var key in base) {
        if (typeof base[key] === 'function') {
        	if (typeof obj[key] === 'function') {
	        	obj[key] = function() {
	        		base[key].apply(this, arguments);
	                derived[key].apply(this, arguments);
	        	}
            }
        }
    }
}
