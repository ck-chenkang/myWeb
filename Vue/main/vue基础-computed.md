# computed

参考链接：

[Vue系列之computed使用详解(附demo,不定期更新)](https://juejin.cn/post/6844903557812977672)

根据依赖变化而变化  依赖没变化就不会重新渲染；

## gettter

```html
<div id="app">
    <input type="text" v-model="message" />
    <div>{{changeMessage}}</div>
</div>
<script type="text/javascript">
    var content = new Vue({
        el: "#app",
        data: {
            message: 'hello'
        },
        computed: {
            changeMessage: {               
                get() {
                    return this.message + 'world'
                },
                set() {
                }
            }
        }

    })
</script>
```

## setter

当fullName被赋值的时候，会执行set里面的函数

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

## 缓存

依赖不发生变化的时候，计算属性就不会变化，多次访问它，都是去访问它的缓存值。

## 和watch的区别

个人理解：
computed，一个属性，依赖多个属性，多个属性中任意一个变化，就变化
watch，监听一个属性，这个特定的属性变化，就执行watch里面的方法