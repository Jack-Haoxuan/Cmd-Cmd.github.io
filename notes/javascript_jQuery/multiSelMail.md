支持多选的邮件自动补全提示插件 - 【第一次插件开发过程记录】
========

这是小弟第一次去写JQ的插件，历时也蛮久的(主要因为懒...)，总之先上截图和地址  
![图片展示](https://raw.githubusercontent.com/Cmd-Cmd/Cmd-Cmd.github.io/master/notes/javascript_jQuery/demo/multiSelMail/img/multiSelMail.gif)  
[简单示例](https://cmd-cmd.github.io/MultiSelMail/)  
[github项目](https://github.com/Cmd-Cmd/MultiSelMail)  

起因就是需要做这么一个邮件提示的插件(类似qq邮箱那种)，但是没找到现成的插件，本来也很早就打算自己去写一个插件了，于是就认真的去做了...  
各位走过路过的dalao还望赏个脸试用下，给小弟一点小意见或者批评咯，毕竟根本不熟悉标准的插件开发过程，就自己乱搞一通...  

> 我是一边用思维导图大致写下思路，然后一边码代码，之后发现有各种缺陷、冲突什么的再到处改  

# 最根本的要求与思维分区
![最根本的要求与思维分区](https://raw.githubusercontent.com/Cmd-Cmd/Cmd-Cmd.github.io/master/notes/javascript_jQuery/demo/multiSelMail/img/img1.png)  

最开始给我的需求也就那三点，其实不需要 *其他功能与选项* 这个子主题都够了，但秉持着强迫症原则还是硬给自己添加了难度  

## 整体结构
![整体结构](https://raw.githubusercontent.com/Cmd-Cmd/Cmd-Cmd.github.io/master/notes/javascript_jQuery/demo/multiSelMail/img/img2.png)  

整体结构上主要描述的是 **HTML结构** ，其实最纠结的还是需要用一个块级元素去初始化，而不能用一个`input元素`去初始化，因为要保持输入框原有样式还要相对定位下拉框(注意`<input>标签`是一个自闭合标签的，也就没有子元素)，我能想到的就是用块级元素去替换它了  

## 基本样式
![基本样式](https://raw.githubusercontent.com/Cmd-Cmd/Cmd-Cmd.github.io/master/notes/javascript_jQuery/demo/multiSelMail/img/img3.png)  

样式是不是写得过于详细了一点...导致我后面想修改某个样式都会纠结上一小会，而且一些不必要的为了美观的样式我也写进去了，这样会不会不太好？  

## 基本功能
![基本功能](https://raw.githubusercontent.com/Cmd-Cmd/Cmd-Cmd.github.io/master/notes/javascript_jQuery/demo/multiSelMail/img/img4.png)  

默认邮箱列表当时我就只想到这些- -所以就这些是默认的了，有这些基本功能我觉得就可以完成最开始的那几个需求了  

## 其他功能与选项
![其他功能与选项](https://raw.githubusercontent.com/Cmd-Cmd/Cmd-Cmd.github.io/master/notes/javascript_jQuery/demo/multiSelMail/img/img5.png)  

这一块就是我翻来覆去改得最多的地方了，经常出现各种前后矛盾、考虑不周等使得必须要大改代码(orz重构...)，其实原来还有一些其他功能的，不过考虑到功能不太妥当以及需要修改大量代码(几乎重新规划整体逻辑)的情况，也就索性砍掉了  

# 总结
这次开发历程其实没有什么技术上好说的，本来就是一个很小功能的插件，用到的也都是最基础的知识，不过即使这样，想要尽善尽美也是非常难的。我实在无法做到一开始考虑逻辑(或者说编写文档)时就方方面面都能考虑到，而且常有敲代码到一半就灵光乍现导致很多逻辑冲突的情况，所以代码上改来改去，其实也添加了不少冗余部分  

# 附加
还是没忘记去体验一下前端优化，主要是 **js压缩 - uglifyjs** 和 **css压缩 - cleancss**，有兴趣可以看下[代码](https://github.com/Cmd-Cmd/MultiSelMail/blob/master/index.js)，蛮简单的    

--------

# 参考资料
[jQuery插件开发全解析](http://www.iteye.com/topic/545971) - 经典老帖，值得学习  
[uglifyjs](https://www.npmjs.com/package/uglifyjs)  
[cleancss](https://www.npmjs.com/package/clean-css)  
[$.extend()函数的浅复制、深复制](http://bijian1013.iteye.com/blog/2255037) - 高频问题，请记住这两个词  
