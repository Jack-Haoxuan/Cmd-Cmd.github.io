HTML/CSS 快速编写必备 - emmet插件
========
Emmet的前身是大名鼎鼎的Zen coding，如果你从事Web前端开发的话，对该插件一定不会陌生。它使用仿CSS选择器的语法来生成代码，大大提高了HTML/CSS代码编写的速度  

# 快速编写HTML
## 初始化
输入`!`或者`html:5`然后按`Tab`可以快速初始化  

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>
<!-- html:xt 用于XHTML文档   -->
<!-- html:5s 用于HTML4严格文档 -->
```  

## 添加HTML标签
* `标签名 => Tab` - 自动补全标签  
* `标签名.类名 => Tab` - 带有class的标签  
* `标签名#id => Tab` - 带有id的标签  
* `标签名[attr=value] => Tab` - 带有属性的标签  
* `标签名{content} => Tab` - 带有内容的标签  

```
div.a.b#c[width=100px height=100px]{Something} => Tab  
<div class="a b" id="c" width="100px" height="100px">Something</div>
```

## 嵌套
* `标签名+标签名 => Tab` - 同级标签  
* `标签名>标签名 => Tab` - 父子标签  
* `标签名^标签名 => Tab` - 提升标签  

```
h1+h2>h3>h4^^h5+h6 => Tab
<h1></h1>
<h2>
    <h3>
        <h4></h4>
    </h3>
</h2>
<h5></h5>
<h6></h6>
```

## 分组和连续
* `()` - 用于分组  
* `*`和`$` - 用于连续  
* `$@-` - 代表递减  
* `$@3` - 从3开始  

```
(ul#list$>li{$}*3)*2+ul>li{$@-}*3^ul>li{$@3}*3 => Tab
<ul id="list1">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
<ul id="list2">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
<ul>
    <li>3</li>
    <li>2</li>
    <li>1</li>
</ul>
<ul>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
```

# 快速编写CSS
## 属性名缩写
只需要打出属性名的缩写，后面跟上值，以`name:value => Tab`快速编写(缩写就需要自己记下了，所有属性都有缩写)  
`+`可用于编写多个样式  

```
m0+p0 => Tab
margin: 0;
padding: 0;
```

## 前缀
某些样式缩写会自动添加`-webkit-|-o-`等前缀  

```
trs => Tab
-webkit-transition: prop time;
-o-transition: prop time;
transition: prop time;
```

## 单位
`p e r x`分别是`% em rem ex`的单位缩写  

```
m0+p1p+o2r+bd3e+t4x => Tab
margin: 0;
padding: 1%;
outline: 2rem;
border: 3em;
top: 4ex;
```

## 属性多值
使用`-`将单个属性内的多个值分开  

```
m0-1e-3r-4x => Tab
margin: 0 1em -3rem -4ex;
```

## 颜色
颜色的前缀为`#`  

```
bgc#234 => Tab
background-color: #234;
```

--------

## 资料整理
> [Emmet：HTML/CSS代码快速编写神器](http://www.iteye.com/news/27580)  
> [使用Emmet加速Web前端开发](http://www.w3cplus.com/tools/using-emmet-speed-front-end-web-development.html)  
> [更多详细请参考emmet文档](http://docs.emmet.io/cheat-sheet/)    
