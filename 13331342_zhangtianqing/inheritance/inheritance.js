var Base = function(instanceVariable) {
    this.instanceVariable = instanceVariable;
};

Base.staticVariable = 'Base';

Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

Base.prototype.instanceMethod = function() {
        console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

Derived = function(instanceVariable) {
        this.instanceVariable = instanceVariable;
};

var extend = function(base, derived) {
    Derived.staticVariable = 'Derived';
    Derived.staticMethod = function() {
        base.staticMethod.call(this);
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    };
    Derived.prototype.instanceMethod = function() {
            base.prototype.instanceMethod.call(this);
            console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
        }
    derived = Derived;
};


var Derived;
extend(Base, Derived);

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();
console.log("                                       ");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();

