/**
 * 引用类型：Object Function
 * 内存存放方式：堆
 * */ 

/**
 * 基本类型：Number Boolean String undefined null，
 * 内存存放方式：栈
 * 
 **/

// 关于基本类型为什么可以使用方法和属性
var string1 = "hello";
var string2 = string1.substring(0); // 基本类型应该没有方法的，但是JS底层处理了
console.log(string2);

/**
 * var string1 = new String("hello");
 * var string2 = string.substring(0);
 * string = null; 
 * 
*/


// 参考链接：https://www.cnblogs.com/ljuyi/p/6100071.html

