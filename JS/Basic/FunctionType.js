// 参考链接：https://blog.csdn.net/weixin_46156304/article/details/109323698
// JS面向对象 Function类型


/* -------
    一、Function 类型与函数
  -------*/

// 函数与Function类型是不同的

// 函数/方法：定义一次，可以被调用很多次
// 函数名：本质指向某个Function对象的引用

// Function类型：JS提供的引用类型之一，通过Function类型创建Function对象

//1、函数声明方式定义
function fn() {
    console.log('this is fn function');
}

//2、字面量/直接量方式定义
var f = function () {
    console.log('this is f function');
}

//函数其实是一个对象
console.log(fn instanceof Object);//true
console.log(f instanceof Object);//true

//函数是Function类型的对象
console.log(fn instanceof Function);//true
console.log(f instanceof Function);//true


//利用Function类型创建对象
var fun = new Function();
//对象fun就是一个函数
fun();
//函数fun不具有函数体、参数和return语句
console.log(fun);//[Function: anonymous]

/*
    3.使用Function类型创建一个函数对象时
    var 函数名 = new Function(args,statement);
      参数
        args - 字符串类型，表示当前创建函数的形参
           如果是多个形参的话，中间使用逗号分隔
        statement - 字符串类型，表示当前创建函数的函数体
      问题 - 函数的函数体定义可读性降低
* */
var fun = new Function('console.log("this is function.")');//this is function.
fun();
var fun = new Function('a', 'console.log("this is" + a)');//this is100
fun(100);
var fun = new Function('a,b', 'console.log("this is " + a + b)');//this is 100200
fun(100, 200);

/* -------
    二 、 Function 与 Object
  -------*/

/*
    1.Function类型是JavaScript中的引用类型之一
    2.引用类型都可以当作是一个构造函数
    3.构造函数也是函数的一种
    4.函数其实是一个Function类型的对象
* */
console.log(Function instanceof Function);//true

/*
    1.Function类型是JavaScript中的引用类型之一
    2.引用类型都可以当作是一个构造函数
    3.构造函数也是函数的一种
    4.函数其实是一个Function类型的对象
    5.JavaScript中所有对象都是Object类型的
* */
console.log(Function instanceof Object);//true

/*
    1.Object类型是JavaScript中的引用类型之一
    2.引用类型都可以当作是一个构造函数
    3.构造函数也是函数的一种
    4.函数其实是一个Function类型的对象
* */
console.log(Object instanceof Function);//true

/*
    1.Object类型是JavaScript中的引用类型之一
    2.引用类型都可以当作是一个构造函数
    3.构造函数也是函数的一种
    4.函数其实是一个Function类型的对象
    5.JavaScript中所有对象都是Object类型的
* */
console.log(Object instanceof Function);//true


/* -------
    三 、 自定义构造函数
  -------*/

/**
 * 构造函数：
 * 作用：创建JS对象
 * 构造函数与函数：
 *  相同点：语法结构相同
 *  不同点：函数->函数体（局部变量和函数）；构造函数->属性和方法
 *  
 */

var Hero = function (name) {
    //定义属性
    this.name = name;
    //定义方法
    this.sayMe = function () {
        console.log('this is function')
    }
}


/* -------
    四 、 定义构造函数的三种方式
  -------*/
//利用Hero构造函数创建对象 -> 当前对象是Hero类型的
var hero = new Hero('chenkang');
console.log(hero);  //Hero { name: 'chenkang', sayMe: [Function] }

//1.函数定义语句
function fn4() {
    this.name = '111'
}
var x = new fn4();
//2.字面量表达式
var a = new function () {
    this.name = '111'
}

//Function类型定义
//效率低
var add = new Function(
    'name1',
    'name2',
    'var sum = name1+name2;return sum;'
);

/* -------
    五 、 Function的length属性
  -------*/

// Function类型的length属性 - 获取函数的参数(形参)的个数

function fn5() {
    console.log('this is function');
}
fn5(1, 2, 3, 4, 5);
console.log(fn5.length);// 0



function f5(a, b, c, d, e) {
    console.log('this is function');
}
fn5();
console.log(f5.length);// 5


/* -------
    六 、 Function的apply()方法
  -------*/

/*
    apply(thisArg, args)方法 - 调用函数
     使用的对象调用方法的语法结构 -> 将函数作为对象使用
     参数
       thisArg - 指定this的值，表示当前调用函数的对象
         如果不使用this值时，提供默认值为 null 或 undefined
       args - 数组，用于接收指定函数的实参
     与函数调用体的区别在于接收的this值
 */


