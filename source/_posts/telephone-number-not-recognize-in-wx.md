title: 在微信网页上的电话号码
tags:
  - 微信开发
date: 2016-02-26 18:36:25
---

### 电话好不不想被识别

在网页中的比较长的数字会被微信浏览器自动识别为电话号码，稍不注意可能就使页面变得很难看，与是，在 header 里面加上下面两个 meta 就电话号码就不会被识别了。

```html
<meta name="format-detection" content="telephone=no"/>
<meta http-equiv="x-rim-auto-match" content="none">
```

### 如果要识别呢？

加一个 `tel//***` 就可以了。

```html
<div class="telephone">
    <p>苹果妹妹专线</p>
    <a href="tel://4000630086">400-063-0086</a>
</div>
```
