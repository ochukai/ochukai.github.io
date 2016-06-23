title: 上层滚动 下层不摇滚
tags:
  - null
categories:
  - null
date: 2016-06-23 11:12:27
---

最近写手机页面颇多, 经常有弹出框, 或者下拉列表, 如果弹框或者下拉列表的内容太多,出现了滚动条, 恰好外面的内容也很多,也有滚动条的话,就会出现一种情况:

![例子](../images/scroll-1.png)

比如上图, 当用力划一下屏幕, 下拉框滚到底了之后, **body** 随之也开始滚, 很讨厌。出现过好多次了, 而且测试逼我太紧~

## 我要解决这个问题啊

其实很简单, 只要弹出下拉列表的时候让下层的元素不能滚动就好了。

```css
.modal-open { 
  overflow: hidden;
}
```

js 的话就这么写:

```js
  function show($div) {
    $('body').addClass('modal-open');
    // ...
  }

  function hide($div) {
    $('body').removeClass('modal-open');
    // ...
  }
```

以上。