// 定义一个函数
function fn6(a, b) {
    console.log('this is ' + a + b);
}
// 调用函数 - 函数的语法内容
fn6('function', 'hello'); // this is functionhello

fn6.apply(null, ['function', 'chenkang']); //this is functionchenkang


/* -------
    七 、 Function的call()方法
  -------*/

//apply()与call()非常相似，不同之处在于提供参数的方式。

/*
  call(thisArg, arg1, arg2, ...)方法 - 用于调用函数
   参数
     thisArg - 用于指定this的值
     arg1, arg2, ... - 用于接收函数的实参
   call()与apply()方法区别 - 在于第二个参数上
*/
function fn7() {
    console.log('this is function');
}
fn7.call(null);//this is function


/* -------
    八 、 Function的bind()方法
  -------*/

/*
   bind(thisArg, arg1, arg2, ...)方法 - 用于创建一个新的函数(复制函数)
    参数
      thisArg - 用于指定this的值
      arg1, arg2, ... - 用于接收新创建函数的实参
        新创建的函数的调用时，传递的实参无效
    返回值 - 返回新创建的函数
    作用 - 实现函数的深复制
*/
var fn8 = function (v, w) {
    console.log('this is ' + v + w);
}

fn8('chenkang'); // this is chenkangundefined
var f8 = fn8.bind(null, 'ck');// 参数的默认值
f8('haha'); // this is ckhaha

/* -------
    九 、 JS没有重载
  -------*/

// 定义多个同名函数，最后一个函数定义有效

/* -------
    十 、 argument对象
  -------*/

/*
  arguments对象
   存在于函数体中的特殊对象 -> 原本是Function类型的arguments属性
   arguments对象是一个类数组对象
   length属性 - 函数实参的个数
   作用 - 用于接收函数的参数(实参)
*/
function fn10() {
    console.log(arguments[0]);
}
console.log(fn.arguments);// null
fn10(1, 2, 3, 4); //1

// 模拟函数的重载效果
function add10() {
    var len = arguments.length;
    switch (len) {
        case 2:
            return arguments[0] + arguments[1];
            break;
        case 3:
            return arguments[0] + arguments[1] + arguments[2];
            break;
        case 4:
            return arguments[0] + arguments[1] + arguments[2] + arguments[3];
            break;
    }
}

console.log(add10(1, 2));// 3
console.log(add10(1, 2, 3));// 6
console.log(add10(1, 2, 3, 4));// 10


/* -------
    十一 、 argument对象
  -------*/
/*
    函数的递归 - 函数在当前函数体中调用自身
     执行方式类似于循环语句的执行方式 -> 反复执行指定的语句块内容
     执行递归函数时，必须提供结束执行的条件(出口)
 */
var v = 0;
function fn11() {
    console.log('this is function');
    v++;
    // 提供结束执行的条件
    if (v > 9) {
        return;
    }
    // 调用自身函数
    fn11();
}

fn11();

/* -------
    十二 、 递归的问题
  -------*/

/*
    函数的递归 - 函数在当前函数体中调用自身
     执行方式类似于循环语句的执行方式 -> 反复执行指定的语句块内容
     执行递归函数时，必须提供结束执行的条件(出口)
 */
var v = 0;
function fn12() {
    console.log('this is function');
    v++;
    // 提供结束执行的条件
    if (v > 9) {
        return;
    }
    // 调用自身函数
    // fn();
    arguments.callee(); // fn = null;// 释放资源后会报错所以把使用arguments.callee();
    //  **arguments.callee();**就是调用自身函数
}

// fn();

var f12 = fn12;
fn12 = null;// 释放资源
f12();

/* -------
十三 、 匿名函数
-------*/
/**
 *  表示没有名称的函数

    问题 ：JavaScript语法并不支持匿名函数

    应用：

    回调函数：将一个函数作为另一个函数的参数使用，作为参数的函数
    自调函数：函数调用自身（定义即调用的函数）
 */

/* -------
十四 、 回调函数
-------*/

// 当一个函数作为参数传递给另一个函数时，作为参数的函数被称之为回调函数。

// 不带参回调
// 函数n14作为函数fn14的参数 -> 回调函数
var n14 = function(){
    console.log('n');
}

function fn14(v){
    v();
}

fn14(n14);
// 匿名回调函数 - 不占用全局命名空间(内存)
fn14(function(){console.log('n')});

// 带参回调
// 函数n作为函数fn的参数 -> 回调函数
var n14_2 = function(w){
    console.log(w);
}

