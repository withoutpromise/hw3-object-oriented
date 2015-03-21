function Base(x) {
    return {
        instanceVariable: x,
        instanceMethod: function() {
            console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
        }
    };
}
Base.staticVariable = 'Base';
Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

function extend(base, derived) {
    derived.prototype = new base();
    derived.prototype.instanceMethod = function() {
        base().instanceMethod.call(this);
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    };
    derived.staticMethod = function() {
        base.staticMethod.call(this);
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    };
}

function Derived(x) {
    this.instanceVariable = x;
    return this;
}

extend(Base, Derived);

Derived.staticVariable = 'Derived';


example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();