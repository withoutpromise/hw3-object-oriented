//In file filter.js
//Created by Junjie Li, 2014-11-2
//Last modified by Junjie Li, 2014-11-2

// 题目
// 1、有类变量和类方法的继承
// 撰写基类Base

// 有类变量：staticVariable = 'Base'
// 有类方法：staticMethod 运行时输出："This is from Base class static-method, static-variable is: " + staticVariable
// 有实例变量：instanceVariable，通过constructor初始化
// 有实例方法：instanceMethod，运行时输出："This is from Base class instance-method, static-variable is: " + instanceVariable
// 撰写继承方法function extend(base, derived)，通过此方法得到派生类Derived

// 有类变量：staticVariable = 'Derived'
// 有类方法：staticMethod ，运行时，先调用Base的staticMethod，然后输出："This is from Derived class static-method, static-variable is: " + staticVariable
// 有实例变量：instanceVariable，通过constructor初始化
// 有实例方法：instanceMethod，运行时，先调用Base的instanceMethod，然后输出：输出："This is from Derived class instance-method, static-variable is: " + instanceVariable
// 要求：
// 有了Base和Derived之后：

// 1）执行如下代码：

// example = new Derived('example');
// Derived.staticMethod();
// example.instanceMethod();

// 结果形如：

// This is from Base class static-method, static-variable is: Derived

// This is from Derived class static-method, static-variable is: Derived

// This is from Base class static-method, static-variable is: Derived

// This is from Derived class static-method, static-variable is: Derived

// This is from Base class instance-method, instance-variable is: example

// This is from Derived class instance-method, instance-variable is: example

 

// 2）执行如下代码

// example = new Derived('example');
// otherExample = new Derived('other-example');
// example.instanceMethod();
// otherExample.instanceMethod();

// 结果形如：

// This is from Base class static-method, static-variable is: Derived

// This is from Derived class static-method, static-variable is: Derived

// This is from Base class instance-method, instance-variable is: example

// This is from Derived class instance-method, instance-variable is: example

// This is from Base class static-method, static-variable is: Derived

// This is from Derived class static-method, static-variable is: Derived

// This is from Base class instance-method, instance-variable is: other-example

// This is from Derived class instance-method, instance-variable is: other-example

 

// 3）动态extend，Derived的staticMethod和instanceMethod中不能直接调用Base的方法，而是通过extend方法来实现。

// 2、filterable-table
// 仿照Homewrok 02. Table Sorter，设计Filterable Table。Homewrok 02. Table Sorter 中的table，应用makeAllTablesFilterable之后，每个table附加一个输入域，用户输入字符之后，table中不包含这些字符的rows将消失，仅剩下含有相应字符的rows，并且相应字符会突出显示。

// 3、sortable 和 filterable

// 编写方法function makeSortable (table-dom)，其参数和返回值为均为一个table DOM元素，返回时 the table is sortable
// 编写方法function makeFilterable (table-dom)，其参数和返回值为均为一个table DOM元素，返回时 the table is Filterable
// 让上述方法可以嵌套使用 makeSortable(makeFilterable(table))，或者makeFilterable(makeSortable(table))都将得到既能够排序又能够过滤的表格
// 在Homewrok 02. Table Sorter 给的table上，验证上述结果


// 寄生构造函数
var object = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
}


// 寄生组合继承
function extent(base, derived) {
	var prototype = object(base.prototype);
	prototype.constructor = derived;
	prototype.superClass = base.prototype;
	prototype.instanceMethod = function() {
		prototype.superClass.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
	derived.prototype = prototype;
}


// 基类构造函数和实例变量
function Base(instanceVariable) {
		this.instanceVariable = instanceVariable;
}

// 基类实例方法
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

// 基类静态变量
Base.staticVariable = 'Base';
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

function Derived(instanceVariable) {
	Base.call(this, instanceVariable);
	this.instanceVariable = instanceVariable;
}


extent(Base, Derived);

Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	this.prototype.superClass.constructor.staticMethod.call(this);
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
};
