function extend(subClass,superClass){
    var F = function(){};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    subClass.superclass = superClass.prototype; //加多了个属性指向父类本身以便调用父类函数
    if(superClass.prototype.constructor == Object.prototype.constructor){
        superClass.prototype.constructor = superClass;
    }
}
var Base = function(instanceVariable) {
    this.staticVariable = 'Base';
    this.staticMethod = function() {
      console.log("This is from Base class static-method, static-variable is: " + staticVariable);
    }
    this.instanceVariable = instanceVariable;
    this.instanceMethod = function() {
      console.log("This is from Base class instance-method, static-variable is: " + instanceVariable);
    }
};
var Derived = function(instanceVariable) {
    this.staticVariable = 'Derived';
    this.staticMethod = function() {
      this.superclass.staticMethod();
      console.log("This is from Base class static-method, static-variable is: " + staticVariable);
    }
    this.instanceVariable = instanceVariable;
    this.instanceMethod = function() {
      this.superclass.instanceMethod();
      console.log("This is from Base class instance-method, static-variable is: " + instanceVariable);
    }
};
extend(Base, Derived);