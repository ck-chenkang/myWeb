# 过滤器

对文本进行格式化，支持串联

```html
<div id="app">
    <input type="text" v-model="message" />
    <div>{{message | fil1 | fil2}}</div>
</div>
<script type="text/javascript">
    var content = new Vue({
        el: "#app",
        data: {
            message: 'hello'
        },
        filters: {
            fil1: (value) => {
                return value + " world";
            },
            fil2: (value) => {
                return value + "!";
            }
        }
    })
</script>
```

组件内的filter

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

