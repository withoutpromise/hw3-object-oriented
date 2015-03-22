function Base(item){
	var instanceVariable = item;
	this.instanceMethod = function(){
		console.log("This is from Base class instance-method, static-variable is: " + instanceVariable);
	}
}
Base.staticVariable = 'Base';
Base.staticMethod = function(){
	console.log('This is from Base class static-method, static-variable is:' + this.staticVariable);
}


function Derived(item){
	this.Base = new Base(item);
	var instanceVariable = item;
	this.instanceMethod = function(){
		//Base.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, static-variable is: " + instanceVariable);
	}
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function(){
	Base.staticMethod();
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}


example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
