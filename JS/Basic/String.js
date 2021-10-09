// 创建String对象的语法

var str1 = new String("string1");
var str2 = String("string2");

// 平常使用String的方式
var str = "Hello";

console.log("str1: " + str1); //string1
console.log("str2: " + str2); //string2

//类型判断
console.log("typeof st1: " + typeof str1); //object 
console.log("typeof st2: " + typeof str2); //string
console.log("typeof st: " + typeof str); //string

// "" 与 '' 都是字符串
// `` 元字符串
var str3 = "heng"; // heng
var str4 = 'ha'; // ha
var str5 = `h------
            ----\t-----h`; // h------
                                //   ----	-----h      

console.log(str3);
console.log(str4);
console.log(str5);

//#region 在表达式内，根据变量名获取字符串的值
var a = "Hello";

console.log(` ${a} World`);
//#endregion

// string对象属性
var str6 = "hello world";
var str7 = "你好，世界";

console.log(str6.length); //11，空格算一个
console.log(str7.length); //5，一个汉字算一个


// string对象方法
// 有两部分，1、显示的时候，加粗、倾斜等方法，2、字符串修剪、分隔等方法
// 第一部分，参考链接：https://www.w3school.com.cn/tiy/t.asp?f=jseg_str_style，https://www.w3school.com.cn/jsref/jsref_obj_string.asp

var str8 = "Hello World";

console.log(str8.big()); // <big>Hello World</big> 用大号字体显示字符串。
console.log(str8.bold()); // <b>Hello World</b> 使用粗体显示字符串。
console.log(str8.blink()); // <blink>Hello World</blink> 显示闪动字符串。
console.log(str8.fixed()); // <tt>Hello World</tt> 以打字机文本显示字符串。
console.log(str8.fontcolor("red")); // <font color="red">Hello World</font> 使用指定的颜色来显示字符串。
console.log(str8.fontsize(16)); // <font size="16">Hello World</font> 使用指定的尺寸来显示字符串。
console.log(str8.italics()); // <i>Hello World</i> 使用斜体显示字符串。
console.log(str8.link("www.baidu.com")); // <a href="www.baidu.com">Hello World</a> 将字符串显示为链接。
console.log(str8.small()); // <small>Hello World</small> 使用小字号来显示字符串。
console.log(str8.strike()); //<strike>Hello World</strike> 使用删除线来显示字符串。
console.log(str8.sub()); //<sub>Hello World</sub> 把字符串显示为下标。
console.log(str8.sup()); //<sup>Hello World</sup> 把字符串显示为上标。

// toLocaleLowerCase() toLowerCase() 把字符串转换为小写
console.log(str8.toLocaleLowerCase()); // hello world
console.log(str8.toLowerCase()); // hello world

// toLocaleUpperCase() toUpperCase() 把字符串转换为大写 
console.log(str8.toLocaleUpperCase()); // HELLO WORLD
console.log(str8.toUpperCase()); // HELLO WORLD

// charAt() 返回指定位置的字符
console.log(str8.charAt(0)); // H
console.log(str8.charAt(-1)); // 没返回
console.log(str8.charAt(7)); // o
console.log(str8.charAt(12)); // 没返回

// charCodeAt() 返回在指定的位置的字符的 Unicode 编码。
console.log(str8.charCodeAt(0)); // 72

// concat() 连接字符串 可以一次连接多个字符串
var str9 = "hello";
var str10 = "world";
var str11 = str9.concat(" ", str10, "!");
console.log(str11); // hello world!

// fromCharCode 从字符编码创建一个字符串。
console.log(String.fromCharCode(72,69,76,76,79)); //HELLO


// indexOf() 检索字符串，并返回位置
console.log(str8.indexOf("l")); //2
console.log(str8.indexOf("l", 5)); //9
console.log(str8.indexOf("LL")); // -1 表示当前字符串里没有
console.log(str8.indexOf("ll")); // 2

// lastIndexOf() 从后面向前检索
console.log(str8.lastIndexOf("l")); //9

// localeCompare() 用本地特定的顺序来比较两个字符串。
console.log(str8.localeCompare("HELLO WORLD")); // -1 方法前面的字符串比方法里面的字符串 小
console.log(str8.localeCompare("hello world")); // 1 方法前面的字符串比方法里面的字符串 大
console.log(str8.localeCompare("Hello World")); // 0 方法前面的字符串与方法里面的字符串 相等


// match()  检索与正则表达式相匹配的值。 ""是为了把输出编程字符串
var str12 = "1 + 1 = 2";
console.log(str12.match(/\d+/g) + ""); // 1,1,2
console.log(str12.match(/\d+/g) ); // ['1', '1', '2'] 
console.log(str12.match("")); // 
console.log(str12.match("") + ""); // 
console.log(str12.match("1") + ""); // 1
console.log(str12.match("H")); // null
console.log(str12.match("H") + ""); // null

// replace() 支持正则表达式
var str13 = str8.replace("World", "世界");
console.log(str13); // Hello 世界

// search() 返回序号 支持正则
console.log(str8.search("llo")); // 2

// slice() 提取字符串
// 参数：起始位置，结束位置
// 返回值：新的字符串
// 特点：可从数组中返回元素
var str14 = str8.slice(3); // lo World
var str15 = str8.slice(3,5); // 1o
console.log(str14); 
console.log(str15);

var arr = new Array(3)

arr[0] = "George"

arr[1] = "John"

arr[2] = "Thomas"

console.log(arr.slice(1) + ""); // John,Thomas

// split() 把字符串分割为字符串数组。
// 参数：分隔符/正则表达式，返回数组元素的个数
// 返回值：
console.log(str8.split(" ") + ""); // Hello,World
console.log(str8.split("") + ""); // H,e,l,l,o, ,W,o,r,l,d
console.log(str8.split(" ", 1) + ""); // Hello 1指定返回数组元素的个数

// substr() 从起始索引号提取字符串中指定数目的字符 
// 参数：起始位置，长度
// 返回值：新的字符串
console.log(str8.substr(3)); // lo World
console.log(str8.substr(3,1)); // l 后面一个数，代表个数
 
// substring() 提取字符串中两个指定的索引号之间的字符。
// 参数：开始位置：number，结束位置：number
// 返回值：新的字符串对象：string
// 注意：结束位置不能为负
console.log('"Hello World".length: ' + str8.length ); // 11
console.log(str8.substring(5,11)); // World
console.log(str8.substring(1)); // ello World

