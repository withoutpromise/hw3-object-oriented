//参考了老师之前的答案

function Base(instanceVariable){
  this.instanceVariable = instanceVariable;
}
Base.staticVariable = 'Base'
Base.staticMethod = function(){
  console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

Base.prototype.instanceMethod = function(){
  console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
} 

function Derived(instanceVariable){
  this.instanceVariable = instanceVariable;
}
Derived.staticVariable = 'Derived'
Derived.staticMethod = function(){
  console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

Derived.prototype.instanceMethod = function(){
  console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
} 

function extend(base, derived){
  var Derived = function() {   //用于储存base以及derived中的实例成员变量
    var baseInstance = base.apply(this, arguments);
    var derivedInstance = derived.apply(this, arguments);
  }
  addProperty(Derived, base);   //将base和derived的静态方法与成员变量添加到Derived中
  addProperty(Derived, derived);
  addProperty(Derived.prototype, base.prototype);   //将动态方法添加到Derived中
  addProperty(Derived.prototype, derived.prototype);
  return Derived;
}


function addProperty(ori, src){
  for (var index in src) {
    if (typeof src[index] === 'function') {   //遍历src，找到其中的成员方法
      if (typeof ori[index] === 'function')
        var oldFn = ori[index];
      ori[index] = function(){   //复写ori中的成员方法
        if (!!oldFn) oldFn.apply(this, arguments);   //若原本已有成员方法，则先执行原有方法，再执行继承的方法
        src[index].apply(this, arguments);
      }
    } else {
      ori[index] = src[index];   //继承原有静态成员变量
    }
  }
}

Derived = extend(Base, Derived);
