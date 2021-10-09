# v-for

参考链接 [Vue指令之 v-for的使用](https://blog.csdn.net/xukongjing1/article/details/81584890)

## 迭代普通数组

```html
data : {
    list : [1,2,3,4,5,6]
}
```
在html中使用v-for指令渲染
```html
<p v-for="(item,i) in list">索引值: {{i}}  每一项：{{item}}</p>
```

## 迭代对象数组

```html
data:{
    listObj: [
        { id: 1, name: 'zs1' },
        { id: 2, name: 'zs2' },
        { id: 3, name: 'zs3' },
        { id: 4, name: 'zs4' },
        { id: 5, name: 'zs5' },
        { id: 6, name: 'zs6' },
    ]
    }
```

```html
<p v-for="(user,i) in listObj">id: {{user.id}} name: {{user.name}}</p>
```

## 迭代对象

```
data:{
      user:{
        id:1,
        name:'托尼.贾',
        gender:'男'
      }
}
```

```html
<p v-for="(val, key) in user">键是：{{key}}  值是：{{val}}</p>
```
没有代表序号的i

## 迭代数字

```html
<!-- 注意：如果使用v-for迭代数字的话，前面 count 的值从 1 开始-->
<p v-for="count in 10">这是第{{count}}次循环</p>
```

## key的使用

参考链接：

[VUE中演示v-for为什么要加key](https://www.jianshu.com/p/4bd5e745ce95)

[Vue: v-for的键值key](https://blog.csdn.net/qq_41609404/article/details/84064064)

key的使用，在数据list变化的时候，重新渲染变化的元素，减少元素复用，这样的话，

不使用key，选中一项后，前面勾选的位置，不会变
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
        <input type="text" v-model="name">
        <button @click="add">添加</button>
        <ul>
            <li v-for="(item, i) in list">
                <input type="checkbox"> {{item.name}}
            </li>
        </ul>
    </div>

    <script>
        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: {
                name: '',
                newId: 3,
                list: [
                    { id: 1, name: '李斯' },
                    { id: 2, name: '吕不韦' },
                    { id: 3, name: '嬴政' }
                ]
            },
            methods: {
                add() {
                    //注意这里是unshift
                    this.list.unshift({ id: ++this.newId, name: this.name })
                    this.name = ''
                }
            }
        });
    </script>
</body>

</html>
```

添加了key后，就不一样了
```html
<ul>
    <li v-for="(item, i) in list" :key="item.id">
        <input type="checkbox"> {{item.name}}
    </li>
</ul>
```