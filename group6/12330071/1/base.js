var Base = function (variable) {
  this.instanceVariable = variable;
  this.name = 'haha';
  this.instanceMethod = function () {
    console.log('This is from Base class instance-method, static-variable is: ' + this.instanceVariable);
  };
};
Base.staticVariable = 'Base';
Base.staticMethod = function () {
  console.log('This is from Base class static-method, static-variable is: ' + this.staticVariable);
};

var extend = function (base, derived) {
  derived = function (variable) {
    this.instanceVariable = variable;
    this.instanceMethod = function () {
      derived.prototype.instanceMethod.call(this);
      console.log('This is from Derived class instance-method, instance-variable is: ' + this.instanceVariable);
    };
  };
  derived.prototype = new base();
  derived.staticVariable = 'Derived';
  derived.staticMethod = function () {
    this.prototype.constructor.staticMethod.call(this);
    console.log('This is from Derived class static-method, static-variable is: ' + this.staticVariable);
  };
  return derived;
}

// var base = new Base();
// base.constructor.staticMethod();

var Derived;
Derived = extend(Base, Derived);

var example = new Derived('example');
var otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
