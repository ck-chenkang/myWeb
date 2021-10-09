# v-if

## v-if

```html
<h1 v-if="true">v-if使用方法</h1>
```
引号中也可以换成data对象

## v-else

官方示例一：
```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

官方示例二：
```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```
## v-else-if

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

## v-if可以用在 template上

```html
<template v-show="false">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
</template>
```

## key的作用

参考链接 [vue v-if 加key值的作用](https://blog.csdn.net/rose999ying/article/details/95111037)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <title>Document</title>
</head>

<body>
    <div id="app">
        <template v-if="type === 'name'">
            <label>用户名：</label>
            <input type="text" placeholder="请输入用户名..." style="border-color: red;">
        </template>
        <template v-else>
            <label>邮箱：</label>
            <input type="text" placeholder="请输入邮箱...">
        </template>
        <button @click="handleToggleClick" style="border-color: green;">切换输入类型</button>
    </div>
    <script src="vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                type: 'name'
            },
            methods: {
                handleToggleClick() {
                    this.type = this.type === 'name' ? 'mail' : 'name';
                }
            }
        });
    </script>
</body>

</html>
```

vue在渲染元素时，处于效率考虑， 会尽量地复用已有的元素而非重新渲染，比如上面的实例，在，点击切换按钮，虽然DOM变了，
但是之前在输入框键入的内容并没有改变，只是替换了placeholder的内容，说明input元素被复用了，
如果不希望这样做，可以使用vue.js提供的key属性，它可以让你自己决定是否要复用元素，key的值必须是唯一的！！！，例如下面这样：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <title>Document</title>
</head>

<body>
    <div id="app">
        <template v-if="type === 'name'">
            <label>用户名：</label>
            <input type="text" placeholder="请输入用户名..." style="border-color: red;" key="key1">
        </template>
        <template v-else>
            <label>邮箱：</label>
            <input type="text" placeholder="请输入邮箱..." key="key2">
        </template>
        <button @click="handleToggleClick" style="border-color: green;">切换输入类型</button>
    </div>
    <script src="vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                type: 'name'
            },
            methods: {
                handleToggleClick() {
                    this.type = this.type === 'name' ? 'mail' : 'name';
                }
            }
        });
    </script>
</body>

</html>
```

给input元素添加key，就不会复用了，切换类型时键入的内容也会被删除，不过label元素仍然是被复用的，因为没有添加key属性！

### 官方不推荐v-for和v-if一起使用

当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。

当你只想为部分项渲染节点时，这种优先级的机制会十分有用，如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <title>Document</title>
</head>

<body>
    <div id="app">
        <li v-for="(todo, i) in todos" v-if="!todo.isComplete">
            {{i}}: {{ todo }}
          </li>
    </div>
    <script src="vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                todos: [
                    {isComplete:false},
                    {isComplete:true},
                    {isComplete:true},
                    {isComplete:false},
                ]
            }
        });
    </script>
</body>

</html>
```

![](https://raw.githubusercontent.com/ck-chenkang/Vue/main/Imag/20215220115204.png)

而如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 <template>) 上。如：

```html
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```