function Base(val) {
  this.instanceVariable = val;
}

function Derived(val) {
  this.instanceVariable = val;
}

Base.staticVariable = 'Base';
Derived.staticVariable = 'Derived';

Base.prototype.instanceMethod = function() {
  console.log('This is from Base class instance-method, instance-variable is:' + this.instanceVariable);
}

Base.staticMethod = function() {
  console.log('This is from Base class static-method, static-variable is:' + this.staticVariable);
}

function extend(Base, Derived) {
  Derived.staticMethod = function() {
    Base.staticMethod.apply(this);
    console.log('This is from Derived class static-method, static-variable is:' + this.staticVariable);
  }
  Derived.prototype.instanceMethod = function() {
    Base.prototype.instanceMethod.apply(this);
    console.log('This is from Derived class instance-method, instance-variable is:' + this.instanceVariable);
  }

}

extend(Base, Derived);

console.log('(1)');
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log('(2)');
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();