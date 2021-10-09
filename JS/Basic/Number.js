//创建Number的方法
//构造函数，在w3school上，这个也叫做constructor属性
var number1 = new Number(123);
var number2 = Number(456);

//正常使用number的方法，Js必要的时候会在原生数据和对象之间转换
var number = 100;

console.log(number1);  //Number(123)
console.log(number2); //456

//类型判断
console.log("typeof number1: " + typeof number1); //object
console.log("typeof number2: " + typeof number2); //number
console.log("isNan(number1): " + isNaN(number1)); //false
console.log("isNan(number2): " + isNaN(number2)); //false

//Number对象属性
console.log(Number.MAX_VALUE); //可表示的最大的数
console.log(Number.MIN_VALUE); //可表示的最小的数
console.log(Number.NaN); //? NaN 换成number1.NaN为undefined
console.log(Number.NEGATIVE_INFINITY); //-Infinity 负无穷大，溢出时返回该值。
console.log(Number.POSITIVE_INFINITY); //Infinity   正无穷大，溢出时返回该值。
// ? prototype 使您有能力向对象添加属性和方法。 

//Number 对象方法

//toString() 把数字转换为字符串，使用指定的基数，如果为空，则是10
console.log(number1.toString()); // 123
console.log(number1.toString(2)); //1111011 
console.log(number1.toString(16)); // 7b

//? toLocaleString()	把数字转换为字符串，使用本地数字格式顺序。
console.log(number1.toLocaleString());

// toFixed() 把数字转换为字符串，结果的小数点后有指定位数的数字。
var number3 = new Number(3.1415926);
console.log(number3.toFixed(2)); //3.14

//toExponential() 把对象的值转换为指数计数法。 参数没有用
console.log(number1.toExponential()); //1.23e+2

// toPrecision() 把数字格式化为指定的长度。
var number4 = 123456.789
console.log(number4.toPrecision(4)); //1.235e+5 如果整数部分的位数，大于指定的长度，则会变成科学计数法
console.log(number4.toPrecision(6)); //123457
console.log(number4.toPrecision(7)); //123456.8 有四舍五入，

// valueOf()
console.log(number1.valueOf()); //123
console.log(number3.valueOf()); //3.1415926