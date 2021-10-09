// 创建Arrary对象的方法

var arr1 = new Array(); // 长为0的空数组
var arr2 = new Array(20); // 20位数组元素个数
var arr3 = new Array(1, 2, "str"); // 放不同的参数，用逗号隔开

console.log(arr3);

// 当把构造函数作为函数调用，不使用 new 运算符时，它的行为与使用 new 运算符调用它时的行为完全一样。
// 也就是说
var arr4 = Array(1, 2, 3);
console.log(arr4.toString()); // 1,2,3 效果和arr3一样

// 属性
// .length 设置或返回数组中元素的数目
console.log(arr4.length); // 3

console.log(arr2.length); // 20
arr2.length = 10; // 设置元素个数
console.log(arr2.length); // 10

// 方法

// concat() 连接两个或更多的数组，并返回结果
var arr5 = [1, 2, 3];
var arr6 = arr5.concat(4, 5); // 参数可以是具体的值，也可以是数组
console.log(arr6.toString()); // 1,2,3,4,5

// join() 数组转化成字符串，数组元素之间用指定的分隔符分隔
console.log(arr5.join()); // 1,2,3
console.log(arr5.join("-")); // 1-2-3

// pop() 删除并返回最后一个元素，原数组也会改变
var a1 = arr5.pop();
console.log(a1); // 3
console.log(arr5.toString()); // 1,2

// push() 向数组末尾添加一个或多个元素
var a2 = arr5.push(3);
console.log(a2); // 3
console.log(arr5.toString()); // 1,2,3

// reverse() 颠倒数组元素的顺序，会改变原数组
arr5.reverse();
console.log(arr5.toString());

// shift() 删除第一个元素
var a3 = arr5.shift();
console.log(a3); // 3
console.log(arr5.toString()); // 2,1

// unshift() 向开头添加若干个元素，并返回新数组的长度
var len1 = arr5.unshift(0, 1);
console.log(len1); // 4
console.log(arr5.toString()); // 0,1,2,1

// slice() 从已有的数组中返回选定的元素的数组
var arr7 = [1, 2, 3, 4, 5];
var arr8 = arr7.slice(1, 3); // 2,3  [)这种截取方式，左边包含，右边不包含 
var arr9 = arr7.slice(-2); // 4, 5 负值，就是从后往前数的元素个数
var arr10 = arr7.slice(-3, -1); // 3,4
console.log(arr8.toString());
console.log(arr9.toString());
console.log(arr10.toString());

// sort() 排序，可以放一个排序函数
// 示例1：
var arr11 = new Array(6)
arr11[0] = "George"
arr11[1] = "John"
arr11[2] = "Thomas"
arr11[3] = "James"
arr11[4] = "Adrew"
arr11[5] = "Martin"

console.log(arr11.sort().toString()); // Adrew,George,James,John,Martin,Thomas

// 示例2：
var arr12 = new Array(6)
arr12[0] = "10"
arr12[1] = "5"
arr12[2] = "40"
arr12[3] = "25"
arr12[4] = "1000"
arr12[5] = "1"

console.log(arr12.sort().toString());// 1,10,1000,25,40,5

// 示例3：
var arr13 = new Array(2)
arr13[0] = "10"
arr13[1] = "5"
arr13[2] = "40"
arr13[3] = "25"
arr13[4] = "1000"
arr13[5] = "1"

function sortNumber(a, b) {
    console.log("a: " + a + " b: " + b + " Boolean(a - b): " + Boolean(a-b).toString() ); //a是后一个元素，b是前一个元素，如果为负值，则将他们掉个个
    // console.log(a - b);
    return a - b;
}

console.log(arr13.sort(sortNumber).toString()); //1,5,10,25,40,1000


/**
 * splice(index, howMany, item1, item2, ..., itemx)
 * index : 必需，添加或删除元素的位置
 * howMany ： 要删除的项目的数量
 * item1, item2, ..., itemx 可选，向数组添加的新项目
 * 返回值：Arrary，包含被删除项目的新数组
 */
var arr14 = new Array(6)
arr14[0] = "George"
arr14[1] = "John"
arr14[2] = "Thomas"
arr14[3] = "James"
arr14[4] = "Adrew"
arr14[5] = "Martin"

var a4 = arr14.splice(2, 1, "chenkang");
console.log(a4.toString()); // Thomas
console.log(arr14.toString()); // George,John,chenkang,James,Adrew,Martin

// toString() toLocaleString()
var arr15 = [1, 2, 3];
console.log(arr15.toString()); // 1,2,3
console.log(arr15.toLocaleString()); // 1,2,3
