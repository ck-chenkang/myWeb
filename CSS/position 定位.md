# CSS中的四种定位以及top和margin-top的区别

参考链接：

[CSS中的四种定位以及top和margin-top的区别](https://blog.csdn.net/qq_40935723/article/details/100182374)

<span style="color:red">这个文章里每一个字都不要放过</span>

**CSS中一共有四种定位分别是默认，相对，绝对，固定**

1，**position：static**，这种定位是默认的，一般没什么实际的作用。

2，**position：relative**,相对定位 ，**不会脱离文档流**，类似于static，按顺序排列，一般设置也不会有什么变化，可以通过margin-top/right/bottom/left来改变框的位置

3，**position：absolute**，绝对定位，这种定位**脱离文档流**，可以理解为跟其他的元素不再一个次元中，可以用top/right/bottom/left来控制位置，**absolute是相对于最近祖先非static定位来定位的**，如果说他的父级定位是默认的，那么他就会继续向上找父级的父级，直到找到非static定位为基准点，比如在下面的代码中

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 规定字符集的编码为utf-8 -->
    <meta charset="utf-8">
    <style type="text/css">
   .div1{
        position: relative;
        width: 400px;
        height: 400px;
        border:2px solid red;
        margin:50px;
    }
    .div2{
        width: 200px;
        height: 200px;
        margin:50px;
        border:2px solid pink;
    }
    .div3{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100px;
        height: 100px;
        border:2px solid purple;
    }
    </style>
</head>
<body>
	<div class="div1">
    	<div class="div2">
        	<div class="div3"></div>
    	</div>
	</div>
</body>
</html>

```

结果如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019090113183314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwOTM1NzIz,size_16,color_FFFFFF,t_70)

图中的黑色边框的就是div3，我们可以看到top：0之后的位置在div1的左上角，但是div1是他父级的父级，但是我们要是给div2设置了position：relative之后会是怎样的结果呢？

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190901132022335.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwOTM1NzIz,size_16,color_FFFFFF,t_70)

我们可以看到div3现在定位到了div2的左上角，可见absolute在div2是relative定位之后起到了这样的作用，可以尝试一下，非父级是其他的两个定位之后的结果。

4，position：fixed，固定定位，**脱离文档流**，这种定位是相对与浏览器的窗口来定位，我们经常会看到网页中右下角有个回顶部的标记，无论鼠标滑轮怎么滑动他都不会改变他的位置。

**以上是我们的4种定位，下来说一点相关的的东西，我们经常会用到position：absolute，他是脱离文档流的不会对文档中的其他布局产生影响，absolute定位下的float：left/right是不起作用的，通常我们会在absolute下用top/right/bottom/left来改变他的位置，很多人认为只有绝对定位下top/right/bottom/left才起作用，其实不然，relative定位之下这几个属性也是可以使用的，在这种情况下这几个属性和margin-top/right/bottom/left的作用是类似的，都可以来改变盒子的位置，那么在relative定位下top和margin-top有什么关系呢？**

我们在上面的代码下去掉原来的div3，新加一个盒子div4并且这个盒子和div2是兄弟关系，div2和div4都使用position：relative，代码如下

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 规定字符集的编码为utf-8 -->
    <meta charset="utf-8">
    <style type="text/css">
  .div1{
        position: relative;
        width: 400px;
        height: 400px;
        border:2px solid red;
        margin:50px;
    }
    .div2{
        width: 200px;
        height: 200px;
        position: relative;
        margin-left: 100px;
        border:2px solid pink;

    }
    .div4{
        position: relative;
        width: 100px;
        height: 100px;
        border:2px solid black;
        margin-left:100px;
    }
    </style>
</head>
<body>
<div class="div1">
    <div class="div2"></div>
    <div class="div4"></div>
</div>
</body>
</html>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190901132535209.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwOTM1NzIz,size_16,color_FFFFFF,t_70)

图中的黑色边框的是div4，他的上边框现在距离是0，下来给他设置，margin-top:50px或者top:50px都会使div4向下移动50px，同时设置后向下移动100px，如果只设置margin-top:50px后，我们按F12进入开发者环境中可以看到这样的结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190901132623220.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwOTM1NzIz,size_16,color_FFFFFF,t_70)

也就是说设置margin-top后这个50px属于盒子模型中的一部分，但是如果我们设置了top：50px后会出现这样的结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190901132642105.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwOTM1NzIz,size_16,color_FFFFFF,t_70)

我们可以看到这个50px不属于盒子模型的一部分，他只是用定位来位移了一部分位置，这也就是relative定位下它俩的区别，并且top/right/bottom/left在relative下也可以使用，但是在默认定位下是不起作用的。

### 有什么用

- 修改元素的位置
- 