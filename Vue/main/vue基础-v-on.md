# v-on

参考链接：

[官网](https://cn.vuejs.org/v2/guide/events.html)

[vue事件处理](https://blog.csdn.net/qq_42238554/article/details/86592295)

官方教程里叫事件处理，主要是针对鼠标和键盘的动作，做出相应的处理。

`v-on:`缩写为`@`

## 绑定

以click为例

### 直接绑定js代码

```html
<button @click="count++" style="width: 50px; height: 35px;"></button>
<br>
<h1>{{count}}</h1>

<script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
        el: '#app',
        data: {
            count:0
        }
    });
</script>
```
### 绑定Methods中的方法

绑定方法名
```html
<button @click="countpp" style="width: 50px; height: 35px;"></button>
<br>
<h1>{{count}}</h1>

<script>
// 创建 Vue 实例，得到 ViewModel
var vm = new Vue({
    el: '#app',
    data: {
        count:0
    },
    methods: {
        countpp : function(){
            this.count++; //不用this，就没反应
        }
    }
});
</script>
```

### 绑定Methods中的方法并传参

```html
<div id="app">
    <button @click="countpp(2)" style="width: 50px; height: 35px;"></button>
    <br>
    <h1>{{count}}</h1>
</div>

<script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
        el: '#app',
        data: {
            count:0
        },
        methods: {
            countpp : function(step){
                this.count = this.count + step;
            }
        }
    });
</script>
```

## 修饰符

### 事件

事件修饰符可以串联，即，@click.prevent.stop这样使用

#### .stop 

阻止事件冒泡，子节点响应以后，父节点就不响应了
```html
<div id="app">
    　　<div class="outeer" @click.stop="outer">
        　　　　<div class="middle" @click.stop="middle">
            　　　　　　<button @click.stop="inner">点击我(^_^)</button>
            　　　　</div>
        　　</div>
</div>

<script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
        el: '#app',
        data: {
            count: 0
        },
        methods: {
            outer: () => { console.log('最外层'); },
            middle: () => { console.log('中间'); },
            inner: () => { console.log('最里面'); }
        }
    });
</script>
```

#### .prevent

组织标签的默认行文，点击了之后，不能再跳转到百度了
```html
<div id="app">
    <a href="http://www.baidu.com" @click.prevent>百度一下，你就知道了</a>
</div>
```

#### .capture

与冒泡不一样，点击子节点之后，从父节点，到子节点都会响应，列如下面的
```html
<div id="app">
    　　<div class="outeer" @click.self="outer">
        　　　　<div class="middle" @click="middle">
            　　　　　　<button @click.stop="inner">点击我(^_^)</button>
            　　　　</div>
        　　</div>
</div>

<script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
        el: '#app',
        data: {
            count: 0
        },
        methods: {
            outer: () => { console.log('最外层'); },
            middle: () => { console.log('中间'); },
            inner: () => { console.log('最里面'); }
        }
    });
</script>
```

#### .self


参考链接: [基于vue.js中事件修饰符.self的用法(详解)](https://www.jb51.net/article/135295.htm)

.self可以理解为跳过冒泡事件和捕获事件，只有直接作用在该元素上的事件才可以执行。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <title>Document</title>
</head>

<style type="text/css">
    * {
        margin: 0 auto;
        text-align: center;
        line-height: 40px;
    }

    div {
        width: 100px;
    }

    #obj1 {
        background: deeppink;
    }

    #obj2 {
        background: pink;
    }

    #obj3 {
        background: hotpink;
    }

    #obj4 {
        background: #ff4225;
    }
</style>
<script src="vue.js"></script>
</head>

<body>
    <!--点击obj4的时候会分别显示： obj4、 obj3、 obj1；
   .self会监视事件是否是直接作用到obj2上，若不是，则冒泡跳过该元素，-->
    <div id="content">
        <div id="obj1" v-on:click="doc">
            obj1
            <div id="obj2" v-on:click.self="doc">
                obj2
                <!--只有点击obj2才可以出发其点击事件。-->
                <div id="obj3" v-on:click="doc">
                    obj3
                    <div id="obj4" v-on:click="doc">
                        obj4
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        var content = new Vue({
            el: "#content",
            data: {
                id: ''
            },
            methods: {
                doc: function () {
                    this.id = event.currentTarget.id;
                    alert(this.id)
                }
            }
        })
    </script>
</body>

</html>
```

#### .once

只执行一次
```html
<div id="app">
    <button @click.once="fun">点我</button>
</div>
<script type="text/javascript">
    var content = new Vue({
        el: "#app",
        data: {
            id: ''
        },
        methods: {
            fun: () => {
                alert('只执行一次');
            }
        }
    })
</script>
```

#### .passive

增加移动端的性能

### 鼠标

.left .right .middle

### 键盘

用法: @keyup.enter=""

常用按键修饰符：
- .enter：回车键
- .tab：制表键
- .delete：含delete和backspace键
- .esc：返回键
- .space: 空格键
- .up：向上键
- .down：向下键
- .left：向左键
- .right：向右键

### 系统修饰符

- .ctrl
- .alt
- .shift
- .meta

### .exact修饰符



