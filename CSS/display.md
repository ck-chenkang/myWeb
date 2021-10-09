# display

参考链接：

[CSS display 属性](https://www.w3school.com.cn/cssref/pr_class_display.asp)

[CSS display详解](https://www.cnblogs.com/luweiweicode/p/14743491.html)

## 概述

| 默认值：          | inline                          |
| ----------------- | ------------------------------- |
| 继承性：          | no                              |
| 版本：            | CSS1                            |
| JavaScript 语法： | *object*.style.display="inline" |

可能的值：

<span style="color:red">整篇文章没有display:flex这个属性</span>

| 值                 | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| none               | 此元素不会被显示。                                           |
| block              | 此元素将显示为块级元素，此元素前后会带有换行符。             |
| inline             | 默认。此元素会被显示为内联元素，元素前后没有换行符。         |
| inline-block       | 行内块元素。（CSS2.1 新增的值）                              |
| list-item          | 此元素会作为列表显示。                                       |
| run-in             | 此元素会根据上下文作为块级元素或内联元素显示。               |
| compact            | CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| marker             | CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| table              | 此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。 |
| inline-table       | 此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。 |
| table-row-group    | 此元素会作为一个或多个行的分组来显示（类似 <tbody>）。       |
| table-header-group | 此元素会作为一个或多个行的分组来显示（类似 <thead>）。       |
| table-footer-group | 此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。       |
| table-row          | 此元素会作为一个表格行显示（类似 <tr>）。                    |
| table-column-group | 此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。    |
| table-column       | 此元素会作为一个单元格列显示（类似 <col>）                   |
| table-cell         | 此元素会作为一个表格单元格显示（类似 <td> 和 <th>）          |
| table-caption      | 此元素会作为一个表格标题显示（类似 <caption>）               |
| inherit            | 规定应该从父元素继承 display 属性的值。                      |

## 1.解释一下display的几个常用的属性值，inline ， block， inline-block

- inline（行内元素）:
  - 使元素变成行内元素，拥有行内元素的特性，即可以与其他行内元素共享一行，不会独占一行. 
  - 不能更改元素的height，width的值，大小由内容撑开. 
  - 可以使用padding上下左右都有效，margin只有left和right产生边距效果，但是top和bottom就不行.

- block（块级元素）:
  - 使元素变成块级元素，独占一行，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度. 
  - 能够改变元素的height，width的值.* 
  - 可以设置padding，margin的各个属性值，top，left，bottom，right都能够产生边距效果.*

-  inline-block（融合行内于块级）:
  - 结合了inline与block的一些特点，结合了上述inline的第1个特点和block的第2,3个特点.
  - 用通俗的话讲，就是**不独占一行的块级元素**。如图:

 ![img](https://img2020.cnblogs.com/blog/2207886/202105/2207886-20210508083455144-1687490261.png)

## inline-block布局 vs 浮动布局

不同之处：对元素设置display：inline-block ，元素不会脱离文本流，而float就会使得元素脱离文本流，且还有父元素高度坍塌的效果

相同之处：能在某程度上达到一样的效果

![img](https://img2020.cnblogs.com/blog/2207886/202105/2207886-20210508083713303-381975049.png)

 乍一看两个都能做到几乎相同的效果，（仔细看看display：inline-block中有间隙问题，这个留到下面再讲）

**浮动布局不太好的地方：**参差不齐的现象，我们看一个效果：

![img](https://img2020.cnblogs.com/blog/2207886/202105/2207886-20210508084625598-2010618647.png)

 从图3,4可以看出浮动的局限性在于，若要元素排满一行，换行后还要整齐排列，就要子元素的高度一致才行，不然就会出现图三的效果，而inline-block就不会。

### **3.inline-block存在的小问题：**

上面可以看到用了display:inline-block后，存在间隙问题，间隙为4像素，这个问题产生的原因是换行引起的，因为我们写标签时通常会在标签结束符后顺手打个回车，

 而回车会产生回车符，回车符相当于空白符，通常情况下，多个连续的空白符会合并成一个空白符，而产生“空白间隙”的真正原因就是这个让我们并不怎么注意的空白符。

**去除空隙的方法：**

1.对父元素添加，{font-size:0}，即将字体大小设为0，那么那个空白符也变成0px，从而消除空隙
　　现在这种方法已经可以兼容各种浏览器，以前chrome浏览器是不兼容的

![img](https://img2020.cnblogs.com/blog/2207886/202105/2207886-20210508084808461-380413102.png)

**4.总结:**

　　display：inline-block的布局方式和浮动的布局方式，究竟使用哪个，我觉得应该根据实际情况来决定的：
　　a.对于横向排列东西来说，我更倾向与使用inline-block来布局，因为这样清晰，也不用再像浮动那样清除浮动，害怕布局混乱等等。
　　b.对于浮动布局就用于需要文字环绕的时候，毕竟这才是浮动真正的用武之地，水平排列的是就交给inline-block了。