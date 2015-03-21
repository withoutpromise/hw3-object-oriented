
//基类Base
function Base(instanceVariable) {
    this.instanceVariable = instanceVariable;
}

Base.prototype.instanceMethod = function() {
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

Base.staticVariable = 'Base';

Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};


//派生类Derived
function Derived(instanceVariable) {
    this.instanceVariable = instanceVariable;
}

Derived.prototype.instanceMethod = function() {
    console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
};

Derived.staticVariable = 'Derived';

Derived.staticMethod = function() {
    console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
};

//继承方法extend
//动态extend，Derived的staticMethod和instanceMethod中不直接调用Base的方法
function extend(base, derived) {
    var tmp = new base();
    tmp.prototype = base.prototype;
    tmp.constructor = derived;

    tmp.instanceMethod = function() {
        this.prototype.instanceMethod.apply(this);
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    };

    tmp.constructor.staticMethod = function() {
        tmp.prototype.constructor.staticMethod.apply(this);
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
};

    derived.prototype = tmp;
}

extend(Base, Derived);


// 1）执行如下代码：
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

// 2）执行如下代码

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();