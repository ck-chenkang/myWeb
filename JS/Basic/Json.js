// Json方法

// stringify() 将 JavaScript 对象转换为 JSON 字符串。
// JavaScript 对象...：
var myObj = { "name":"Bill", "age":19, "city":"Seattle" };

// ...转换为 JSON：
var myJSON = JSON.stringify(myObj);

// parse() 解析 JSON 字符串并返回 JavaScript 对象。
var obj = JSON.parse('{"firstName":"Bill", "lastName":"Gates"}');