function fn14_2(v){
    var name = 'chenkang';// 局部变量 - 只能作用于当前函数作用域(私有)
    v(name);// 将布局变量作为v()函数的实参传递
}

fn14_2(n14_2);
// 匿名回调函数 - 不占用全局命名空间(内存)
fn14_2(function(w){
    console.log(w);
});


/* -------
十五 、 自调函数
-------*/

// 所谓自调函数就是在定义函数后自动调用
// 第一个括号的作用，放置的是一个匿名函数
// 第二个括号的作用，是“立即调用”。
(function(){
	console.log('自动运行')
})();


/*
    自调函数
     作用 - 用于执行一次性的逻辑任务
     应用 - 作为整体逻辑代码外层结构
     语法结构
       第一个括号 - 定义函数
       第二个括号 - 调用函数
 */
       (function(v){
        var w = 100;// 局部变量
        console.log('this is ' + v);
    })('function');
    // 表达式方式
    (function(v){
        var w = 100;// 局部变量
        console.log('this is ' + v);
    }('function'));
    
    +function(v){
        var w = 100;// 局部变量
        console.log('this is ' + v);
    }('function');
    
    !function(v){
        var w = 100;// 局部变量
        console.log('this is ' + v);
    }('function');
    
    ~function(v){
        var w = 100;// 局部变量
        console.log('this is ' + v);
    }('function');
    
/*     自调函数的格式有很多种：
        ()()
        (())
        +()
        !()
        ~()
        等等 */

/* -------
十六、 作为值的函数
-------*/

// 将一个函数作为另一个函数的结果进行返回，作为结果返回的函数称之为作为值的函数。

// 作为值的函数

function fn16(){
    // 内部函数执行后的返回值
    function n(){
        return "Hello";
    }
    return n();
}

var result = fn16();
console.log(result);// 1

/* -------
十七、 作用域链
-------*/

// 访问区间是一层一层的往下传

var a = 'a';

function fun17(){
    var b = 'b';

    console.log(a);
    console.log(b);

    function fn17(){
        var c = 'c';// 相对于f函数作用域的话，c相当于全局变量

        console.log(a);
        console.log(b);
        console.log(c);

        function f17(){// 函数作用域
            var d = 'd';

            console.log(a);
            console.log(b);
            console.log(c);
            console.log(d);
        }
        f17();
    }
    fn17();
}
fun17();


/* -------
十七、 闭包
-------*/
//参考链接：https://zhuanlan.zhihu.com/p/106287246

/**
 *  JavaScript允许函数嵌套，并且内部函数可以访问定义在外部函数中的所有变量和函数，以及外部函数能访问的所有变量和函数。但是外部函数却不能够访问定义在内部函数中的变量和函数。

    当内部函数以某一种方式被任何一个外部函数作用域访问时，一个闭包就产生了。

    闭包就是词法表示包括不必计算的变量的函数，也就是说，该函数能够使用函数外定义的变量。
 */

// 对象与函数
function fn171(){
    var v = 100;// 局部变量
    return {
        get : function(){
            return v;
        },
        set : function(value){
            v = value;
        }
    }
}
var obj171 = fn171();
obj171.set(200);
console.log(obj171.get());

// 函数与构造函数
function fn172(){
    var v = 100;// 局部变量
    this.get = function(){
        return v;
    }
    this.set = function(value){
        v = value;
    }
}
var obj172 = new fn172();
obj172.set(200);
console.log(obj172.get());// 200


var get173, set173;// 全局作用域
function fn173(){
    var v = 100;// 局部变量
    get173 = function(){
        return v;
    }
    set173 = function(value){
        v = value;
    }
}
fn173();
// set173(200);
console.log(get173());// 100


function fn174(v){
    var v1 = 100;
    // console.log(v2);
    v(v1);
    // console.log(v2); 
}

function fn175(v){
    var v2 = 200;
    console.log(v);
}

fn174(fn175);//100
// fn175();

/**
 *  闭包的特点：
    局部变量:在函数中定义有共享意义（如:缓存、计数器等）的局部变量。(注:定义成全局变量会对外造成污染)
    内部函数:在函数（f )中声明有内嵌函数，内嵌函数（g)对函数(f)中的局部变量进行访问。
    外部使用:函数(f)向外返回此内嵌函数（g)，外部可以通过此内嵌函数持有并访问声明在函数( f )中的局部变量，而此变量在外部是通过其他途径无法访问的。
    闭包的作用：

    提供可共享的局部变量。
    保护共享的局部变量。提供专门的读写变量的函数。
    避免全局污染。
 */

