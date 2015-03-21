// In file extend.js
// Created by Junjie Li
// Last modified on 2015-3-21

;
var myextend = (function(window){
  function extend(base, derived){
    var Derived = function(){
      // 通过应用模式依次应用父类和子类的构造函数来继承，使得子类继承父类的实例成员
      // 实质是改变构造子的上下文从而使以下两个构造子不是构造一个新的对象而是构造本构造子所要构造的对象;
      base.apply(this, arguments);
      derived.apply(this, arguments);
    }
    // 帮助函数,用来判断子类中是否有与父类同名的函数,是则继承后先调用基类函数，在调用父类函数;
    function helper_inherate(to, from){
      var old;
      for (var key in from) {
        old = null;
        if (typeof from[key] === 'function') {
          if (typeof to[key] === 'function') {
            old = to[key];
          }
          to[key] = function(){
            if (!!old) {
              old.apply(this, arguments);
            }
            from[key].apply(this, arguments);
          }
        } else {
          to[key] = from[key];
        }
      }
      return to;
    }

    // 继承父类的静态成员
    helper_inherate(Derived, base);
    // 自己的静态成员
    helper_inherate(Derived, derived);
    // 继承父类的原型上的属性(实例方法)
    helper_inherate(Derived.prototype, base.prototype);
    // 自己原型上的属性((实例方法))
    helper_inherate(Derived.prototype, derived.prototype);
    return Derived;
  }

  // 父类构造子和实例变量
  function Base(instanceVariable){
    this.instanceVariable = instanceVariable;
  }
  // 父类实例方法
  Base.prototype.instanceMethod = function(){
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
  }
  // 父类静态变量
  Base.staticVariable = 'Base';
  // 父类静态方法
  Base.staticMethod = function(){
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
  }

  // 子类构造子和实例变量
  function Derived(instanceVariable){
    this.instanceVariable = instanceVariable;
  }
  // 子类实例方法
  Derived.prototype.instanceMethod = function(){
    console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
  }
  // 子类静态变量
  Derived.staticVariable = 'Derived';
  // 子类静态方法
  Derived.staticMethod = function(){
    console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
  }

  Derived = extend(Base, Derived);

  example = new Derived('example');
  Derived.staticMethod();
  example.instanceMethod();

}(window));