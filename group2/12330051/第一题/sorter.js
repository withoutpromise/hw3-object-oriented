var Base = function() {
  this.instanceVariable = arguments[0];
}

Base.staticVariable = 'Base';

Base.staticMethod = function() {
  document.write("This is from Base class static-method, static-variable is: " + this.staticVariable + "<br>");
}

Base.prototype.instanceMethod = function() {
    document.write("This is from Base class instance-method, static-variable is: " + this.instanceVariable + "<br>");
}


var Derived = function() {
  this.instanceVariable = arguments[0];
 }
   

Derived.staticVariable = 'Derived';

Derived.staticMethod = function() {
  Base.staticMethod();
  document.write("This is from Derived class static-method, static-variable is: " + this.staticVariable + "<br>");
}


function extend(base, derived) {
  derived.staticMethod = function() {
        base.staticMethod.call(this);
        document.write("This is from Derived class static-method, static-variable is: " + this.staticVariable + "<br>");
    };

    derived.prototype.instanceMethod = function() {
        base.prototype.instanceMethod.call(this);
        document.write("This is from Derived class static-method, static-variable is: " + this.instanceVariable + "<br>");
    }
}

function test() {
  extend(Base,Derived);
  example = new Derived('example');
 Derived.staticMethod();
 example.instanceMethod();
 
 example1 = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example1.instanceMethod();
otherExample.instanceMethod();
}