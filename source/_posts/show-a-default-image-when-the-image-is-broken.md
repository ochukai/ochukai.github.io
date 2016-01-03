title: 图片加载错误时显示默认图片
tags:
  - imgage error
categories:
  - JavaScript
date: 2015-11-27 18:24:36
---

## 直接写

```js
function imgError(image) {
    image.onerror = null; // prevent event bubble
    image.src = "/images/noimage.gif";
    return true;
}
```
```html
<img src="image.png" onerror="imgError(this);"/>
```

## 使用 jQuery
```js
$("img").error(function () {
    $(this).unbind("error").attr("src", "broken.gif");
});

//If you use this technique you can use the "one" method to avoid needing to unbind the event: 
$('img').one('error', function() { 
  this.src = 'broken.gif'; 
}); 
```

## 还有一种写法
```js
$(window).load(function() {
  $('img').each(function() {
    if (!this.complete 
        || typeof this.naturalWidth == "undefined" 
        || this.naturalWidth == 0) {
      // image was broken, replace with your new image
      this.src = 'broken.gif';
    }
  });
});
```