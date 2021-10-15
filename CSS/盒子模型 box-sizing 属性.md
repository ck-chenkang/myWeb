## 盒模型中的 box-sizing 属性

我们在**[之前的文章](http://www.cnblogs.com/smyhvae/p/7256371.html)**中专门讲过盒子模型。

CSS3 对盒模型做出了新的定义，即允许开发人员**指定盒子宽度和高度的计算方式**。

这就需要用到 `box-sizing`属性。它的属性值可以是：`content-box`、`border-box`。解释如下。

**外加模式：**（css的默认方式）

```
	box-sizing: content-box;
```

解释：此时设置的 width 和 height 是**内容区域**的宽高。`盒子的实际宽度 = 设置的 width + padding + border`。此时改变 padding 和 border 的大小，也不会改变内容的宽高，而是盒子的总宽高发生变化。

**内减模式：**【需要注意】

```
	box-sizing: border-box;
```

解释：此时设置的 width 和 height 是**盒子**的总宽高。`盒子的实际宽度 = 设置的 width`。此时改变 padding 和 border 的大小，会改变内容的宽高，盒子的总宽高不变。