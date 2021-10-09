//isNan() 判断参数是否是非数字值，常用于对parseFloat()和parseInt()函数结果的判断
console.log(isNaN(123)); //false
console.log(isNaN("abc")); //true
console.log(isNaN(null)); //? false
console.log(isNaN(undefined)); //? true
console.log(isNaN({})); //? true
console.log(isNaN([])); //? false
console.log(isNaN(parseFloat(0.0))); //false

// 参考链接：https://www.w3school.com.cn/js/jsref_isNaN.asp
// 思考： IsNaN判断是否是非数字的内部逻辑