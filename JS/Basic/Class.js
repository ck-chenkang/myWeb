// JS Class

// 参考链接：https://blog.csdn.net/weixin_44691513/article/details/108416033


/**
 * class基本语法
 */
class point{
	constructor(x,y){
        this.x=x;
        this.y=y;
    }
    play(){
        console.log("我会玩");
    }
}

/**
 * ES6的class与ES5写法的几个核心注意点：
 */

//类的所有方法都定义在类的prototype属性上面。
class piont{
    constructor(){
		//
    }
    play(){
        
    }
}
//上述代码等价于
point.prototype={
    constructor() {},
    play(){},
}

//在类的实例上面调用方法，其实就是调用原型上的方法。
class Ba{
	//
}
let b=new Ba();
b.constructor===Ba.prototype.constructor//true


class ponit{
    constructor(){
        
    }
}
Object.assign(Point.prototype,{
	play(){},
})
//Class直接定义的方法之间不需要逗号分隔，加了会报错. 但是这里是Object.assign的方法格式, 这里面需要往Point.prototype里面添加的方法就需要符合对象的默认格式


/**
 * constructor
 */
// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象


//#region class类的getter和setter
class demo{
    constructor(age){
        this.age=agie;
        this._age=age;
    }
    get age(){
        return this._age;
    }
    set age(value){
        this._age=value;
        console.log("年龄"+value);
    }
}
let kevin=new demo(9);
kevin.age=18;
console.log(kevin.age);

//#endregion class类的getter和setter

//#region class类的静态属性和方法

// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
class Person{
    static sum=0;
    constructor(){
        this.add();
    }
    add(){
        Person.sum++;
    }
}
let kaiwen=new Person();
console.log("当前的聊天室人数为："+Person.sum);
//作用：当没有实例化的时候，我们可以通过静态的属性和方法去获取一些信息
// 注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。静态方法可以与非静态方法重名。

// 父类的静态方法，可以被子类继承静态方法也是可以从super对象上调用的。

//#endregion

//#region  类继承
class Person{
    constructor(name){
        this.name=name;
        this.sex="男";
    }
}
class Student extends Person{
    constructor(name,age){
        super(name);
        this.age=age;
    }
}
let s=new Student("张三",11);
console.log(s.name);
console.log(s.age);
console.log(s.sex);
//#endregion

//#region Class的私有方法和私有属性
/**
 *  私有方法和私有属性:是只能在类的内部访问的方法和属性，外部不能访问。
 * 
    这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

    _bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法

    下面代码中的写法不仅可以写私有属性，还可以用来写私有方法
 */
class Cat{
    #eyes="眼睛";
    static pai(){
        console.log("凯文");
    }
    say(){
        Cat.pai();
        console.log("猫有一双大大的"+this.#eyes);
    }
}
let kate=new Cat();
kate.say();
//#endregion

