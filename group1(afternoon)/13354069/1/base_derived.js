function extend(base, derived) {
    var instance_propertys = derived.prototype;
    derived.prototype = new base();
    for (var property_name in instance_propertys) {
        derived.prototype[property_name] = instance_propertys[property_name];
    }

    var static_propertys = derived.__proto__; 
    derived.__proto__ = base; // base <---__proto__--- derived  
    for (var property_name in static_propertys) {
        derived.__proto__[property_name] = static_propertys[property_name];
    }
}


/*********** Base *************/
var Base = function(variable) {
    this.instanceVariable = variable;
    this.instanceMethod = function() {
        console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
    };
};

Base.staticVariable = "Base";
Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is : " + this.staticVariable);
};


/*********** Derived ************/
var Derived = function(variable) {
    this.instanceVariable = variable;
    this.instanceMethod = function() {
    	this.__proto__.instanceMethod.call(this); 
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    };
};

Derived.staticVariable = "Derived";
Derived.staticMethod = function() {
    Derived.__proto__.staticMethod.call(this);
    console.log("This is from Derived class static-method, static-variable is : " + this.staticVariable);
};


/************ Running *************/
extend(Base, Derived);

console.log("********** First *********");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log("********* Second *********");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();