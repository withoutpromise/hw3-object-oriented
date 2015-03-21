var txt = "";
var Base = function(instanceVariable){
    this.instanceVariable=instanceVariable,
    this.instanceMethod=function(){
        txt += "This is from Base class instance-method, static-variable is: " + this.instanceVariable + "\n";
    }
}
Base.staticVariable = "Base";
Base.staticMethod=function(){
        txt += "This is from Base class static-method, static-variable is: " + this.staticVariable + "\n";
}
var Derived=extend(Base,Derived);
function extend(base,derived){
    derived = function(variable){
        this.instanceVariable = variable;
        this.instanceMethod=function(){
            derived.prototype.instanceMethod.call(this);
            txt += "This is from Derived class instance-method, static-variable is: " + this.instanceVariable + "\n";
        }
    }
    derived.staticVariable = "Derived";
    derived.staticMethod=function(){
        base.staticMethod.call(this);
            txt += "This is from Derived class static-method, static-variable is: " + this.staticVariable + "\n";
    }
    derived.prototype = new base();
    derived.prototype.construct = derived;
    return derived;
}
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
console.log(txt)