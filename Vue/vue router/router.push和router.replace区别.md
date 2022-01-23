

# VUE的两种跳转push和replace对比区别

### router.push(location)

在vue.js中想要跳转到不同的 URL，需要使用 router.push 方法。

这个方法会向 history 栈添加一个新的记录，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击

```apache
<router-link> 
```

时，这个方法会在内部调用，所以说，点击

```elixir
<router-link :to="..."> 
```

等同于调用

```gcode
router.push(...) 
```

**声明式**：

```elixir
<router-link :to="..."> 
```

**编程式**：router.push(...)//该方法的参数可以是一个字符串路径，或者一个描述地址的对象。

```awk
// 字符串
router.push('home')
// 对象
this.$router.push({path: '/login?url=' + this.$route.path});
// 带查询参数，变成/backend/order?selected=2
this.$router.push({path: '/backend/order', query: {selected: "2"}});
// 命名的路由
router.push({ name: 'user', params: { userId: 123 }}) 
```

### router.replace(location)

设置 replace 属性（默认值: false）的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。即使点击返回按钮也不会回到这个页面。

> 加上replace: true后，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

```xquery
//声明式：
<router-link :to="..." replace></router-link>
// 编程式:
router.replace(...)
//push方法也可以传replace
this.$router.push({path: '/home', replace: true})
```

### 传参两种方式

**使用query:**

```stylus
this.$router.push({
 path: '/home',
 query: {
 site: [],
 bu: []
}
}) 
```

**使用params:**

```stylus
this.$router.push({
  name: 'Home',  // 路由的名称
  params: {
    site: [],
    bu: []
}
}) 
```

**params**：/router1/:id ，/router1/123，/router1/789 ,这里的id叫做params

**query**：/router1?id=123 ,/router1?id=456 ,这里的id叫做query。

### 两者都可以传递参数，区别是什么？

1. query 传参配置的是path，而params传参配置的是name，在params中配置path无效
2. query在路由配置不需要设置参数，而params必须设置
3. query传递的参数会显示在地址栏中
4. params传参刷新会无效，但是query会保存传递过来的值，刷新不变 ;

5.路由配置：

query 的写法

```ldif
{
path: '/home',
name: Home,
component: Home
} 
```

params写法：

```ldif
{
path: '/home/：site/:bu',
name: Home,
component: Home
}
```

> 如果路由上面不写参数，也是可以传过去的，但不会在url上面显示出你的参数，并且当你跳到别的页面或者刷新页面的时候参数会丢失，那依赖这个参数的http请求或者其他操作就会失败

6,获取路由参数

在接收的跳转的页面

```lasso
created () {
let self = this
self.getParams()
},
watch () {
'$route': 'getParams'
},
methods: {
  getParams () {
  let site = this.$route.query.site
  let bu = this.$route.query.bu
  // 如果是params 传参，那就是this.$route.params.site
  上面就可以获取到传递的参数了
 }
}
```

> 注意：获取路由上面的参数，用的是$route，后面没有r
>
> params是路由的一部分,必须要有。query是拼接在url后面的参数，没有也没关系。
>
> params一旦设置在路由，params就是路由的一部分，如果这个路由有params传参，但是在跳转的时候没有传这个参数，会导致跳转失败或者页面会没有内容。
>
> params、query不设置也可以传参，但是params不设置的时候，刷新页面或者返回参数会丢失，query并不会出现这种情况，这一点的在上面说过了

### 最后总结：

路由传递参数和传统传递参数是一样的，命名路由类似表单提交而查询就是url传递，在vue项目中基本上掌握了这两种传递参数就能应付大部分应用了，最后总结为以下：

1.命名路由搭配params，刷新页面参数会丢失

2.查询参数搭配query，刷新页面数据不会丢失

3.接受参数使用this.$router后面就是搭配路由的名称就能获取到参数的值