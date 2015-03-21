
//有类变量
    Base.staticVariable = 'Base';
//有类方法
    Base.staticMethod = function() {  
        console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};
    


//有实例变量
    function Base(base) {    
        this.instanceVariable = base;
}
//有实例方法
    Base.prototype.instanceMethod = function() {    
        console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
};

    
//有类变量
    Derived.staticVariable = 'Derived';
//有类方法
    derived.staticMethod = function() {  
        base.staticMethod.call(this);
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    };
    

//有实例变量
    function Derived(derived) {  
    this.instanceVariable = derived;
}   
//有实例方法
    function extend(base, derived) {
        derived.prototype.instanceMethod = function() {  
        base.prototype.instanceMethod.call(this);
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    };
    
    
    
}



extend(Base, Derived);

    //第一次测试
    console.log("test :one");
    example = new Derived('example');
    Derived.staticMethod();
    example.instanceMethod();

    //第二次测试
    console.log("test :two");
    example = new Derived('example');
    otherExample = new Derived('other-example');
    Derived.staticMethod();
    example.instanceMethod();
    otherExample.instanceMethod();