HTML标签笔记
========
# HTML5 定义带有语义和结构化的标签
这些带有 **语义** 的标签很多技术上与`<div>`和`<span>`类似是没有自带格式的，但有一定含义，有利于搜索引擎的索引整理、小屏幕装置和视障人士使用等  

* `<nav>`标签定义导航链接的部分  
* `<article>`标签定义外部的内容。比如来自一个外部的新闻提供者的一篇新的文章，或者来自 blog 的文本，或者是来自论坛的文本。亦或是来自其他外部源内容。  
* `<header>`标签定义文档的页眉  
* `<footer>`标签定义文档的页脚
* `<section>`标签定义文档中的节。比如章节、页眉、页脚或文档中的其他部分  
* `<aside>`标签定义`<article>`以外的相关内容。可用作文章的侧栏  
* `<time>`标签定义日期或时间，或者两者  

> [Html5新标签解释及用法](http://www.cnblogs.com/yuzhongwusan/archive/2011/11/17/2252208.html)   
> 结构图仅供参考  
> ![HTML5结构图](http://img.my.csdn.net/uploads/201301/29/1359466427_8585.jpg)

# `<figure>`与`<img>`的区别
* `<img>`标签是一个无内容元素，其有两个重要的属性  
src属性：规定显示图片的URL  
alt属性：规定图像的替代文本（作为无法显示图像时的替代文字或者图片的文字描述）  
* `<figure>`标签规定独立的流内容，并不特指图片，也可以是一段代码、一个图表  
常用`<figcaption>`标签为`<figure>`标签添加标题  

```
<figure>
    <figcaption>好看的图片</figcaption>
    <img src="img/3.jpg" alt="好看的图片" />
<figure>
```  

> [定义图文并茂的html5新标签-figure、figcaption](http://blog.sina.com.cn/s/blog_4d50d3bb01016yp3.html)  

# `<table>`表格模型
```
<table>
    <caption>表格的标题</caption>
    <thead>
        <tr>
            <th>表头</th>
        </tr>
    </thead>
    <tfoot>
    <tr>
    <td>表脚</td>
    </tr>
    </tfoot>
    <tbody>
        <tr>
            <td>表内容</td>
        </tr>
    </tbody>
</table>
```

> [table的thead/tbody/tfoot/tr/th/td ](http://www.cnblogs.com/KeenLeung/archive/2012/09/12/2682555.html)  

# 表格边框处理
如果直接给`<table>`设置`border`属性，会有下面两个问题  

* 即使设置`border: 0`单元格之间依旧会有边距，单元格内也会有内边距  
* 设置`border`边框后，单元格之间边框会叠加，显得单元格之间的边框粗而表格最外的边框细  

**解决方案**  
首先想到的就是`cellspacing`、`cellpadding`、伪类选择第一个或者最后一个`td`特殊化等等，这个方案虽然有效，但是也很复杂，更好的 **添加样式`border-collapse: collapse`**，可以很好的解决边框问题  

> [table的border-collapse属性与border-spacing属性](http://blog.sina.com.cn/s/blog_6e60e58c0101j2y5.html)  

# `<progress>`标签
该标签用于表示任务的进度  

## 标签属性
* `max属性` - 进度条最大值  
* `value属性` - 当前进度值  

## CSS样式表最大化兼容模板
常理考虑，`color`应该为已完成进度颜色，`background-color`应该为未完成进度颜色，另外也可通过`border`调整进度条边框样式  

```
progress {
    width: 160px;
    height: 20px;
    border: 1px solid #0064B4;  
    background-color: #e6e6e6;
    color: #0064B4; /* IE10 */
}
progress::-moz-progress-bar { background: #0064B4; } /* FF */
progress::-webkit-progress-bar { background: #e6e6e6; } /* chrome */
progress::-webkit-progress-value  { background: #0064B4; } /* chrome */
```

> [HTML5 progress元素的样式控制、兼容与实例](http://www.zhangxinxu.com/wordpress/2013/02/html5-progress-element-style-control/)  
