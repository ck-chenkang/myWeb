# CommonJs 和 ESModule 的 区别整理

参考链接：

[CommonJs 和 ESModule 的 区别整理](https://blog.csdn.net/weixin_34406796/article/details/91374453)

## 1. exports 和 module.exports 的区别

- module.exports 默认值为{}
- **exports 是 module.exports 的引用**
- exports 默认指向 module.exports 的内存空间
- require() 返回的是 module.exports 而不是 exports
- 若对 exports 重新赋值，则断开了 exports 对 module.exports 的指向

引用：

- require 和 import 都可引用

```js
//foo.js
exports.foo="foo"
//等同于
module.exports.foo="foo"
 
//bar.js
const { foo } = require('./foo.js')
console.log(foo);//'foo'
```

```js

//foo.js
exports={
    foo: 'foo'
}
 
//bar.js
const { foo } = require('./foo.js')
//reuqire 返回的是 module.exports 对象， 默认为 {}

```

## 2. commonJs 和 esModule 的区别

- commonJs是被加载的时候运行，esModule是编译的时候运行
- commonJs输出的是值的浅拷贝，esModule输出值的引用
- commentJs具有缓存。在第一次被加载时，会完整运行整个文件并输出一个对象，拷贝（浅拷贝）在内存中。下次加载文件时，直接从内存中取值

##### commonJs 输出值拷贝

```js
/*************** a.js**********************/
let count = 0
exports.count = count; // 输出值的拷贝
exports.add = ()=>{
    //这里改变count值，并不会将module.exports对象的count属性值改变
    count++;
}
 
/*************** b.js**********************/
const { count, add } = require('./a.js')
//在支持es6模块的环境下等同于
import { count, add } from './a.js'
 
console.log(count) //0
add();
console.log(count)//0
```

##### esModule 输出值引用

```js
/*************** a.js**********************/
export let count = 0;//输出的是值的引用，指向同一块内存
export const add = ()=>{
    count++;//此时引用指向的内存值发生改变
}
 
 
/*************** b.js**********************/
import { count, add } from './a.js'
 
console.log(count) //0
add();
console.log(count)//1
```

##### commonJs 输出的浅拷贝验证

```
/*************** a.js**********************/
const foo = {
	count: 0
}
//module.exports的foo属性为 foo 对象的浅拷贝，指向同一个内存中
exports.foo=foo;
 
window.setTimeout(()=>{
	foo.count += 1
	console.log('changed foo')
},1000)
 
/*************** b.js**********************/
const  { foo }  = require('./a.js')
 
console.log('foo', foo);//'foo',{count: 0}
window.setTimeout(()=>{
  console.log('after 2s foo', foo);//'after 2s foo ',{count: 1}
}, 2000)
```

##### commonJs 输出时的危险操作

其实上个栗子中的 `const { foo } = require('./a.js')` 或者 `const foo = require('./a.js').foo` 写法是相当危险的。因为commonJs输出的值的拷贝，若后面在a.js中 对foo的内存指向作出改动，则不能及时更新。

我们将上面的栗子做个小改动：

```js
/*************** a.js**********************/
const foo = {
	count: 0
}
exports.foo=foo; //此时foo指向 {count: 0}的内存地址
window.setTimeout(()=>{
    //改变 foo 的内存指向
	exports.foo='haha';
},1000)
 
/*************** b.js**********************/
const  { foo }  = require('./a.js'); //拷贝了 foo属性指向 {count: 0} 内存地址的引用
 
console.log('foo', foo);//'foo',{count: 0}
window.setTimeout(()=>{
    //看！并没有改变！
  console.log('after 2s foo', foo);//'after 2s foo ',{count: 0}
}, 2000)
```

改进：

```js
/*************** b.js**********************/
const test = require('./a.js'); 
//test 拷贝了 整个输出对象{foo:{count: 0} }内存地址的引用
//当内存中的属性值发生变化时，可以拿到最新的值，因为指向的是同一片内存
 
console.log('foo', test.foo);//'foo',{count: 0}
window.setTimeout(()=>{
  //保证获取到的是最新的
  console.log('after 2s foo', test.foo);//'after 2s foo ','haha'
}, 2000)
```

进阶：

```js
/*************** child.js**********************/
let foo = 1
 
setTimeout(()=>{
  foo=2;
  exports.foo= foo
},1000)
exports.foo=foo
 
/*******************index.js***************************/
var test =require('./child');
 
console.log(test.foo);// 1
 
setTimeout(()=>{
  console.log(test.foo) // 2
},2000)
```

将child.js中的输出方式做一下改动，结果就变了。

```js
/*************** child.js**********************/
let foo = 1
 
setTimeout(()=>{
  foo=2;
  module.exports={foo};//注意：指向新内存 {foo:2}
},1000)
module.exports={foo}; //指向内存 {foo:1}
 
/*******************index.js***************************/
var test =require('./child');// 浅拷贝，指向的还是{foo:1}的内存，并缓存在内存中
 
console.log(test.foo);// 1 //从缓存的内存中取值
 
setTimeout(()=>{
  console.log(test.foo) // 1 //从缓存的内存中取值
},2000)
```

## 3. ES6 模块加载 CommonJS 模块

module.exports 等同于 export default 可以用 import 引入

## 4. CommonJS 模块加载 ES6 模块

CommonJS 模块加载 ES6 模块，不能使用require命令，而要使用import()函数。

```js
// es.mjs
let foo = { bar: 'my-default' };
export default foo;
 
// cjs.js
const es_namespace = await import('./es.mjs');
// es_namespace = {
//   get default() {
//     ...
//   }
// }
console.log(es_namespace.default);
// { bar:'my-default' }
```

