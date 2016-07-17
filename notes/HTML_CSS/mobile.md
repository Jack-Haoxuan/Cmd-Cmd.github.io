移动前端开发
========

# `<head>`中的`<meta>`与`<script>`
```
<!-- 强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览 -->
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<!-- iphone设备中的safari私有meta标签，允许全屏模式浏览 -->
<meta content="yes" name="apple-mobile-web-app-capable">
<!-- iphone设备中的safari私有meta标签，指定的iphone中safari顶端的状态条的样式 -->
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<!-- 忽略将页面中的数字识别为电话号码 -->
<meta content="telephone=no" name="format-detection">
<!-- 去除Android平台中对邮箱地址的识别 -->
<meta content="email=no" name="format-detection" >
<!-- 禁止百度转码 -->
<meta http-equiv="Cache-Control" content="no-siteapp" />
<script>
    // 去掉输入URL控件条
    window.onload = function() {
      setTimeout(scrollTo,0,0,0);
  }
</script>
```

# 全局css
```
html, body {
    -webkit-user-select: none;   /* 禁止选中文本（如无文本选中需求，此为必选项） */
    user-select: none;
}
body {
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif; /* 无衬线字体 */
}
a, img {
    -webkit-touch-callout: none; /* 禁止长按链接与图片弹出菜单 */
}
```

--------

# 资料整理
> [MDN:手机网页开发](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Mobile)  
> [MDN:在移动浏览器中使用viewport元标签控制布局](https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag)  
> [移动前端开发和 Web 前端开发的区别是什么](https://www.zhihu.com/question/20269059) - 移动前端端开发的入门理论  
> [Alloyteam移动开发规范概述](http://alloyteam.github.io/Spirit/modules/Standard/) - 移动前端开发规范，很重要的大方向  
> [手机/移动前端开发需要注意的20个要点](http://sentsin.com/web/54.html) - 移动前端开发的实用小技巧，大部分针对iOS  
> [w3cplus响应式技术资源](http://www.w3cplus.com/responsive) - 很多响应式设计方面的资源  
> [浅谈移动Web开发](http://www.infoq.com/cn/articles/development-of-the-mobile-web-deep-concept)  
> [Alloyteam Mars](https://github.com/AlloyTeam/Mars)  
> [移动WEB开发入门](http://junmer.github.io/mobile-dev-get-started/) - 也是大方向的，页面做得很炫酷  
> [移动开发资源集合](https://github.com/jtyjty99999/mobileTech)  
> [The Mobile Web Handbook](http://quirksmode.org/mobilewebhandbook/)  
> [MobileWeb 适配总结](http://www.w3ctech.com/topic/979)  
> [移动前端不得不了解的html5 head 头标签](http://www.css88.com/archives/5480) - 移动端的<head>标签内该写些什么  
