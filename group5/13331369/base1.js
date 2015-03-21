//Base is function object
function Base(value) {
	this.instanceVariable = value;
}

//function object Base add some property
Base.staticVariable = 'Base';
Base.staticMethod = function() {
		console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};
Base.instanceMethod = function() {
		console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
};

//Derived is function object
function Derived(value) {
	this.instanceVariable = value;
}


//function object Derived add some property
Derived.staticVariable = 'Derived';


//Derived inheritance the Base through the extend function
function extend(base, derived) {
	derived.staticMethod = function() {
		base.staticMethod.call(this);  //make this become the current object derived
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	};
	derived.prototype.instanceMethod = function() { //the _proto_ of instance point to the propotype
		base.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, static-variable is: " + this.instanceVariable);
	};
}

//Derived inheritance the Base through the extend function
extend(Base, Derived);

//some test
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

//test example
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();


