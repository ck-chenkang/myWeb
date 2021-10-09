// 时间相关
var myDate = new Date();

// 返回当天的日期和时间
console.log(Date()); // Mon Jul 19 2021 14:07:55 GMT+0800 (GMT+08:00)

// 今天几号了 返回1~31之间的数字
console.log(myDate.getDate()); // 19

// 返回一周中的某一天（0~6）
console.log(myDate.getDay()); // 1

// 返回月份 (0~11)，要加1呀
console.log(myDate.getMonth()); // 6

// 返回年份
console.log(myDate.getFullYear()); // 2021

// 返回小时 (0~23) 
console.log(myDate.getHours()); // 12

// 分钟
console.log(myDate.getMinutes()); // 17

// 秒
console.log(myDate.getSeconds());

// 毫秒
console.log(myDate.getMilliseconds());

// 从1970年1月1日至今的毫秒数 
console.log(myDate.getTime()); // 1626675804237

//  返回本地时间与格林威治标准时间 (GMT) 的分钟差。
console.log(myDate.getTimezoneOffset()); // -480

// 世界时间相关
console.log(myDate.getUTCDate()); // 19
console.log(myDate.getUTCDay()); // 1
console.log(myDate.getUTCMonth()); // 6
console.log(myDate.getUTCFullYear()); // 2021
console.log(myDate.getUTCHours()); // 6
console.log(myDate.getUTCMinutes()); // 27
console.log(myDate.getUTCSeconds()); // 49
console.log(myDate.getUTCMilliseconds()); // 924

// 返回1970年1月1日午夜到指定日期（字符串）的毫秒数。
var d = Date.parse("Jul 8, 2005")
console.log(d); //1120752000000

// 设置时间相关
var setDate = new Date();
setDate.setDate(7);
setDate.setMonth(0);
setDate.setFullYear(1995);

console.log(setDate.toLocaleDateString()); // 1995-1-7

setDate.setHours(12);
setDate.setMinutes(10);
setDate.setSeconds(11);

console.log(setDate.toLocaleTimeString()); // 12:10:11 ├F10: PM┤

// 还可以设置UTC时间，用setUTCxx

// 时间打印

console.log(myDate.toString()); //Mon Jul 19 2021 14:40:43 GMT+0800 (GMT+08:00)
console.log(myDate.toTimeString()); // 14:40:43 GMT+0800 (GMT+08:00)
console.log(myDate.toDateString()); //Mon Jul 19 2021
console.log(myDate.toUTCString()); // Mon, 19 Jul 2021 06:42:46 GMT
console.log(myDate.toLocaleString()); // 2021-7-19 2:42:46 ├F10: PM┤
console.log(myDate.toLocaleTimeString()); // 2:42:46 ├F10: PM┤
console.log(myDate.toLocaleDateString()); // 2021-7-19







