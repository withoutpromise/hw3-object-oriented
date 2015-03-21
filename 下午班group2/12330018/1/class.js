window.onload = function(){
	extend(Base,Derived);

	example = new Derived('example');
	Derived.staticMethod();
	example.instanceMethod();

    console.log("----------------------------------------")
	example = new Derived('example');
	otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();
}


function Base(arg){
	this.instanceVariable = arg;
}
Base.instanceMethod = function(){
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}
Base.staticVariable = "Base";
Base.prototype.staticMethod = function(){
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

function Derived(arg){
	this.instanceVariable = arg;
}


function extend(base,derived){
	derived.staticVariable = "Derived";
	derived.staticMethod = function(){
		base.prototype.staticMethod.apply(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	}
	derived.prototype.instanceMethod = function(){
		base.instanceMethod.apply(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
}

