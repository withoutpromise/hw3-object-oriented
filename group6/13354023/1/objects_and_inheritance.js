/*
 * Project: hw3
 *
 * File: objects_and_inheritance.js
 *
 * Author: Junhong Chen
 *
 * Created: 15/03/21
 *
 */

var Base = function(instanceVariable) {
  // Instance Property
  this.instanceVariable = instanceVariable;
  this.instanceMethod = function() {
    console.log('This is from Base class instance-method, instance-variable is: ' + this.instanceVariable);
  };
}
// Static Property
Base.staticVariable = 'Base';
Base.staticMethod = function() {
  return console.log('This is from Base class static-method, static-variable is: ' + this.staticVariable);
}

function extend(base, derived) {
  derived = function(instanceVariable) {
    // Instance Property
    this.instanceVariable = instanceVariable;
    this.instanceMethod = function() {
      this.__proto__.instanceVariable = instanceVariable;
      this.__proto__.instanceMethod();
      return console.log('This is from Derived class instance-method, instance-variable is: ' + this.instanceVariable);
    };
  };
  // Build Inheritance
  derived.prototype = new base();
  derived.prototype.constructor = derived;

  // Static Property
  derived.staticMethod = function() {
    this.prototype.__proto__.constructor.staticVariable = "Derived";
    this.prototype.__proto__.constructor.staticMethod();
    return console.log('This is from Derived class static-method, static-variable is: ' + derived.prototype.__proto__.constructor.staticVariable);
  };

  return derived;
}

var Derived = extend(Base, Derived);