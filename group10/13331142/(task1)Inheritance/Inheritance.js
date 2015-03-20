// 构造函数，用于初始化基类Base
function Base(Variable) {
	this.instanceVariable = Variable;  // 实例变量：instanceVariable，通过constructor初始化
}

// 实例方法：instanceMethod
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
}

Base.staticVariable = 'Base'; // 类变量：staticVariable = 'Base'

// 类方法：staticMethod
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

function Derived(Variable) {
	this.instanceVariable = Variable;
}

Derived.prototype.instanceMethod = function() {
	console.log("This is from Derived class instance-method, static-variable is: " + this.instanceVariable);
}

Derived.staticVariable = 'Derived';

Derived.staticMethod = function() {
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

function extend(base, derived) {
	var Obj = function(Variable) {
		base.call(this, Variable);
		derived.call(this, Variable);
	}
	setProperty(Obj, Base);
	setProperty(Obj.prototype, Base.prototype);
	setProperty(Obj, Derived);
	setProperty(Obj.prototype, Derived.prototype);
	return Obj;
}

function setProperty(obj1, obj2) {
	for (var pro in obj2) {
		if (typeof(obj2[pro]) != 'function') {
			obj1[pro] = obj2[pro];
		} else {
			if (obj1.hasOwnProperty(pro)) {
				var tmp = obj1[pro];
				obj1[pro] = function() {
					tmp.apply(this, arguments);
					obj2[pro].apply(this, arguments);
				}
			} else {
				obj1[pro] = obj2[pro];
			}
		}
	}
}

Derived = extend(Base, Derived);

// 执行代码

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("----------------------我是分割线---------------------------");

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();