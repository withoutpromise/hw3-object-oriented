;(function() {
    var Base = function(instanceVariable) {
    	this.instanceVariable = instanceVariable;
    }
    Base.staticVariable = 'Base';
    Base.staticMethod = function() {
    	console.log('This is from Base class static-method, static-variable is: ' + this.staticVariable);
    }
    Base.prototype.instanceMethod = function() {
    	console.log('This is from Base class instance-method, static-variable is: ' + this.instanceVariable);
    }
    var Derived = function(instanceVariable) {
    	this.instanceVariable = instanceVariable;
    }
    Derived.staticVariable = 'Derived';
    Derived.staticMethod = function() {
    	console.log('This is from Derived class static-method, static-variable is: ' + this.staticVariable);
    }
    Derived.prototype.instanceMethod = function() {
    	console.log('This is from Derived class instance-method, static-variable is: ' + this.instanceVariable);
    }

    var toinherit = (function() {
    	var mix = function(amethod, bmethod) {
            return function() {
            	amethod.call(this);
            	bmethod.call(this);
            };
    	};
    	var extend = function(empty, add) {
            for (var prpt in add) {
                if (!!empty[prpt] && typeof(empty[prpt]) === 'function' && typeof(add[prpt]) === 'function') {
                    empty[prpt] = mix(empty[prpt], add[prpt]);
                } else {
                	empty[prpt] = add[prpt];
                }
            }
    	};
    	return {
            toextend: function(superclass, subclass) {
                var newsub = function(inst) {
                    superclass.call(this, inst);
                    subclass.call(this, inst);
                };
                extend(newsub, superclass);
                extend(newsub, subclass);
                extend(newsub.prototype, superclass.prototype);
                extend(newsub.prototype, subclass.prototype);
                return newsub;
            }
    	};
    }());
    Derived = toinherit.toextend(Base, Derived);

}());