# v-bind

参考链接: 

[vue.js - v-bind 的一些理解和思考](https://www.jianshu.com/p/98dfa4c6389c)

[官方文档](https://cn.vuejs.org/v2/guide/class-and-style.html)

[vue之v-bind绑定style（对象语法）](https://blog.csdn.net/qq_41684621/article/details/108026682)

## 项目准备

### 初始化vue-v-bind-learning项目

`vue init webpack vue-v-bind-learning`

### 修改App.vue、router/index.js、增加Components/Bind.vue

具体内容看源码

## 绑定基本属性

html属性不能使用双大括号形式绑定，只能使用v-bind指令

### 完整语法

```vue
<template>
  <div>
    <a v-bind:href="url">百度</a>
  </div>
</template>

<script>
export default {
  data(){
    return {
      url:"http://www.baidu.com"
    }
  }
};
</script>
<style>
</style>
```

### 缩写

```vue
<template>
  <div>
    <a :href="url">百度</a>
  </div>
</template>

<script>
export default {
  data(){
    return {
      url:"http://www.baidu.com"
    }
  }
};
</script>

<style>
</style>
```

### 动态参数的绑定

常量字符串需要用单引号''，最外层用双引号
```vue
<template>
  <div>
    <a :href="'http://www.baidu.com?query=' + question">方式一</a>
    <a :href="['http://www.baidu.com?query=' + question]">方式二</a>
  </div>
</template>

<script>
export default {
  data(){
    return {
      question : "你好"
    }
  }
};
</script>

<style>
</style>
```

### 动态函数的绑定

```vue
<template>
  <div>
    <a :href="fun()">属性绑定函数</a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    fun: function () {
      return "http://www.baidu.com";
    },
  },
};
</script>

<style>
</style>

```

### 多html属性的绑定

一个的 html 属性值，可能包含许多内容，需要我们进行一些操作，将多个数据绑定到一个属性上，这里我们可以考虑像前面一样，通过如 “+” 等运算符号等实现字符串的连接操作。但是事实上，字符串连接麻烦又易错，不易于维护。于是我们可以考虑像前面一样向指令预期值中存入一个对象或数组，来实现多个数据绑定到一个属性上的作用。

#### 利用对象绑定

```vue
<template>
  <div>
    <p v-bind:title="obj">content</p>
  </div>
</template>

<script>
var obj = {
  name: "Dale",
  age: 22,
};

// 利用 for-in 循环遍历对象属性，拼接成字符串
obj.toString = function () {
  var str = "";
  for (var i in this) {
    str += i + ": " + this[i] + "; ";
  }
  return str;
};

// 防止 toString 方法自身被遍历出来
Object.defineProperty(obj, "toString", { enumerable: false });

export default {
  data() {
    return {
      obj: obj,
    };
  }
};
</script>

<style>
</style>
```

上面通过 for-in 循环在 toString 方法中得到所有可遍历的属性以及对应的属性值，然后将其拼接成字符串再进行输出，可以实现多属性值绑定，至于如何拼接，可以自己在 toString 方法中进行不同的实现 。

#### 利用数组绑定

```vue
<template>
  <div>
    <p v-bind:title="arr">content</p>
  </div>
</template>

<script>
var arr = [1, 2, 3];

arr.toString = function () {
    return this.join(' ');
};

export default {
  data() {
    return {
      arr: arr,
    };
  }
};
</script>

<style>
</style>
```

相比于对象字符串拼接，数组的拼接操作则显得简单得多，可以直接在 toString 方法返回 join 方法的返回值，默认的 toString 方法的返回值其实就和 join(',') 的返回值相同。

#### 思考

其实想想一个 html 属性绑定多个值的情况其实并不少见，最典型的应该是 class 和 style 属性，或者说我们经常都会接触到这样的场景。
但我们这里的实现，看起来还是问题比较多，数组的绑定还好，对象的绑定，除了每次要重写 toString 方法以外，我们还需要设置 toString 方法变得不可枚举，否则它将在 for-in 循环中被遍历出来（一般情况下，这不是我们希望看到的结果），这样无疑会增加很多重复性工作，而 vue 为我们考虑到了这一点，它在框架内部进行了一些优化操作。

#### 其他类型

1. number 类型，正常执行 toString，包括数字0，结果都正常渲染成对应的字符串；
2. boolean 类型，true 正常渲染成字符串 "true"，但 false 虽然执行 toString 方法将返回 "false" 字符串，但是却没有渲染出来；
3. null / undefined 类型，二者没有 toString 方法，也没有渲染出来。
显然，在执行 toString 方法之前，vue 内部应该先做了类型校验，满足条件才输出。而且这里不是简单的真 / 假值校验，因为 、0 虽为假值，但最终却像真值一样渲染了出来。具体如何实现，可能需要参考 vue 的源码了，这里不再深究。

## 绑定Class属性

v-bind针对html Class及Style做了增强

### 对象语法

对象语法更多的是渲染后面的真假

```vue
<template>
  <div>
    <p :class="{ red: true }">内容</p>
    <p :class="{ red: boolPar }">和内容渲染的一样</p>
    <p :class="{ red: boolPar }">
      根据官方文档，red可以用引号引起来，效果是一样的
    </p>
    <p :class="obj">换成对象</p>
    <p :class="cptObj">换成计算属性</p>
    <p class="cla" :class="{red:true}"> 这样两个class都有</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boolPar: true,
      obj: {
        red: true,
      },
    };
  },
  computed: {
    cptObj: function () {
      return {
        red: this.boolPar,
      };
    },
  },
};
</script>

<style>
.red {
  color: red;
}
</style>
```

### 数组语法

#### 数组正常用法
```vue
<template>
  <div>
    <p :class="[cls1Key, cls2Key]">内容</p>
    <p>{{result1}}</p>

  </div>
</template>
<script>
export default {
  data() {
    return {
      cls1Key: "cls1", // 这里要有单引号
      cls2Key: "cls2",
      result1:'<p class="cls1 cls2">内容</p>',
    };
  },
};
</script>

<style>
.cls1 {
  color: red;
}
.cls2 {
  font-size: 24px;
  font-weight: 600;
}
</style>

```

### 数组中三元表达式

要用三元表达式，外面要给他们套两个中括号[]，才可以
```vue
<template>
  <div>
    <p :class="[ctlWord ?  cls1Key : cls2Key]">内容</p>

  </div>
</template>
<script>
export default {
  data() {
    return {
      cls1Key: "cls1", // 这里要有单引号
      cls2Key: "cls2",
      ctlWord: false
    };
  },
};
</script>

<style>
.cls1 {
  color: red;
}
.cls2 {
 color:green;
}
</style>

```

### 数组中使用对象
```vue
<template>
  <div>
    <p :class="[cls1Key, {cls2Key:true}]">内容</p>
    <p>{{result1}}</p>

  </div>
</template>
<script>
export default {
  data() {
    return {
      cls1Key: "cls1", // 这里要有单引号
      cls2Key: "cls2",
      result1:'<p class="cls1 cls2">内容</p>',
    };
  },
};
</script>

<style>
.cls1 {
  color: red;
}
.cls2 {
  font-size: 24px;
  font-weight: 600;
}
</style>
```

## 用在组件上

当在一个自定义组件上使用 class property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。

例如，如果你声明了这个组件：

```vue
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

然后在使用它的时候添加一些 class：
```html
<my-component class="baz boo"></my-component>
```
HTML 将被渲染为：
```html
<p class="foo bar baz boo">Hi</p>
```
对于带数据绑定 class 也同样适用：

```html
<my-component v-bind:class="{ active: isActive }"></my-component>
```
当 isActive 为 true 时，HTML 将被渲染成为：

```html
<p class="foo bar active">Hi</p>
```

## 绑定Style属性

- 在写CSS属性名的时候，比如font-size
  - 可以使用驼峰式 fontSize
  - 或短横线分隔，但是必须用引号括起来 'font-size'
- 绑定css有两种方式
  - 对象语法
  - 数组语法
- key : value形式中，key可以不用引号，但是value必须加，否则会当成一个变量去解析

### 对象语法

```vue
<template>
  <div>
    <p :style="{ fontSize: '50px', color: 'red' }">内容1</p>
    <p :style="{ fontSize: size, color: color }">内容2</p>
    <p :style="fun()">内容3</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: "50px",
      color: "red",
    };
  },
  methods: {
    fun: function () {
      return {
        fontSize: "50px",
        color: "red",
      };
    },
  },
};
</script>

<style>
</style>

```

### 数组语法

```vue
<template>
  <div>
    <p :style="[obj1, obj2]">数组语法</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
        obj1 : {fontSize: "50px"},
        obj2 : {color: "red"}
    };
  }
};
</script>

<style>
</style>

```
