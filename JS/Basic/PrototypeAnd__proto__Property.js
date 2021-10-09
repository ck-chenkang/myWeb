/**
 * 什么是原型和原型链
 * 参考链接：https://blog.csdn.net/xiaoermingn/article/details/80745117 【原型和原型链】什么是原型和原型链
 * 参考链接：https://www.zhihu.com/question/34183746 [js中__proto__和prototype区别和关系]
 */

/**  
 * 原型：
 * 1、所有引用类型都有一个__proto__（隐式类型）属性，属性值是一个普通的对象，指向构造改对象的原型
 * 2、所有的函数都有一个prototype(原型)属性，属性值是一个普通的对象
 * 3、所有的引用类型的__proto__属性指向它构造函数的prototype
 * 4、prototype是一个指针，指向一个对象（包含所有实例共享的属性和方法）
 */

/**
 * 引用类型：Object Function
 * 内存存放方式：堆
 * */ 

/**
 * 基本类型：Number Boolean String undefined null，
 * 内存存放方式：栈
 * 
 **/

var a1 = {name:"chenkang", age:25}; 
console.log(a1.__proto__); //{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}


// Person的构造函数
function Person(name, age){
    this.name = name;
    this.age = age;
}

var a2 = new Person("chenkang", 25);
console.log(a2.__proto__ + ""); //[object Object]


var fun1 = function(){
    console.log("Hello World");
}
console.log(fun1.__proto__ + ""); //function () { [native code] }
console.log(fun1.prototype + ""); //[object Object]

var a3 = [1, 2, 3];
console.log(a3.__proto__ + ""); //
console.log(Array.prototype + ""); //
console.log(a3.__proto__ === Array.prototype); //true

/**
 * 原型链：
 * 当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，
 * 则会去它的__proto__隐式原型上查找，即它的构造函数的prototype，
 * 如果还没有找到就会再在构造函数的prototype的__proto__中查找，
 * 这样一层一层向上查找就会形成一个链式结构，我们称为原型链。
 */

function Parent(month){
    this.month = month;
}

var child = new Parent('October');

console.log(child.prototype); //undefined
console.log(child.__proto__ + ""); // [object object]

console.log(Parent.prototype + ""); // [object object]
console.log(Parent.prototype.__proto__ + ""); // [object object]

console.log(child.month); // October

console.log(child.father); // undefined

/**
 * 一直往上层查找，直到到null还没有找到，则返回undefined
 * Object.prototype.__proto__ === null
 * 所有从原型或更高级原型中的得到、执行的方法，其中的this在执行时，指向当前这个触发事件执行的对象
 */
