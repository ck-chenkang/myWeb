/* try {
    供测试的代码块
}
catch(err) {
    处理错误的代码块
} 
finally {
    无论 try / catch 结果如何都执行的代码块
} */

try {
    adddlert("Welcome");
  }
  catch(err) {
    console.log(err.name + "\n" + err.message); //ReferenceError   adddlert is not defined
  }