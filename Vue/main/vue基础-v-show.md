# v-show

`v-show=""`双引号后面可以跟
- bool类型的值
- 返回bool类型的表达式
- 三元运算符
- data数据

## bool类型的值

`<h1 v-show="true">v-show使用方法</h1>`

## 返回bool类型的表达式

`<h1 v-show="(1+1) == 3">v-show使用方法</h1>`

## 三元运算符

`<h1 v-show="(1 + 1) == 2? true : false">v-show使用方法</h1>`

## data数据

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
        <h1 v-show="boolPar">v-show使用方法</h1>
    </div>
    
    <script>
        new Vue({
            el:"#app",
            data:{
                boolPar : false
            }
        })
    </script>
</body>
</html>
```

## 要点

1. v-show是切换内联样式，display:none，这个属性实现显示和隐藏的，Dom开销小
2. v-show，不可以用在组件上，不支持<template>语法，v-if支持


