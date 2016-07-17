flex弹性布局
========
2009年，W3C提出了一种新的方案——Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持(IE10+)

# 使用flex
flex的使用要时刻记得添加`-webkit-`前缀，且设置了flex后，**子元素的`float`、`clear`、`vertical-align`属性都失效**  

```
/* 将容器设置为弹性盒子 */
display: flex; // 块级弹性盒子
display: inline-flex; // 内联弹性盒子
display: -webkit-flex;
display: -webkit-inline-flex;
```

# 基本概念
设置为弹性盒子的容器存在两根轴主轴(main axis)和交叉轴(cross axis)，两轴必然相互垂直  
弹性盒子内的元素成为弹性项目(flex item)，这些项目沿主轴排列，分别占据有主轴空间(main size)和交叉轴空间(cross size)  

# 设置在容器上的属性
* `flex-direction: row | row-reverse | column | column-reverse` - 主轴方向  
* `flex-wrap: nowrap | wrap | wrap-reverse` - 换行选项  
`wrap-reverse`是指向上换行，也就是第一行在下面  
* `justify-content: flex-start | flex-end | center | space-between | space-around` - 主轴对齐方式  
`space-between`是两端对齐，项目 **间距** 离相等，最边上的项目贴边容器  
`space-around`是项目 **两侧距离** 相等，所以项目之间的距离会比最边上的项目与容器的距离大  
* `align-items: flex-start | flex-end | center | baseline | stretch` - 交叉轴对齐方式  
`baseline`是项目第一行文字基线对齐  
`stretch`是(当主轴上高度为auto时)占满交叉轴  
* `align-content: flex-start | flex-end | center | space-between | space-around | stretch` - 多根主轴(主轴换行)时的交叉轴对齐方式  

> `flex-flow`属性是`flex-direction`和`flex-warp`的简写，默认`row nowarp`  

[demo](http://htmlpreview.github.io/?https://github.com/Cmd-Cmd/cmd-cmd.github.io/blob/master/notes/HTML_CSS/demo/flex/container.html)  

# 设置在项目上的属性
* `order` - 定义项目排列顺序，数值越小排越前(可以负值)，默认为0  
* `flex-grow` - 定义项目分配剩余空间的比例，默认为0，即不分配  
比如容器有500px的主轴空间，第一个项目用了100px，第二个项目用了200px，如果第一个项目设置`flex-grow`为3，第二个项目设置为1，则最终第一个项目占主轴100+3*50=250px，第二个项目占主轴200+1*50=250px  
* `flex-shrink` - 定义项目收缩比例，默认为1  
比如容器有500px的主轴空间，第一个项目用了300px，第二个项目用了400px，如果第一个项目设置`flex-shrink`为3，第二个项目设置为1，则最终第一个项目占主轴300-3*50=150px，第二个项目占主轴400-1*50=350px  
* `flex-basis` - 项目占据主轴空间，建议用来替代占据主轴的`height`或者`width`，默认为auto即项目本身宽度  
* `align-self: auto | flex-start | flex-end | center | baseline | stretch` - 允许单个项目有自己的交叉轴对齐方式(覆盖容器的`align-items`属性)  

> `flex`属性是`flex-grow`、`flex-shrink`和`flex-basis`的简写，默认`flex: 0 1 auto`  
> `flex: auto` - 即为`flex: 1 1 auto`  
> `flex: none` - 即为`flex: 0 0 auto`  

[demo](http://htmlpreview.github.io/?https://github.com/Cmd-Cmd/cmd-cmd.github.io/blob/master/notes/HTML_CSS/demo/flex/items.html)  

--------

# 资料整理
> [Flex 布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)  
