/********基类*****/

//基类静态属性
Base.staticVariab = "Base";

//基类静态方法
Base.staticMethod = function() {
	console.log("This is from Base class static-method,static-variable is:" + this.staticVariable);
}

//构造函数，初始化基类实例变量
function Base(arg) {
	this.instanceVariable = arg;
}

//基类实例方法
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method,instance-variable is: " + this.instanceVariable);
} 

/********子类*****/

//子类静态属性
Derived.staticVariable = "Derived";

//子类静态方法
Derived.staticMethod  = function() {
	console.log("This is from Derived class static-method,static-variable is: " + this.staticVariable);
}

//子类构造函数，初始化子类实例属性
function Derived(arg) {
	this.instanceVariable = arg;
}

//子类实例方法
Derived.prototype.instanceMethod = function(){
	console.log("This is from Derived class instance-method,instance-variable is: " + this.instanceVariable);
} 

/********继承*****/
function extend(base, derived) {
	//改写子类静态方法
	var old_sta = derived.staticMethod;
	derived.staticMethod = function() {
		base.staticMethod.call(this);
		old_sta.call(this);
	}
	//改写子类实例方法
	var old_ins = derived.prototype.instanceMethod;
	derived.prototype.instanceMethod = function() {
		base.prototype.instanceMethod.call(this);
		old_ins.call(this);
	}
	return derived;
}

Derived = extend(Base, Derived);
