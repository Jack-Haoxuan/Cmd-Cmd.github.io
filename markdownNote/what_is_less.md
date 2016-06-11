# 关于高端常用的 LESS CSS
LESS 是一门 CSS 预处理语言，它并不是去取代CSS，而是去扩充CSS，给CSS于变量、混合、函数、运算等功能，让CSS的编写更加方便，结构上更为清晰

## 怎样使用LESS
LESS最终是要被编译为CSS的，而CSS中是不存在变量等概念的，所以**通过LESS编译的CSS的值也是静态不变的**。可以通过下面三种方法编译LESS：
* 客户端编译，需要去下载源码并添加以下代码（PS: 我从未成功在客户端编译）
```
<link rel="stylesheet/less" type="text/css" href="styles.less">
<script src="less.js" type="text/javascript"></script>
<!-- 也可以用LESS提供的CDN -->
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.2.0/less.min.js"></script>
```  

* 服务器端编译，主要借助于LESS的编译器  
* 最推荐的方法是第三种，**使用编译生成的静态CSS文件**，可以通过LESS编译器将LESS文件编译为CSS文件，再在需要的页面中使用静态CSS，常用编译工具有node.js、winless等，详见资料整理

## LESS的语法
LESS与CSS并不冲突，完全可以在.less写纯CSS，当然用LESS的语法会让代码更加简洁且结构化:)

### 变量
定义变量通过`@变量名: 变量值;`定义，如下示例  
*LESS源文件*
```
@myColor: #195635;
div{
    color: @myColor;
}
```
*编译后的CSS*
```
div {
  color: #195635;
}
```

### 混入（Mixins）以及混入参数（Parametric Mixins）
LESS中的混入指在一个CLASS中引入另外一个已经定义的CLASS，并且可以自定义参数及初始值，作为函数使用的混入还可以设置内部变量，内部变量的调用需要在使用函数的类中声明，如下示例  
　　*LESS源文件*
```
.upTriangle(@color: red, @length: 10px){
    @w: 0;
    height: 0;
    border-bottom: @length solid @color;
    border-left: @length solid transparent;
    border-right: @length solid transparent;
}
div#div1{
    .upTriangle;
    width: 100px;
}
div#div2{
    .upTriangle(#306090, 5px);
    width: @w;
}
```
　　*编译后的CSS*
```
div#div1 {
  height: 0;
  border-bottom: 10px solid red;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  width: 100px;
}
div#div2 {
  height: 0;
  border-bottom: 5px solid #306090;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  width: 0;
}
```

### LESS的嵌套规则以及变量的作用域（Scope）
LESS是支持嵌套的，从代码结构上弥补了CSS的结构混乱，同时变量也有自己的生命周期，查找变量先在局部定义中查找，找不到则向上层找，直至全局，以下示例  
　　*LESS源文件*
```
@width: 100%;
html{
    @width: 50%;
    body{
        width: @width;
    }
}
div{
    width: @width;
}
```
　　*编译后的CSS*
```
html body {
  width: 50%;
}
div {
  width: 100%;
}
```

### LESS对伪类的操作
LESS对伪类的操作是基于嵌套的，用`&`选择父元素，以下示例  
　　*LESS源文件*
```
a{
    font-size: 12px;
    color: red;
    text-decoration: none;
    &:hover{
        color: blue;
    }
    &:active{
        color: black;
    }
    &:first-letter{
        font-weight: bold;
    }
}
```
　　*编译后的CSS*
```
a {
  font-size: 12px;
  color: red;
  text-decoration: none;
}
a:hover {
  color: blue;
}
a:active {
  color: black;
}
a:first-letter {
  font-weight: bold;
}
```

### 运算及函数
LESS中可以对数值进行简单的数值运算，示例如下  
　　*LESS源文件*
```
@baseColor: #030201;
div{
    border: 1px solid @baseColor * 2;
    background-color: @baseColor / 2;
    color: @baseColor + 1;
    text-shadow: 0 0 1px @baseColor - 1;
}
```
　　*编译后的CSS*
```
div {
  border: 1px solid #060402;
  background-color: #020101;
  color: #040302;
  text-shadow: 0 0 1px #020100;
}
```
> 备注：个人并不看好运算，何不如心算呢？而且很多时候需要微调，也许暴力方法更好达到效果呢  

LESS中还有大量函数使用，下面是几个函数示例，详细请参照官方函数手册  
　　*LESS源文件*
```
div{
    border: 1px solid lighten(#123456, 10%); // 变亮
    background-color: darken(#123456, 10%); // 变暗
    color: mix(#123456, #654321); // 混合
    text-shadow: fadeout(#123456, 10%); // 更透明
}
```
　　*编译后的CSS*
```
div {
  border: 1px solid #1b4d80;
  background-color: #091a2c;
  color: #3c3c3c;
  text-shadow: rgba(18, 52, 86, 0.9);
}
```

### 字符串插值
可以定义变量为字符串，并插入到其他字符串中，语法为`@{变量名}`，例如  
　　*LESS源文件*
```
@img: "../img/";
@btn: "button-";
div{
    background-image: url("@{img}yellow-@{btn}off.png");
    &:hover, &:active{
        background-image: url("@{img}yellow-@{btn}on.png");
    }
}
```
　　*编译后的CSS*
```
div {
  background-image: url("../img/yellow-button-off.png");
}
div:hover,
div:active {
  background-image: url("../img/yellow-button-on.png");
}
```

### 其他
* 与LESS同类的还有SASS，官网链接见资料整理  
* LESS还有其他更加高级的功能，请移步官网

--------

# 资料整理
> [LESS 中文网](http://lesscss.cn/)  
> [LESS ---在windows下编译less](http://my.oschina.net/rikkilovelife/blog/350095) - windows下基于node进行编译，在此文最后  
> [winless 官网](http://winless.org/)  
> [LESS CSS 框架简介](http://www.ibm.com/developerworks/cn/web/1207_zhaoch_lesscss/)  
> [SASS 官网](http://sass-lang.com/)  
