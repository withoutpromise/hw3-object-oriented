function Base(variable)
{
    this.instanceVariable = variable;
    this.instanceMethod = function()
    {
        console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
    };
}

Base.staticVariable = "Base";

Base.staticMethod = function()
{
    console.log("This is from Base class static-method, static-variable is : " + this.staticVariable);
};

function Derived(variable)
{
    this.instanceVariable = variable;
    this.instanceMethod = function()
    {
    	this.__proto__.instanceMethod.call(this);
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    };
}

Derived.staticVariable = "Derived";

Derived.staticMethod = function()
{
    Derived.__proto__.staticMethod.call(this);
    console.log("This is from Derived class static-method, static-variable is : " + this.staticVariable);
};

function extend(base, derived)
{
    var in_pro = derived.prototype;
    derived.prototype = new base();
    derived.prototype.constructor = derived;
    for (var property_name in in_pro)
    {
        derived.prototype[property_name] = in_pro[property_name];
    }
    var sta_pro = derived.__proto__;
    derived.__proto__ = base;
    for (var property_name in sta_pro)
    {
        derived.__proto__[property_name] = sta_pro[property_name];
    }
}

extend(Base, Derived);

console.log("First Test: ");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("Second Test: ");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();