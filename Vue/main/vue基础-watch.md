# watch

侦听data里面的一个属性，根据这个的变化，执行相应的方法

```html
<div id="app">
    <input type="text" v-model="message" />
    <div>{{message}}</div>
</div>
<script type="text/javascript">
    var content = new Vue({
        el: "#app",
        data: {
            message: ''
        },
        watch: {
            message: (newValue, oldValue) => {
                console.log(oldValue + "\n" + newValue);
                if (newValue == '110' || newValue == 'SOS') {
                    alert("You are in danger!");
                }
            }
        }
    })
</script>
```