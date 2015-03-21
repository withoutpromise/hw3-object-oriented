// 创建Base
var Base = function(instanceVariable) {
	this.instanceVariable = instanceVariable;
}
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}

// 创建Derived
var Derived = function(instanceVariable) {
	this.instanceVariable = instanceVariable;
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}
Derived.prototype.instanceMethod = function() {
	console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
}

// 返回“继承”了base的derived
var extend = function (base, derived) {
	// 先调用oldFun，再调用newFun，并返回合并后的fun
	var addFun = function(oldFun, newFun) {
		return function() {
			oldFun.call(this);
			newFun.call(this);
		}
	}
	// 将old中的所有成员合并到tem中，如果tem已有同名函数则合并该函数
	var addPro = function(tem, old) {
		for (var pro in old) {
			if (typeof(old[pro]) == 'function' && tem[pro]) {
				var temFun = tem[pro];
				tem[pro] = addFun(temFun, old[pro]);
			} else {
				tem[pro] = old[pro];
			}
		}
	}
	// 调用base、derived的构造函数
	var temClass = function(para) {
		base.call(this, para);
		derived.call(this, para);
	}
	addPro(temClass, base);
	addPro(temClass, derived);
	addPro(temClass.prototype, base.prototype);
	addPro(temClass.prototype, derived.prototype);
	
	return temClass;
}

Derived = extend(Base, Derived);



example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log('------------------------------------');

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
