使用SVG制作热区图
========

> 前两大段都是闲侃，正文可从【准备工作】开始看  

# 关于SVG
SVG(Scalable Vector Graphics)是可缩放 **矢量图形** ，矢量图与常见的位图(bitmap)的区别就在于对图形的定义，位图是精确到每一个像素是什么颜色，而矢量图仅是对图形特征(比如一条直线的起点和终点)描述  
因为位图其实是很多小方格拼在一起，将其放大后就能看到一个一个小像素点了，这也是为什么斜线会有锯齿了；而矢量图因为定义的图形特征，无论怎样缩放都能保证图形边缘的平滑准确  
个人认为，位图可以表现出更复杂的图形，但是越高清(高分辨率)的图形自然也就越复杂，但是非常有层次感，很自然；而位图可以用一些特征去表现出一幅任意分辨率的图形，自然不适合去表达复杂的图像(比如一幅风景画)，而且通常很抽象，颜色是一块一块的，但是非常适合做扁平化设计(比如小图标什么的)，不仅节省了大量空间，更是不用担心锯齿虚化等问题了  
编辑位图的工具有photoshop(ps)、画图等；编辑矢量图的工具有Adobe Illustrator(AI)，coreldraw等  
而SVG就是W3C为网页矢量图所定制的标准，SVG的竞争对手为flash，可以断定SVG已经取代了flash的一些地位了  

