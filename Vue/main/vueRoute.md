# vue-router 的基本使用

参考链接 [vue-router 的基本使用](https://blog.csdn.net/weixin_41910848/article/details/81697577)

## 基本

路由，其实就是指向的意思，当我点击页面上的home按钮时，页面中就要显示home的内容，如果点击页面上的about 按钮，页面中就要显示about 的内容。Home按钮  => home 内容， about按钮 => about 内容，也可以说是一种映射. 所以在页面上有两个部分，一个是点击部分，一个是点击之后，显示内容的部分。 

　　点击之后，怎么做到正确的对应，比如，我点击home 按钮，页面中怎么就正好能显示home的内容。这就要在js 文件中配置路由。

### 路由中有三个基本的概念 route, routes, router。

1. route，它是一条路由，由这个英文单词也可以看出来，它是单数， Home按钮  => home内容， 这是一条route,  about按钮 => about 内容， 这是另一条路由。

2. routes 是一组路由，把上面的每一条路由组合起来，形成一个数组。[{home 按钮 =>home内容 }， { about按钮 => about 内容}]

3. router 是一个机制，相当于一个管理者，它来管理路由。因为routes 只是定义了一组路由，它放在哪里是静止的，当真正来了请求，怎么办？ 就是当用户点击home 按钮的时候，怎么办？
   这时router 就起作用了，它到routes 中去查找，去找到对应的 home 内容，所以页面中就显示了 home 内容。

 客户端中的路由，实际上就是dom 元素的显示和隐藏。当页面中显示home 内容的时候，about 中的内容全部隐藏，反之也是一样。客户端路由有两种实现方式：基于hash 和基于html5 history api.

## vue-router中的路由

### 页面实现（html模版中）

在vue-router中, 我们看到它定义了两个标签<router-link> 和<router-view>来对应点击和显示部分。<router-link> 就是定义页面中点击的部分，<router-view> 定义显示部分，就是点击后，区配的内容显示在什么地方。所以 <router-link> 还有一个非常重要的属性 to，定义点击之后，要到哪里去， 如：<router-link  to="/home">Home</router-link>

### js 中配置路由

首先要定义route,  一条路由的实现。它是一个对象，由两个部分组成： path和component.  path 指路径，component 指的是组件。如：{path:’/home’, component: home}

我们这里有两条路由，组成一个routes: 
```js
const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About }
]
```

最后创建router 对路由进行管理，它是由构造函数 new vueRouter() 创建，接受routes 参数。
```js
const router = new VueRouter({
      routes // routes: routes 的简写
})
```

配置完成后，把router 实例注入到 vue 根实例中,就可以使用路由了
```js
const app = new Vue({
  router
}).$mount('#app')
```

执行过程：当用户点击 router-link 标签时，会去寻找它的 to 属性， 
它的 to 属性和 js 中配置的路径{ path: '/home', component: Home}  path 一一对应，
从而找到了匹配的组件， 最后把组件渲染到 <router-view> 标签所在的地方。所有的这些实现才是基于hash 实现的。


## 创建项目测试vuerouter

### 初始化一个项目

    vue init webpack vue-router-learning

### 新建两个组件，home.vue和about.vue

```html
<template>
    <div>
        <h1>home</h1>
        <p>{{msg}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: "我是home 组件"
            }
        }
    }
</script>
```

```html
<template>
    <div>
        <h1>about</h1>
        <p>{{aboutMsg}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                aboutMsg: '我是about组件'
            }
        }
    }
</script>
```

### 修改app.vue为

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <header>
    <!-- router-link 定义点击后导航到哪个路径下 -->
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
    </header>
    <!-- 对应的组件内容渲染到router-view中-->
    <router-view></router-view>   
  </div>
</template>

<script>
export default {
  
}
</script>
```

### 修改router下面的index.js为

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from "@/components/home.vue"
import about from "@/components/about.vue"

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:"/home",
      component:home
    },
    {
      path:"/about",
      component:about
    },{
        path:"/",
        redirect:"/home"
    }
  ]
})
```

## 动态路由

上面我们定义的路由，都是严格匹配的，只有router-link 中的to属性和 js 中一条路由route中 path 一模一样，才能显示相应的组件component. 
但有时现实却不是这样的，当我们去访问网站并登录成功后，它会显示 欢迎你，+ 你的名字。不同的用户登录， 只是显示“你的名字” 部分不同，其它部分是一样的。
这就表示，它是一个组件，假设是user组件。不同的用户（就是用户的id不同），它都会导航到同一个user  组件中。这样我们在配置路由的时候，就不能写死, 
就是路由中的path属性，不能写死，那要怎么设置? 导航到 user 组件，路径中肯定有user, id 不同，那就给路径一个动态部分来匹配不同的id.  
在vue-router中，动态部分 以 : 开头，那么路径就变成了 /user/:id, 这条路由就可以这么写：  { path:"/user/:id", component: user }.

我们定义一个user组件（自己随便写一个就好了），页面中再添加两个router-link 用于导航， 最后router.js中添加路由配置，来体验一下

### app.vue 中添加两个router-link

```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <header>
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
     <!--  增加两个到user组件的导航，可以看到这里使用了不同的to属性 -->
      <router-link to="/user/123">User123</router-link>
      <router-link to="/user/456">User456</router-link>
    </header>
    <router-view></router-view>   
  </div>
</template>
```

这时在页面中点击user123 和user456, 可以看到它们都导航到user组件，配置正确。 　

### 获取动态部分

在动态路由中，怎么获取到动态部分？ 因为在组件中是可以显示不同部分的，就是上面提到的“你的名字”。
其实，当整个vue-router 注入到根实例后，在组件的内部，可以通过this.$route 来获取到 router 实例。
它有一个params 属性，就是来获得这个动态部分的。它是一个对象，属性名，就是路径中定义的动态部分 id,
 属性值就是router-link中to 属性中的动态部分，如123。使用vuex时，组件中想要获取到state 中的状态，
 是用computed 属性，在这里也是一样，在组件中，定义一个computed 属性dynamicSegment， user 组件修改如下：

 ```html
 <template>
    <div>
        <h1>User</h1>
        <div>我是user组件, 动态部分是{{dynamicSegment}}</div>
    </div>
</template>
<script>
    export default {
        computed: {
            dynamicSegment () {
                return this.$route.params.id
            }
        }
    }
</script>
 ```
### 监听动态路由切换

这里还有最后一个问题，就是动态路由在来回切换时，由于它们都是指向同一组件，vue不会销毁再创建这个组件，而是复用这个组件，就是当第一次点击（如：user123）的时候，vue 把对应的组件渲染出来，但在user123, user456点击来回切换的时候，这个组件就不会发生变化了，组件的生命周期不管用了。这时如果想要在组件来回切换的时候做点事情，那么只能在组件内部（user.vue中）利用watch 来监听$route 的变化。把上面的代码用监听$route 实现

```html
<script>
    export default {
        data () {
            return {
                dynamicSegment: ''
            }
        },
        watch: {
            $route (to,from){
                // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
                console.log(to);
                console.log(from);
                this.dynamicSegment = to.params.id
            }
        }
    }
</script>
```

## 嵌套路由

嵌套路由，主要是由我们的页面结构所决定的。当我们进入到home页面的时候，它下面还有分类，如手机系列，平板系列，电脑系列。
当我们点击各个分类的时候，它还是需要路由到各个部分，如点击手机，它肯定到对应到手机的部分。

在路由的设计上，首先进入到 home ,然后才能进入到phone, tablet, computer.  Phone, tablet, compute 
就相当于进入到了home的子元素。所以vue  提供了childrens 属性，它也是一组路由,相当于我们所写的routes。

首先，在home页面上定义三个router-link 标签用于导航，然后再定义一个router-view标签，用于渲染对应的组件。
router-link 和router-view 标签要一一对应。home.vue 组件修改如下：

```html
<template>
    <div>
        <h1>home</h1>
<!-- router-link 的to属性要注意，路由是先进入到home,然后才进入相应的子路由如 phone,所以书写时要把 home 带上 -->
        <p>
            <router-link to="/home/phone">手机</router-link>
            <router-link to="/home/tablet">平板</router-link>
            <router-link to="/home/computer">电脑</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>
```
phone.vue tablet.vue computer.vue都是下面这个模板
```html
<template>
    <div>
        <h1>phone</h1>
        <p>{{msg}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: "phone 组件"
            }
        }
    }
</script>
```

index.js 配置路由，修改如下：
```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from "@/components/home.vue"
import about from "@/components/about.vue"
import user from "@/components/user.vue"
import phone from "@/components/phone.vue"
import tablet from "@/components/tablet.vue"
import computer from "@/components/computer.vue"

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: "/home",
      component: home,
      // 子路由
      children: [
        {
          path: "phone",
          component: phone
        },
        {
          path: "tablet",
          component: tablet
        },
        {
          path: "computer",
          component: computer
        }
      ]
    },
    {
      path: "/about",
      component: about
    },
    {
      path: "/",
      redirect: "/home"
    },
     {
      path: "/user/:id",
      component: user
    }

  ]
})

```

这时当我们点击home 时，它下面出现手机等字样，但没有任何对应的组件进行显示，这通常不是我们想要的。要想点击home时，要想渲染相对应的子组件，那还需要配置一条路由。当进入到home 时，它在children中对应的路由path 是空 ‘’，完整的childrens 如下：

```js
      children: [
        {
          path: "phone",
          component: phone
        },
        {
          path: "tablet",
          component: tablet
        },
        {
          path: "computer",
          component: computer
        },    // 当进入到home时，下面的组件显示
        {
            path: "",
            component: computer
        }
      ]
```

## 命名路由

命名路由，很简单，因为根据名字就可以知道，这个路由有一个名字，那就直接给这个路由加一个name 属性，就可以了。 给user 路由加一个name 属性：

```js
{
        path: "/user/:id",
        name: "user",
        component: user
}
```

　命名路由的使用, 在router-link 中to 属性就可以使用对象了, 

```html
 <router-link to="/user/123">User123</router-link> // 和下面等价 
 <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>   // 当使用对象作为路由的时候，to前面要加一个冒号,表示绑定
```

编程式导航：这主要应用到按钮点击上。当点击按钮的时候，跳转另一个组件, 这只能用代码，调用rourter.push() 方法。 
当们把router 注入到根实例中后，组件中通过 this.$router 可以获取到router, 所以在组件中使用

```js
this.$router.push("home"), 就可以跳转到home界面
```