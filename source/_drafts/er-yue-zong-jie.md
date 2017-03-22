title: er yue zong jie
tags:
  - null
categories:
  - null
---
这是我的第三篇月总结了，感觉时间过的好快~

这个月算是从 6 号开始的，到月底 28 号，一共 17 天~ 比较短，对我来说也比较轻松，没有太多的任务，大部分时间在学习，写一些前端的动画效果比较多。

有好多时间在解决 ie8 的兼容性，用到的几个基础的 js 库，像 

* html5shiv 让 ie 识别 html 的 tag
```html
<!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```
* modernizr 检测浏览器支持什么特性
```js
Modernizr.load({
  // Test if the browser supports it or not
  test: Modernizr.fontface && Modernizr.canvas, 
  // If browser supports it, load this file
  yep : '/path-to/html5-css3-attributes.css',  
  // If NOT, load this instead
  nope: '/path-to/old-css-attributes.css' 
});
```
* respond 让 ie 支持 媒体查寻，但是要放在 css 的后面

css 方面遇到的问题的话，可以用下面这几点来解决，可以保持原有的样式不变，另加样式专门针对 ie 就好了
* \9 IE6/IE7/IE8/IE9/IE10都生效
* \0 IE8/IE9/IE10都生效，是IE8/9/10的hack
* \9\0 只对IE9/IE10生效，是IE9/10的hack

其余的话 算是写了两个插件吧~
* 按快捷键网页滚动
* 自适应宽度的很炫的图片展示组件




