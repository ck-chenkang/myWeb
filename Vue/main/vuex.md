# vuex

参考链接：[VueX（Vue状态管理模式)](https://www.jianshu.com/p/2e5973fe1223)

## 准备

1. 初始化项目`vue init webpack vue-vuex-learning`
2. cd到vue-vuex-learning目录中 `npm i vuex -s`
3. cd到vue-vuex-learning/src目录下
4. 新建store文件夹，然后再文件夹内部新建index.js

## 使用

### 初始化vue-vuex-learning/src/store/index.js的内容

```js
import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
        name:'helloVueX'
    }
})

export default store
```

### 修改一系列的地方

1. 修改src/main.js为
```js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' //导入

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, //新增
  components: { App },
  template: '<App/>'
})
```
2. 修改src/App.vue
```html
<template>
  <div id="app">
    name:
    <h1>{{ $store.state.name }}</h1>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
3. 删除src/components/HelloWorld.vue
4. 修改src/router/index.js
```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/'
    }
  ]
})
```
5. npm run dev打开浏览器127.0.0.1:8080就可以看到效果

## 核心

* state 存放状态的，具体可以看上面的例子
* mutation 操作state里面的数据，修改、增加、删除
* getters
* actions

### mutation

mutations方法都有默认的形参：

([state] [,payload])

state是当前VueX对象中的state
payload是该方法在被调用时传递参数使用的

例如，我们编写一个方法，当被执行时，能把下例中的name值修改为"jack",我们只需要这样做

index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.store({
    state:{
        name:'helloVueX'
    },
    mutations:{
        //es6语法，等同edit:funcion(){...}
        edit(state){
            state.name = 'jack'
        }
    }
})

export default store
```

而在组件中，我们需要这样去调用这个mutation——例如在App.vue的某个method中:

```js
this.$store.commit('edit')
```

### mutation传值

在实际生产过程中，会遇到需要在提交某个mutation时需要携带一些参数给方法使用。

单个值提交时:

```js
this.$store.commit('edit',15)
```

当需要多参提交时，推荐把他们放在一个对象中来提交:

```js
this.$store.commit('edit',{age:15,sex:'男'})
```

接收挂载的参数：

```js
edit(state,payload){
    state.name = 'jack'
    console.log(payload) // 15或{age:15,sex:'男'}
}
```

另一种提交方式

```js
this.$store.commit({
    type:'edit',
    payload:{
        age:15,
        sex:'男'
    }
})
```

### 增删state中的成员

为了配合Vue的响应式数据，我们在Mutations的方法中，应当使用Vue提供的方法来进行操作。如果使用delete或者xx.xx = xx的形式去删或增，则Vue不能对数据进行实时响应。

Vue.set 为某个对象设置成员的值，若不存在则新增

例如对state对象中添加一个age成员

```js
Vue.set(state,"age",15)
```

Vue.delete 删除成员

将刚刚添加的age成员删除

```js
Vue.delete(state,'age')
```

### Getters

可以对state中的成员加工后传递给外界

Getters中的方法有两个默认参数

1. state 当前VueX对象中的状态对象
2. getters 当前getters对象，用于将getters下的其他getter拿来用

例如：
```js
getters:{
    nameInfo(state){
        return "姓名:"+state.name
    },
    fullInfo(state,getters){
        return getters.nameInfo+'年龄:'+state.age
    }  
}
```

组件中调用

```js
this.$store.getters.fullInfo
```

### Actions

由于直接在mutation方法中进行异步操作，将会引起数据失效。所以提供了Actions来专门进行异步操作，最终提交mutation方法。

Actions中的方法有两个默认参数

1. context 上下文(相当于箭头函数中的this)对象
2. payload 挂载参数
例如，我们在两秒中后执行前面的edit方法

由于setTimeout是异步操作，所以需要使用actions

```js
actions:{
    aEdit(context,payload){
        setTimeout(()=>{
            context.commit('edit',payload)
        },2000)
    }
}
```

在组件中调用:

```js
this.$store.dispatch('aEdit',{age:15})
```

改进

由于是异步操作，所以我们可以为我们的异步操作封装为一个Promise对象

```js
    aEdit(context,payload){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                context.commit('edit',payload)
                resolve()
            },2000)
        })
    }
```

### modules

当项目庞大，状态非常多时，可以采用模块化管理模式。Vuex 允许我们将 store 分割成模块（module）。
每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

```js
modules:{
    a:{
        state:{},
        getters:{},
        ....
    }
}
```

组件内调用模块a的状态：

```js
this.$store.state.a
```

而提交或者dispatch某个方法和以前一样,会自动执行所有模块内的对应type的方法：

```js
this.$store.commit('editKey')
this.$store.dispatch('aEditKey')
```
### 模块的细节

#### 模块中mutations和getters中的方法接受的第一个参数是自身局部模块内部的state

```js
modules:{
    a:{
        state:{key:5},
        mutations:{
            editKey(state){
                state.key = 9
            }
        },
        ....
    }
}
```

#### getters中方法的第三个参数是根节点状态

```js
modules:{
    a:{
        state:{key:5},
        getters:{
            getKeyCount(state,getter,rootState){
                return  rootState.key + state.key
            }
        },
        ....
    }
}
```

#### actions中方法获取局部模块状态是context.state,根节点状态是context.rootState

```js
modules:{
    a:{
        state:{key:5},
        actions:{
            aEidtKey(context){
                if(context.state.key === context.rootState.key){
                    context.commit('editKey')
                }
            }
        },
        ....
    }
}
```

## 模块中的使用

目录规范如下，可以去github上找个项目，看看别人怎么用的
```
store:.
│  actions.js
│  getters.js
│  index.js
│  mutations.js
│  mutations_type.js   ##该项为存放mutaions方法常量的文件，按需要可加入
│
└─modules
        Astore.js
```