# 简短说明
因为需要做这么一个功能，在一张平面图上设置热区，用户可点击热区并可以执行相应操作  
一开始用html的`<area>`标签实现，但是发现这个标签有太多不方便，比如没法使用`hover`伪类(网上提示说可以用`onmousemove`等事件+替换背景图来模拟`hover`效果)、没法自适应宽度(`<area>`标签需要精准的`coords`坐标)、`<area>`中的精确坐标很难确定(找到一个[在线可视化制作热区的网站](http://www.image-maps.com/))等  
综上，我想到我从未接触过的SVG，本来以为可以找到什么插件来完成的，但只找到[Raphaël](http://dmitrybaranovskiy.github.io/raphael/)这个强大的矢量图形库，其实对我并没用...所以想将此次几乎是从零开始(至少还是接触过矢量图的)的经历记录下来  

--------

# 准备工作
* **一张平面图** - 随便在网上找吧(一张帅炸天的玛萨拉蒂)  
![平面图](https://raw.githubusercontent.com/Cmd-Cmd/cmd-cmd.github.io/master/notes/others/demo/hotmap/img/bg.jpg)  
* **矢量图编辑工具** - 我用的AI(Adobe Illustrator CC)  
* **jQuery** - 一个[百度静态资源库](http://cdn.code.baidu.com/)的CDN解决  

# 处理图片
将图片拖入AI中，之后用钢笔或者尽量规则的路径勾勒出各个区域，下面列几个tips吧  

* 需要调整画板大小，在标题栏的`文档设置 -> 编辑画板`  
* 勾勒区域尽量减少锚点，这样存储的信息就越小，代码也就越少了  
* 用小白箭头选取路径区域可以设置区域填充颜色、透明度、边框等  

我勾出了前窗、侧窗、前轮、前灯和LOGO  
![图片处理](https://raw.githubusercontent.com/Cmd-Cmd/cmd-cmd.github.io/master/notes/others/demo/hotmap/img/picProcess.png)  

之后保存格式为svg我们就得到了一个svg文件了，这个svg文件可以[直接引入](http://www.runoob.com/svg/svg-inhtml.html)，但是我不这样做，因为不方便我控制样式(CSS)和脚本(JS)  

# 放入HTML中
将svg文件中`<svg>`标签及其全部内容放到HTML文档中，并稍加修改，下面是修改的具体内容和最终svg代码  

* 将`<svg>`标签中的`width`和`height`去掉，因为要做成自适应宽度  
* `<svg>`中的`viewBox`属性(记住B大写)是视区盒子，用来规定画板大小而非我们最终所看到的大小，可以看一篇[张鑫旭的文章](http://www.zhangxinxu.com/wordpress/2014/08/svg-viewport-viewbox-preserveaspectratio/)深刻理解  
* 给每个热区添加类`hotarea`并将内联的`fill`和`opacity`样式去掉，以方便用CSS控制，注意 **svg中背景色属性是`fill`，而描边属性是`stroke`**  

```
<!-- 将width和height去掉，因为要做自适应宽度 -->
<svg version="1.1" id="hotmap" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1000px" height="563px" viewBox="0 0 1000 563" enable-background="new 0 0 1000 563" xml:space="preserve">
    <image overflow="visible" width="1000" height="563" id="car" xlink:href="./img/bg.jpg">
    </image>
    <path class="hotarea" id="frontWin" d="M437,225.333c-20.5-46.667,24-60.5,26.833-63.833
    c3.01-2.308,89.333-51.333,110-43c20.667,8.333,73.5,50.667,82.833,58.667c9.333,8,15.5,18.167,0,37.667
    S561.976,265.432,551,266.167S456,273.5,450.167,262C444.333,250.5,445.833,250.333,437,225.333z" />
    <path class="hotarea" id="sideWin" d="M343.25,156.5c3.833-6.25,49.5,16.833,65.5,26.25s17.614,26.472,14.5,41.5
    s-3.5,15.75-3.833,18.5c-0.333,2.75-11.417,6.167-26.583,0c-15.167-6.167-38.583-20.583-49.583-27.667c-11-7.083-8-25.25-8-25.25
    S339.417,162.75,343.25,156.5z" />
    <path class="hotarea" id="frontWheel" d="M576,438c0,29.915-16.439,40.667-37.333,40.667s-69-49.085-69-79
    c0-29.915,12.439-41.333,33.333-41.333S576,408.085,576,438z" />
    <path class="hotarea" id="rightLight" d="M686.5,391c0,0,33.75,18,54.5,33.25c15.25,12.75,2.5,16-6.5,19.25
    s-66-3-77.25-7.5s-4.188-17.563-1.75-21C657.75,411.25,686.5,391,686.5,391z" />
    <path class="hotarea" id="logo" d="M868.625,391.75c3.25-3.625,12.625,4.25,12.625,4.25s7.875,9.625,4.875,12.875
    s-14-5.375-14-5.375S865.375,395.375,868.625,391.75z" />
</svg>
```

接下来的响应操作就简单了，不管是`onmouseover`还是`click`都能为你所用了  

# 自适应宽度 & 确定点击位置

## 自适应宽度
自适应宽度想着很简单，只要在CSS中`width: 100%`就解决了，但是经过我手头上现有浏览器的测试，chorme(版本 52)和edge(版本 38)是没问题的；但在ie11下，其自适应似乎有个临界值，大于某个临界值则不再自适应；而在360浏览器(版本 7.1)下，虽然是会自适应，但是在svg顶部会有莫名其妙的留白(丢给小伙伴的360 v8.1下就没问题了，ps：可设置`preserveAspectRatio="xMidYMin meet"`但依旧会有底部留白)  

* ie11效果  
![ie11效果](https://raw.githubusercontent.com/Cmd-Cmd/cmd-cmd.github.io/master/notes/others/demo/hotmap/img/ie11.gif)  

* 360效果  
![ie11效果](https://raw.githubusercontent.com/Cmd-Cmd/cmd-cmd.github.io/master/notes/others/demo/hotmap/img/360.png)  

另外网上也有人提出js动态控制svg的绝对宽度，试了下是可行，但上面的问题也依旧存在，下面给出js代码  

```
function svgFitWidth() {
  function fitWidth() {
    $('#hotmap').css('width', $('#mainContent').width() + 'px');
  };
  fitWidth();
  $(window).resize(function() {
    fitWidth();
  });
}
```

## 确定点击位置
比如说我要在热区弹出一个菜单，且弹出位置刚好是鼠标点击位置，这时候就需要 **鼠标相对于svg容器的相对位置** 了(这里我用到bootstrap的下拉菜单dropdown来辅助)

* `e.clientX` | `e.clientY` - `clientX`事件属性返回当事件被触发时鼠标指针向对于浏览器页面(或客户区)的水平坐标(`clientY`类推)  
*  `document.body.scrollLeft` | `document.body.scrollTop` - 水平或者垂直滚动条的偏移量  
* `$().offset().top` | `$().offset().left` - 某元素相对于整个文档的偏移量  

综上我们可以获得鼠标点击时相对于svg容器的位置  

```
var x = e.clientX + $('body').scrollLeft() - $('#mainContent').offset().left;
var y = e.clientY + $('body').scrollTop() - $('#mainContent').offset().top;
```

![图解位置](https://raw.githubusercontent.com/Cmd-Cmd/cmd-cmd.github.io/master/notes/others/demo/hotmap/img/getPos.png)  
![点击示例](https://raw.githubusercontent.com/Cmd-Cmd/cmd-cmd.github.io/master/notes/others/demo/hotmap/img/clickPos.png)  

其次需要注意的是，jq操作svg内的class不能使用`addClass`或者`removeClass`，具体为何不知道，但是可以用`attr('class', '...')`来实现  

[demo](http://htmlpreview.github.io/?https://github.com/Cmd-Cmd/cmd-cmd.github.io/blob/master/notes/others/demo/hotmap/index.html)  
[source](https://github.com/Cmd-Cmd/cmd-cmd.github.io/tree/master/notes/others/demo/hotmap)  

--------

# 资料整理
[image-maps](http://www.image-maps.com/) - 在线可视化制作热区  
[Raphaël—JavaScript Library](http://dmitrybaranovskiy.github.io/raphael/)  
[HTML 5 <area> 标签](http://www.w3school.com.cn/html5/html5_area.asp)  
[SVG 教程 | 菜鸟教程](http://www.runoob.com/svg/svg-tutorial.html)  
[理解SVG的viewport,viewBox,preserveAspectRatio](http://www.zhangxinxu.com/wordpress/2014/08/svg-viewport-viewbox-preserveaspectratio/)  
[一张图轻松搞懂javascript event对象的clientX,offsetX,screenX,pageX区别](http://www.2cto.com/kf/201409/333401.html)  
