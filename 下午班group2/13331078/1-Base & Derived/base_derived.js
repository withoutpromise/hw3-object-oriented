/* console执行 */
//Base
function Base(instanceVariable){   //实例构造函数
    this.instanceVariable = instanceVariable;
}
Base.prototype.instanceMethod = function(){  //实例函数
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}
Base.staticVariable = 'Base';    //静态变量
Base.staticMethod = function(){  //静态方法
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

function Derived(instanceVariable){    //实例构造函数
    this.instanceVariable = instanceVariable;
}

function extend(base, derived){
    derived.staticVariable = 'Derived';
    derived.staticMethod = function(){
        base.staticMethod.apply(this);
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    }
    derived.prototype.instanceMethod = function(){
        base.prototype.instanceMethod.call(this, [this.instanceVariable]);
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    }
}

extend(Base, Derived);

//测试1
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

//测试2
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();