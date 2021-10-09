# vue生命周期

参考链接：

[vue生命周期](https://www.jianshu.com/p/410b6099be69)

## vue生命周期是什么

vue每个组件都是独立的，每个组件都有一个属于它的生命周期，从一个组件**创建、数据初始化、挂载、更新、销毁**，这就是一个组件所谓的生命周期。在组件中具体的方法有:

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

![img](https://upload-images.jianshu.io/upload_images/13119812-5890a846b6efa045.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

## vue生命周期在项目中的执行顺序

```vue
假设vue el实例中有一个rendered变量
data () {

    return {

    rendered: false,

}
}

1.
beforebeforeCeate(){
    console.log(this.rendered);    // undefined  
}
```

![img](https://upload-images.jianshu.io/upload_images/13119812-5727fdabcfab0a7c.png?imageMogr2/auto-orient/strip|imageView2/2/w/530/format/webp)

```
2.
created() {

    console.log(this.$el);//undefined

    console.log(this.rendered);  // false

}
```

```
3. 
beforeMount() {

    console.log(this.$el)；//undefined

}

4. 
mounted(){
 console.log(this.$el);
}
```

![img](https://upload-images.jianshu.io/upload_images/13119812-095add76ef7c1953.png?imageMogr2/auto-orient/strip|imageView2/2/w/536/format/webp)

```
5. 
beforeDestroy(){

    console.log(this.$el);

    console.log(this.rendered); //false

}
```

![img](https://upload-images.jianshu.io/upload_images/13119812-4980a396e64eee6e.png?imageMogr2/auto-orient/strip|imageView2/2/w/535/format/webp)

```
6.
destroyed() {

    console.log(this.$el);

    console.log(this.rendered); // false

}
```

![img](https://upload-images.jianshu.io/upload_images/13119812-c8feee355871be70.png?imageMogr2/auto-orient/strip|imageView2/2/w/538/format/webp)

## vue中内置的方法 属性和vue生命周期的运行顺序（methods、computed、data、watch、props)

从第一二点可知道**data的初始化**是在**created时**已经完成数据观测(data observer)，并且诸如**methods、computed属性 props等已经初始化**；

### data props computed watch methods他们之间的生成顺序是什么呢？

vue源码

![img](https://upload-images.jianshu.io/upload_images/13119812-551024dfb2fe9961.png?imageMogr2/auto-orient/strip|imageView2/2/w/477/format/webp)

**props => methods =>data => computed => watch**; 

## 自己构造的方法与vue生命周期的运行顺序 如show这些

 往往我们在开发项目时都经常用到 $refs 来直接访问子组件的方法，但是这样调用的时候可能会导致数据的延迟滞后的问题，则会出现bug。

解决方法则是推荐采取**异步回调**的方法，然后传参进去，严格遵守vue的生命周期就可以解决 推荐 es6 的promise。

示例代码：

```
handleAsync () {

    return new Promise(resolve=>{

       const res="";

        resolve(res)

})

}

...

async handleShow() {

    await this.handleAsync().then(res=>{

    this.$refs.child.show(res);

})
}
```

## 总结

ue 的生命周期，总得来说就是实例的创建和销毁这段时间的一个机制吧。也是vue框架的数据间的交互通信。其实现在看来也没那么难，但是vue的源码实现这一套机制那是难得一逼，涉及到复杂的算法如**diff算法**。

