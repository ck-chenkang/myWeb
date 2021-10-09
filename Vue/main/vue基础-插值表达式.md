# 插值表达式

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
        <!-- 字符串 -->
        <p>{{ str }}</p> <!--页面展示：字符串-->
        <p>{{ num + 'aaa'}}</p><!--页面展示：1aaa-->
        <p>{{ str.length }}</p> <!--页面展示：3-->
        
        <!-- 数值 -->
        <p>{{ num }}</p> <!--页面展示：1-->
        <p>{{ num+num1 }}</p> <!--页面展示：101-->
        <p>{{ num > num1 }}</p>  <!--页面展示：false-->
        <p>{{ num.toFixed(2) }}</p> <!--页面展示：1.00-->
        
        <!-- boolean -->
        <p>{{ flag }}</p> <!--页面展示：true-->
        
        <!-- 数组 -->
        <p>{{ arr }}</p> <!--页面展示：[1,2,3,4]-->
        <p>{{ arr[3] }}</p> <!--页面展示：4-->

        <!-- 对象 -->
        <p>{{ obj }}</p> <!--页面展示：{ "name": "tom", "age": 20 }-->
        <p>{{ obj.name }}</p> <!--页面展示：tom-->
        
        <!-- null/undefined/NaN -->
        <p>{{ arg1 }}</p> <!--页面展示：-->
        <p>{{ arg2 }}</p> <!--页面展示：-->
        <p>{{ arg3 }}</p> <!--页面展示：NaN-->

        <!-- 三目运算符 -->
        <p>{{ num > num1 ? "是" : "否" }}</p> <!--页面展示：否-->

    </div>
    
    <script>
        new Vue({
            el:"#app",
            data:{
                str: '字符串',
                num: 1,
                num1:100,
                flag: true,
                arr: [1,2,3,4],
                obj:{
                    name:'tom',
                    age:20
                },
                arg1: null,
                arg2: undefined,
                arg3: NaN
            }
        })
    </script>
</body>
</html>
```