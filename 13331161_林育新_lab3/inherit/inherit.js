;(function() {
	//Base
	var Base = function(variable) {
		this.instanceVariable = variable;
	}

	Base.prototype.instanceMethod = function() {
		document.write("This is from Base class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
	}

	Base.staticVariable = "Base";

	Base.staticMethod = function() {
		document.write("This is from Base class staic-method, static-variable is: " + this.staticVariable + "<br>");
	}

	//Derived
	var Derived = function(variable) {
		this.instanceVariable = variable;
	}

	Derived.prototype.instanceMethod = function() {
		document.write("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable + "<br>");
	}

	Derived.staticVariable = "Derived";

	Derived.staticMethod = function() {
		document.write("This is from Derived class staic-method, static-variable is: " + this.staticVariable + "<br>");
	}

	var Inherit = (function() {

		// inheritMethod，实现先调用基类方法，再调用子类方法
		var inheritMethod = function(originalMethod, addMethod) {
			return function() {
				originalMethod.call(this);
				addMethod.call(this);
			}
		};

		// inheritProp，将add的属性添加至origin当中
		var inheritProp = function(origin, add) {
			for (var i in add) {
				if (!!origin[i] &&
					typeof(origin[i]) === 'function' &&
					typeof(add[i]) === 'function') {

					var originalFunc = origin[i];
					origin[i] = inheritMethod(originalFunc, add[i]);
				} else {
					origin[i] = add[i];
				}
			}
		};

		return {
			extend: function(superClass, subClass) {
				var newSubClass = function(variable) {
					superClass.call(this, variable);
					subClass.call(this, variable);
				};

				inheritProp(newSubClass, superClass);
				inheritProp(newSubClass, subClass);
				inheritProp(newSubClass.prototype, superClass.prototype);
				inheritProp(newSubClass.prototype, subClass.prototype);
				return newSubClass;
			}
		};
	}());

	Derived = Inherit.extend(Base, Derived);

	var example = new Derived('example');
	Derived.staticMethod();
	example.instanceMethod();

	document.write("<br>");

	var example = new Derived('example');
	var otherExample = new Derived('other-example');
	Derived.staticMethod();
	example.instanceMethod();
	otherExample.instanceMethod();

}());
