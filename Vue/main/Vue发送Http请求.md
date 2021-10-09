# Vue发送Http请求

参考链接：[vue-resource与axios的区别与使用](https://blog.csdn.net/wl516372370/article/details/107267829)

CSDN高收藏[vue-axios的使用及其get与post网络请求](https://blog.csdn.net/qq_41115965/article/details/80780264)

有两种方式，一种是试用vue-rousource，还有一种是使用axios，因为vue2.0之后，官方就不再更新vue-resource，
目前主流的都是通过axios，所以下面使用axios

## Axios使用方式————组件内部使用

### 初始化项目
```
vue init webpack vue-http-learning //注意，这里会新建一个名为vue-http-learning的文件夹

cd vue-heep-learning
```
### 安装及引入

#### 安装axios  

`npm install axios --save`

#### main.js中引入axios

```js
import Axios from 'axios'

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'http://127.0.0.1:3000' //这个可以解决axios跨端口访问的问题，不是解决跨域的哦

```

### 使用Get

#### vue route修改如下

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/hello"
    },
    {
      path: '/hello',
      component:HelloWorld
    }
  ]
})

```
#### HelloWorld.vue

```vue
<template>
<div>
    <h1>{{ msg }}</h1>
</div>

</template>

<script>
var _self;

export default {
  data () {
    return {
      msg: ''
    }
  },
  methods:{
  getData(){
    this.$axios.get("/hello").then(
      (response) => {
        this.msg = response.data;
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }
  },
  created(){
    _self = this;
  },
  mounted(){
    _self.getData();
  }
}
</script>

<style>

</style>
```

#### nodeJS express主程序

```js
const express = require('express')
const app = express()
const port = 3000

//express中设置cross访问限制
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

### 使用Post

#### 后端app.js

参考链接 [Express全系列教程之(四)：获取Post参数的两种方式](https://www.cnblogs.com/lpxj-blog/p/10673441.html)

为了获取到body里面的数据，需要在express项目中添加一个插件
`install body-parser --save`

```js
const express = require('express')
const app = express()
const port = 3000

const bodyParser=require("body-parser");
// 解析以 application/json 提交的数据
var jsonParser = bodyParser.json();

//express中设置cross访问限制
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式  
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

app.post('/areYouOk', jsonParser,function (req, res) {

  console.log(req.body);
  res.send("I'm Fine!");

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

#### 路由index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AreYouOk from '@/components/AreYouOk'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/areYouOk"
    },
    {
      path: '/hello',
      component:HelloWorld
    },
    {
      path: '/areYouOk',
      component:AreYouOk
    }
  ]
})
```

#### 新建AreYouOk.vue

```vue
<template>
  <div>
    <input type="button" value="Are you Ok?" @click="senData" />
    <h1>我的回答: {{msg}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    senData() {
      this.$axios
        .post("/areYouOk", {
          firstName: "陈",
          lastName: "康",
        })
        .then((response) => { //不要用 function(response){} ，这种方式不行
          console.log(response);
          this.msg = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>

```
