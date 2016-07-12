纯CSS制作简单几何图形  
========
在网页中我们经常看到三角形、梯形、多角形等小巧精美的元素，这些简单的几何图形其实并不需要图片模拟，而直接通过纯CSS编写就可以得到  

# 原理
`border`属性设置的边框是由梯形组成的，可以尝试把`border`的值设置得大些，就能明显看到了(讲道理，如果是长方形的话怎么保证对称平衡...)  
这些梯形的短边是由内容决定的，也就是`width`和`height`，那么当短边为0的时候，这些梯形就变成三角形了  
这些梯形的长边是由相邻两边粗细和短边决定的，比如左10px+右5px+短边20px那么长边就是10+5+20=35px  
主要原理就是那个梯形，再加上边框颜色透明、定位等样式就可以构造出各种各样的几何图形了(按理说，既然都有任意三角形了，那么还有什么图形不能出来呢...)   

# 更多拓展
上面原理说了梯形、三角形等这种有棱有角的图形，那么像圆形、椭圆形这些非棱角图形呢? 就需要借助到CSS的`border-radius`属性了  
`border-radius`还可以细分为四个子属性`border-top-left-radius`、`border-top-right-radius`、`border-bottom-left-radius`、`border-bottom-right-radius`  
每个子属性都含有两个值，分别代表水平和垂直上的椭圆半径(半长轴和半短轴...)  
```
border-radius: 2px 1px 3px 4px / 6px 10px
/* ↑上下等价↓ */
border-top-left-radius: 2px 6px;
border-top-right-radius: 1px 10px;
border-bottom-right-radius: 3px 6px;
border-bottom-left-radius: 4px 10px;
```

[demo](http://htmlpreview.github.io/?https://github.com/Cmd-Cmd/cmd-cmd.github.io/blob/master/notes/HTML_CSS/demo/css_graph/graph.html)  

--------

# 资料整理
> [终于搞懂了CSS实现三角形图标的原理](http://www.tuicool.com/articles/3eaINn)  
> [纯CSS写三角形-border法](http://www.cnblogs.com/blosaa/p/3823695.html)  
> [纯CSS画的基本图形（矩形、圆形、三角形、多边形、爱心、八卦等）](http://www.jb51.net/css/41448.html)  
