function Base(instance_var) {
    this.instanceVariable = instance_var;
}

Base.staticVariable = 'Base';

Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

Base.prototype.instanceMethod = function() {
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}

function Derived(instance_var) {
    this.instanceVariable = instance_var;
}

Derived.staticVariable = 'Derived';

Derived.staticMethod = function() {
    console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

Derived.prototype.instanceMethod = function() {
    console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable)
}

function extend(base, derived) {
    var bp = base.prototype;
    var dp = derived.prototype;
    for (var i in bp) {
        if (typeof(bp[i]) === "function" && typeof(dp[i]) === "function") {
            var temp = dp[i];
            dp[i] = link(bp[i], temp);
        }
    }
    var b = base;
    var d = derived;
    for (var i in b) {
        if (typeof(b[i]) === "function" && typeof(d[i]) === "function") {
            var temp = d[i];
            d[i] = link(b[i], temp);
        }
    }
}

function link(a, b) {
    return function() {
        a.call(this);
        b.call(this);
    }
}

extend(Base, Derived);

console.log("------------------test1---------------");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("------------------test2---------------");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
