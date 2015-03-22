//function extend(Base, Derived) {
//    Derived.prototype = new Base();
//    Derived.prototype.superclass = Base;
//    Derived.staticMethod = function() {
//        Derived.prototype.superclass.staticMethod.call(this);
//        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
//    }
//    Derived.prototype.instanceMethod = function() {
 //       Derived.prototype.superclass.prototype.instanceMethod.call(this);
//        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
//    }
//}

function extend_sm(base, derived) {
    Base.staticVariable = 'Derived';
    Base.staticMethod();
}

function extend_im(iv) {
    var d = new Base(iv);
    d.instanceMethod();
}

var Base = function(name) {
    var instanceVariable = name;
    this.instanceMethod = function() {
        return console.log("This is from Base class instance-method, static-variable is: " + instanceVariable);
    }
}

Base.staticVariable = 'Base';

Base.staticMethod = function() {
    return console.log("This is from Base class static-method, static-variable is: " + Base.staticVariable);
}

var Derived = function (name) {
    var instanceVariable = name;
    this.instanceMethod = function() {
        extend_im(instanceVariable);
        //extend(Base, Derived);
        return console.log("This is from Derived class static-method, static-variable is: " + instanceVariable);
    }   
}

Derived.staticVariable = 'Derived';

Derived.staticMethod = function() {
    extend_sm(Base, Derived);
    //extend(Base, Derived);
    return console.log("This is from Derived class static-method, static-variable is: " + Derived.staticVariable);
}

//extend(Base, Derived);

example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();