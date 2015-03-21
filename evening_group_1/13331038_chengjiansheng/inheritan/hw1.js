/*
 * @brief to make object deriveded
 * @author kin_sang

 * thakns for your instruction
 */
var Base = function(instanceVariable) {
    this.instanceVariable = instanceVariable;
}
Base.staticVariable = 'Base';
Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};
Base.prototype.instanceMethod = function(){
    console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
};


var Derived = function(instanceVariable) {
    this.instanceVariable = instanceVariable;
}
Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
    console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
};
Derived.prototype.instanceMethod = function(){
    console.log("This is from Derived class instance-method, static-variable is: " + this.instanceVariable);
};

var combine = function(srcObj, tarObj) {
    for (var proto in srcObj) {
        if (typeof(srcObj[proto]) != 'function') {
            tarObj[proto] = srcObj[proto];
        } else{
            if (tarObj.hasOwnProperty(proto)) {
                var origin = tarObj[proto];
                tarObj[proto] = (function(){
                    var memo = origin;
                    var proto2 = proto;
                    function tmp() {
                        memo.apply(this, arguments);
                        srcObj[proto2].apply(this, arguments);
                    };
                    return tmp;
                })();
            } else {
                tarObj[proto] = srcObj[proto];
            }
        }
    }
};

function extend(base, derived) {
    var Obj = function(insVal) {
        base.call(this, insVal);
        derived.call(this, insVal);
    }
    combine(base, Obj);
    combine(base.prototype, Obj.prototype);
    combine(derived, Obj);
    combine(derived.prototype, Obj.prototype);
    
    return Obj;
};

Derived = extend(Base, Derived);

// Debug
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

console.log('------------------------------------------');
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();


// Here is the version one, which witness my improvement!
/*function extend(base, derived) {
    var Obj = function(insVal) {
        base.call(this, insVal);
        derived.call(this, insVal);
    }
    for (var proto in base) {
        if (typeof(base[proto]) != 'function') {
            Obj[proto] = base[proto];
        } else {
            if (Obj.hasOwnProperty(proto)) {
                var oriFun = Obj[proto];
                Obj[proto] = function() {
                    oriFun.apply(this, arguments);
                    base[proto].apply(this, arguments);
                };
            } else {
                Obj[proto] = base[proto];
            }
        }
    }

    for (var proto3 in base.prototype) {
        if (typeof(base.prototype[proto3]) != 'function') {
            Obj.prototype[proto3] = base.prototype[proto3];
        } else {
            if (Obj.prototype.hasOwnProperty(proto3)) {
                var oriFun3 = Obj.prototype[proto3];
                Obj.prototype[proto3] = function() {
                    oriFun3.apply(this, arguments);
                    base.prototype[proto3].apply(this, arguments);
                };
            } else {
                Obj.prototype[proto3] = base.prototype[proto3];
            }
        }
    }

    for (var proto2 in derived) {

       if (typeof(derived[proto2]) != 'function') {
            Obj[proto2] = derived[proto2];
        } else {
            if (Obj.hasOwnProperty(proto2)) {
                var oriFun2 = Obj[proto2];
                Obj[proto2] = function() {
                    oriFun2.apply(this, arguments);
                    derived[proto2].apply(this, arguments);
                };
            } else {
                Obj[proto2] = derived[proto2];
            }
        }
    }

    for (var proto1 in derived.prototype) {
        if (typeof(derived.prototype[proto1]) != 'function') {
            Obj.prototype[proto1] = derived.prototype[proto1];
        } else {
            if (Obj.prototype.hasOwnProperty(proto1)) {
                var oriFun1 = Obj.prototype[proto1];
                Obj.prototype[proto1] = function() {
                    oriFun1.apply(this, arguments);
                    derived.prototype[proto1].apply(this, arguments);
                };
            } else {
                Obj.prototype[proto1] = derived.prototype[proto1];
            }
        }
    }
    return Obj;
}*/
