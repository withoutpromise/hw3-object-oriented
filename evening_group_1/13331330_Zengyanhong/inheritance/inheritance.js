// homework3-(1)

document.writeln("-------------------test 1---------------------"+"<br>");

//定义Base的实例变量，实例方法，类变量，类方法
var Base = function(id) {
    this.instanceVariable = id;
};

Base.prototype.instanceMethod = function() {
    document.write("This is from Base class instance-method, instance-variable is: " + this.instanceVariable+"<br>");
};

Base.staticVariable = 'Base';

Base.staticMethod = function() {
    document.write("This is from Base class static-method, static-variable is: "+ this.staticVariable+"<br>");
};

//实现动态extend
var extend = function(base, derived) {
    //实现Derived继承
   Derived = function(id) {
        this.instanceVariable = id;
    };

    Derived.prototype.instanceMethod = function () {
        document.write("This is from Derived class instance-method, instance-variable is: "+this.instanceVariable+"<br>");
    }
    

    Derived.staticVariable = 'Derived';

    Derived.staticMethod = function() {
        document.write("This is from Derived class static-method, static-variable is: "+this.staticVariable+"<br>");
    }

    //http://blog.csdn.net/myhahaxiao/article/details/6952321
    //动态调用基类静态方法
    mycall(base.prototype, Derived.prototype);
    //动态调用基类实例方法
    mycall(base, Derived);

    derived = Derived;
};

var mycall = function(base, derived) {
    for (var i in base) {
        if (typeof(base[i]) == 'function' && typeof(derived[i]) == 'function') {
            var dtmp = derived[i];
            derived[i] = function () {
                base[i].apply(this, arguments);
                dtmp.apply(this, arguments);
            };
        }
    }
};


var Derived;
extend(Base, Derived);



example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();



document.writeln("-------------------test 2---------------------" + "<br>");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();