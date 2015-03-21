/*
 * how to run: node inheritance.js
 */

var Base = function(instanceVariable) {
    this.instanceVariable = instanceVariable;
};

Base.staticVariable = 'Base';

Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

Base.prototype = {
    instanceMethod: function() {
        console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
    }
};

var extend = function(base, derived) {
    Derived = function(instanceVariable) {
        this.instanceVariable = instanceVariable;
    };
    Derived.staticVariable = 'Derived';
    Derived.staticMethod = function() {
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    };
    Derived.prototype = {
        instanceMethod: function() {
            console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
        }
    };
    combineFunction(Derived.prototype, base.prototype);
    combineFunction(Derived, base);
    derived = Derived;
};

var combineFunction = function(derived, base) {
    for (var key in base) {
        if (typeof(base[key]) === 'function' && typeof(derived[key]) === 'function') {
            var derivedFn = derived[key];
            derived[key] = function() {
                base[key].apply(this, arguments);
                derivedFn.apply(this, arguments);
            }
        }
    }
};

var Derived;
extend(Base, Derived);

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log('=========================================');

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();

