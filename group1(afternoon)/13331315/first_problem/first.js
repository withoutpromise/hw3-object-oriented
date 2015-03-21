//到现在还是搞不清楚
function Base(InstanceVariable)
{
    this.instanceVariable = InstanceVariable;
}
Base.prototype.instanceMethod = function()
    {
        console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
    };

Base.staticVariable = "Base";

Base.staticMethod = function()
{
    console.log("This is from Base class static-method, static-variable is : " + this.staticVariable);
};

function Derived(InstanceVariable)
{
    this.instanceVariable = InstanceVariable;
    this.instanceMethod = function()
    {
    	this.__proto__.instanceMethod.call(this);//to use the Base function.
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    };
}

Derived.staticVariable = "Derived";

Derived.staticMethod = function()
{
    Derived.__proto__.staticMethod.call(this);//类继承
    console.log("This is from Derived class static-method, static-variable is : " + this.staticVariable);
};

function extend(base, derived)
{
    derived.prototype = new base();
    derived.__proto__ = base;
    //但好像变成了克隆而不是继承写法了,直接扒下了base的类方法
}

extend(Base, Derived);

console.log("First--------------------------");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("Second-------------------------");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();