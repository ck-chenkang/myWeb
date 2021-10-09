# v-html

`<div v-html="rawHtml"></div>`会被渲染成
```html
<div>
    <span style="color:red">用了v-html，这里就会被渲染进Dom了</span>
</div>
```

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
        <p>插值表达式: {{rawHtml}}</p>
        <p>v-html: <div v-html="rawHtml"></div></p>

    </div>
    
    <script>
        new Vue({
            el:"#app",
            data:{
                rawHtml : '<span style="color:red">用了v-html，这里就会被渲染进Dom了</span>'
            }
        })
    </script>
</body>
</html>
```

