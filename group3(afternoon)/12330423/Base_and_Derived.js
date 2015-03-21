// 定义基类Base
var Base = function (x) {
    // 定义Base的实例变量
    this.instanceVariable = x;
    this.instanceMethod = function () {
        console.log("This is from Base class instance-method, instance-variable is: "
            + this.instanceVariable);
    };
}
// 定义Base的类变量
Base.staticVariable = 'Base';
Base.staticMethod = function () {
    console.log( "This is from Base class static-method, static-variable is: " + this.staticVariable);
}

// 定义Derived类
var staticVariable = 'Derived';
var Derived = function (x) {
    this.instanceVariable = x;
    this.instanceMethod = function() {
        (new Base(x)).instanceMethod();
        console.log("This is from Derived class instance-method, instance-variable is: "
            + this.instanceVariable);
    }
    extend(new Base(x), this);
}

// Derived类扩展Base类
function extend(base, derived) {
    var staticFunc = base.__proto__.constructor.staticMethod;
    Derived.staticVariable = 'Derived';
    Derived.staticMethod = function () {
        staticFunc();
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    }
}

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();