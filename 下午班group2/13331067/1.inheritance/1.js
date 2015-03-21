// 参考资料：
// http://blog.csdn.net/shengxiaokui/article/details/8485335
// http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html
function Base(instanceVariable) {  // 设置实例变量
    this.instanceVariable = instanceVariable;
}

Base.staticVariable = 'Base';  // 设置类变量

Base.staticMethod = function() {  // 设置类方法
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

Base.prototype.instanceMethod = function() {  // 修改设置实例方法
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}

function Derived(instanceVariable) {
    this.instanceVariable = instanceVariable;
}

function extend(base, derived) {
    derived.staticVariable = 'Derived';
    derived.staticMethod = function() {
        base.staticMethod.apply(this);  // 先调用基类的类方法
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    }
    derived.prototype.instanceMethod = function() {
        base.prototype.instanceMethod.call(this, this.instanceVariable);  // 先调用基类的实例方法
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    }
}

extend(Base, Derived);  // 调用extend方法

// 第一题执行代码
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();
// 希望输出的结果
// This is from Base class static-method, static-variable is: Derived

// This is from Derived class static-method, static-variable is: Derived

// This is from Base class instance-method, instance-variable is: example

// This is from Derived class instance-method, instance-variable is: example

// ----------------------
//第二题执行代码
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
// 希望输出的结果
// This is from Base class static-method, static-variable is: Derived

// This is from Derived class static-method, static-variable is: Derived

// This is from Base class instance-method, instance-variable is: example

// This is from Derived class instance-method, instance-variable is: example

// This is from Base class instance-method, instance-variable is: other-example

// This is from Derived class instance-method, instance-variable is: other-example

