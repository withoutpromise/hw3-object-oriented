/*
姓名：叶炽凯
学号：13331313
备注：我的输出与参考不同，可能是我没有理解好继承的机制。会在之后更新。
*/

function Base(insV) {
    Base.staticVariable = 'Base';
    Base.staticMethod = function() {
        console.log("This is from Base class static-method, static-variable is: " + Base.staticVariable);
    }
    this.instanceVariable = insV;
    this.instanceMethod = function() {
        console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
    }
}

function Derived(insV) {
    this.instanceVariable = insV;
    extend(Base, this);         //（1）因为Base对象需要接收参数，得出extend是在Derived的constructor里面
    Derived.staticVariable = 'Derived';
    Derived.staticMethod = function() {
        Base.staticMethod();    //（2）这里不能写成“Derived.prototype”,因为extend是将Base类作为Derived对象的父类，因此Derived.prototype != Base
        console.log("This is from Derived class static-method, static-variable is: " + Derived.staticVariable);
    }
    this.instanceMethod = function() {
        this.prototype.instanceMethod();    //(3)基于备注（2），这里是可实现的
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    }
}

function extend(base, derived) {
    derived.prototype = new base(derived.instanceVariable);
}

/*第一个样例输出,及解释*/
/***********************************************************/
/*
input:
    example = new Derived('example');
    Derived.staticMethod();
    example.instanceMethod();
standard-output:
    This is from Base class static-method, static-variable is: Derived
    This is from Derived class static-method, static-variable is: Derived
    This is from Base class instance-method, instance-variable is: example
    This is from Derived class instance-method, instance-variable is: example
    
standard-output:
    This is from Base class static-method, static-variable is: Base   //基于备注（2），Base类的staticVariable并不会因Derived对象的staticVariable改变而改变
    This is from Derived class static-method, static-variable is: Derived
    This is from Base class instance-method, instance-variable is: example
    This is from Derived class instance-method, instance-variable is: example
*/
