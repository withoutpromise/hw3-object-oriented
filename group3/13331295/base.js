function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function extent(base, derived) {
    var prototype = object(base.prototype);
    prototype.constructor = derived;
    prototype.superClass = base.prototype;
    prototype.instanceMethod = function() {
        prototype.superClass.instanceMethod.call(this);
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    }
    derived.prototype = prototype;
}

Base.staticVariable = 'Base';
function Base(instanceVariable) {
    this.instanceVariable = instanceVariable;
}

Base.staticMethod = function(staticVariable) {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};
Base.prototype.instanceMethod = function() {
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

extent(Base,Derived);
function Derived(instanceVariable) {
    Base.call(this, instanceVariable);
    this.instanceVariable = instanceVariable;
}

Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
    this.prototype.superClass.constructor.staticMethod.call(this);
    console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
};