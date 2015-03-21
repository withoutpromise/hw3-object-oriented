var Base = function(id) {
    this.instanceVariable = id;
}

Base.staticVariable = "Base";

Base.staticMethod = function() {
    return state("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

Base.prototype.instanceMethod = function() {
    return state("This is from Base class instant-method, static-variable is: " + this.instanceVariable);
}

var Derived = function(id) {
    this.instanceVariable = id;
}

//Derived.prototype = new Base();

Derived.staticVariable = "Derived";

function extend(base, derived) {
    derived.staticMethod = function() {
        msg = base.staticMethod.apply(this);
        alert(msg.replace(/Base/, "Derived"));
    }

    derived.prototype.instanceMethod = function() {
        msg = base.prototype.instanceMethod.apply(this);
        alert(msg.replace(/Base/, "Derived"));    
    }
    return derived;
}

extend(Base, Derived);

// Alert
function state(msg) {
    alert(msg);
    return msg;
}

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();