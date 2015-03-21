var Base = function(temp) {
    this.instanceVariable = temp;
}
Base.prototype.instanceMethod = function() {
     console("This is from Base class instance-method, instance-variable is"+this.instanceVariable);
}
Base.staticVariable ='Base';
Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is:"+this.staticVariable);
}
var Derived = function(temp) {
    this.instanceVariable = temp;
}
Derived.staticVariable='Derived';
Derived.staticMethod=function() {
    console.log("This is from Derived class static-method, staticVariable is"+ this.staticVariable);
}
Derived.prototype.instanceMethod=function() {
    console.log("This is from Derived class instanceMethod, instanceVariable is"+ this.instanceVariable); 
}
function extend(base, derived) {
    var proto = base.prototype;
    var derived_protope = derived.prototype;
    var BASE = base;
    var DERIVED = derived;
    derived.instanceMethod = function(){
        base.instanceMethod().call(this);
        DERIVED.instanceMethod();
    }
}
window.onload = function() {
	extend(Base, Derived);
	example = new Derived('example');
    Derived.staticMethod();
    example.instanceMethod();
}