/**
 * Created by Kira on 3/18/15.
 */

var Derived = function(obj) {
    this.instanceVariable = obj;
    this.instanceMethod = function() {
        console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
        extend(this.constructor, this);
    }
};
Derived.staticVariable = "Base";
Derived.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
    extend(this, this.prototype);
}


function extend(base, derived) {
    if (derived.instanceVariable) {
        console.log("This is from Derived class instance-method, instance-variable is: " + derived.instanceVariable);
    } else if (base.staticVariable) {
        console.log("This is from Derived class static-method, static-variable is: " + base.staticVariable);
    }
}

var example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("\n\n\n\n")

example = new Derived('example');
var otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
