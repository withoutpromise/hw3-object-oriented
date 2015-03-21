var Base = (function() {
    var Base = function(instanceVariable) {
        this.instanceVariable = instanceVariable;
    }

    Base.prototype.instanceMethod = function() {
        console.log('This is from Base class instance-method, instance-variable is: ' + this.instanceVariable);
    }

    Base.staticVariable = 'Base';

    Base.staticMethod = function() {
        console.log('This is from Base class static-method, static-variable is: ' + this.staticVariable);
    }

    return Base;
})();

var extend = function(Base, Derived) {
    Derived.prototype.__proto__ = Base.prototype;
}

var Derived = (function() {
    var Derived = function(instanceVariable) {
        Base.call(this, instanceVariable);
    }

    extend(Base, Derived);

    Derived.prototype.instanceMethod = function() {
        this.__proto__.__proto__.instanceMethod.call(this);
        console.log('This is from Derived class instance-method, instance-variable is: ' + this.instanceVariable);
    }

    Derived.staticVariable = 'Derived';

    Derived.staticMethod = function() {
        this.prototype.__proto__.constructor.staticMethod.call(this);
        console.log('This is from Derived class static-method, static-variable is: ' + this.staticVariable);
    }

    return Derived;
})();

// test
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
