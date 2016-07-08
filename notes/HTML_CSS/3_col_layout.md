三栏式布局
========
通常来说，三栏式最基本要解决的是 **左右两侧固定宽度，中间列自适应宽度**，另外根据浏览器从上至下的渲染原理，通常中间栏才是最主要的内容，最好能在DOM结构上 **将中间栏放在更前面**  

# 最简单的左右中
中间栏需要自适应宽度，自然想到块级元素特性，但正因为这种独占一行的特性，只能将左右提前并且两边浮动，而中放最后做自适应宽度  
另外就是要注意下清除浮动、中栏设置左右边距等...  

[demo](http://htmlpreview.github.io/?https://github.com/Cmd-Cmd/cmd-cmd.github.io/blob/master/notes/HTML_CSS/demo/layout/float.html)  

# 圣杯布局
被称为经典布局，好像可以兼容到IE6的神一般布局，关键词就是 **左浮动** 和 **负边距** ，其实到现在都还有点蒙逼，以下都是个人看法  
首先是将三列都左浮动，中间栏宽度100%，父容器左右内边距与左右两栏同宽  
因为是浮动元素，本来三列都是在一行的，不过因为中间栏宽度100%，所以左右两列被挤到下一行了，这时候需要把左栏拉回来就需要`margin-left: -100%`，然后再来个相对自身定位`left: -Xpx`，就能把左列放到父容器的左内边距那里了  
右栏也需要拉回来，不过不用拉到左边，用`margin-left: -Ypx`拉到右边就好，同样相对自身定位`right: Ypx`  

[demo](http://htmlpreview.github.io/?https://github.com/Cmd-Cmd/cmd-cmd.github.io/blob/master/notes/HTML_CSS/demo/layout/float.html)  

# 双飞翼布局
双飞翼布局始于淘宝UED，和圣杯布局很像，不过并不是相对定位和父容器内边距给侧边栏腾出位置的，而是通过给中间列再套一个标签并添加外边距实现的  

[demo](http://htmlpreview.github.io/?https://github.com/Cmd-Cmd/cmd-cmd.github.io/blob/master/notes/HTML_CSS/demo/layout/flyingSwing.html)  

# 使用CSS3弹性布局flex
这个没什么好说的，`flex-basis`规定必须宽度，`flex-grow`分配多余宽度，`order`规定顺序  
不过要注意加上前缀增大兼容性  

[demo](http://htmlpreview.github.io/?https://github.com/Cmd-Cmd/cmd-cmd.github.io/blob/master/notes/HTML_CSS/demo/layout/flex.html)  

--------

# 资料整理
> [CSS布局 -- 圣杯布局 & 双飞翼布局](http://www.cnblogs.com/imwtr/p/4441741.html)  
