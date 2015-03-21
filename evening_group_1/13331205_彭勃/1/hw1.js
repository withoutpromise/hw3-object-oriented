var base = function (X) {
    this.instanceVariable = X;
    this.instanceMethod = function () {
        console.log('This is from Base Class instance-method, static-variable is: ' + this.instanceVariable);
    }
}
base.staticVariable = 'Base';
base.staticMethod = function () {
    console.log('This is from Base class static-method, static-variable is: ' + this.staticVariable);
}

var extend = function (base, derived) {
    derived.prototype = new base();
    derived.__proto__ = base;
}

Derived = function (X) {
    this.instanceVariable = X;
    this.instanceMethod = function () {
        this.__proto__.instanceMethod.call(this);
        console.log('This is from Derived class instance-method, instance-variable is: ' + this.instanceVariable);
    }
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function () {
    this.__proto__.staticMethod.call(this);
    console.log('This is from Derived class static-method, static-variable is: ' + this.staticVariable);
}


var main = function () {
    extend(base, Derived);
    // 1)
    example = new Derived('example');
    Derived.staticMethod();
    example.instanceMethod();
    // 2)
    example = new Derived('example');
    otherExample = new Derived('other-example');
    Derived.staticMethod();
    example.instanceMethod();
    otherExample.instanceMethod();

}

window.onload = main();