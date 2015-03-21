var Base = function(variable) {
    this.instanceVariable = variable;
    this.instanceMethod = function() {
        console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
    };
};

Base.staticVariable = "Base";

Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is : " + this.staticVariable);
};

var Derived = function(variable) {
    this.instanceVariable = variable;
    this.instanceMethod = function() {
    this.__proto__.instanceMethod.call(this);//调用Base的instanceMethod
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    };
};

Derived.staticVariable = "Derived";

Derived.staticMethod = function() {
    Derived.__proto__.staticMethod.call(this);//调用Base的staticMethod
    console.log("This is from Derived class static-method, static-variable is : " + this.staticVariable);
};

function extend(base, derived) {
    var instance_propertys = derived.prototype;//暂存原来prototype中的数据和函数
    derived.prototype = new base();
    derived.prototype.constructor = derived;//上一句操作使得constructor已经改变，需要重新指回
    for (var property_name in instance_propertys) {//增添上原来prototype中的数据和函数
        derived.prototype[property_name] = instance_propertys[property_name];
    }
    var static_propertys = derived.__proto__; //暂存原来__proto__中的数据和函数
    derived.__proto__ = base;
    for (var property_name in static_propertys) {//增添上原来__proto__中的数据和函数
        derived.__proto__[property_name] = static_propertys[property_name];
    }
}

extend(Base, Derived);

// first test
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

//second test
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();