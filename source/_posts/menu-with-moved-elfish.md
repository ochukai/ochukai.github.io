title: 菜单下面的小精灵
tags:
  - nav
categories:
  - CSS Animation
  - CSS
date: 2016-03-21 16:05:51
---

有些网站的导航下面会有一到杠，鼠标在各个导航之间移动的时候，这一道杠也会跟着动，很好看，就像这个

<p data-height="268" data-theme-id="0" data-slug-hash="PNbGZQ" data-default-tab="result" data-user="ochukai" class="codepen">See the Pen <a href="http://codepen.io/ochukai/pen/PNbGZQ/">ooo-nav</a> by Oliver (<a href="http://codepen.io/ochukai">@ochukai</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

我把她叫做小精灵。

---

## 原理

实现这个其实不难，当鼠标移动到某一个菜单上面时，小精灵滑入（至于方向，如果鼠标从右边进入菜单，那就从右向左滑），然后当鼠标移出时，小精灵跟着也移出菜单， 同时如果鼠标恰好移进了另一个菜单，下一个菜单的进入动画也开始播放，连续起来的话就像是小精灵跟着过来了。

## 实现

### 菜单
菜单的话当然是用 ul 来实现了
```html
<ul class="nav">
  <li>我的</li>
  <li>导航栏</li>
  <li>非常</li>
  <li>牛逼</li>
</ul>
```

### 小精灵

这个小精灵该怎么实现呢, 开始时我打算用 `border` 来实现，试了一下之后才发现，并不理想，因为当鼠标 hover 时，border 变化，内容也会随着动，很丑。

于是我就想用 `after` 这个伪元素来实现，因为之前并没用过，感觉蛮新鲜的。

使用 `after` 最重要的地方也是前提，就是 `content: ''`，如果没有这一句，不管怎么修饰 `after` 的样式，都是徒劳。

写完之后的样子大概是这样
```less
  > li {
    float:left;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:after {
      content: '';
      height: 3px;
      position: absolute;
      bottom: 0;
    }
  }
```

### 动画

根据上面的原理，如果想实现的话，大概只需要写四个动画

* 小精灵从右向左进入菜单
* 小精灵从右向左移出菜单
* 小精灵从左向右进入菜单
* 小精灵从左向右移出菜单

我打算使用 `width` 的变化来模拟小精灵的滑动效果，假如是从左向右， css 就像下面这样：

```css
@keyframes slide-in {
  from { width: 0; }
  to { width: 100%; }
}

.slide-in-from-left:after,
.slide-out-from-left:after {
  left: 0; // 初始位置在左边，宽度为 0，宽度逐渐变大
}

.slide-in-from-left:after,
.slide-in-from-right:after {
  animation-name: slide-in;
  animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
}

```

### JS

css 写完了，不过我要识别鼠标进入或离开的方向，也就是要判断鼠标是从左边进入还是从右边进入，是从左边移出还是从右边移出。

于是， 要写一些 js 来判断

```js
$(function() {

  var classList = [
        'slide-in-from-left',
        'slide-in-from-right',
        'slide-out-from-right',
        'slide-out-from-left'
      ].join(' ');

  $('ul.nav')
    .on('mouseenter', 'li', function(e) {
      var $this = $(this);
      var width = $this.outerWidth();
      var xx = e.offsetX;
      var className = (xx < (width / 2))
                    ? 'slide-in-from-left'
                    : 'slide-in-from-right';

      $this.removeClass(classList).addClass(className);      
    })
    .on('mouseleave', 'li', function(e) {
      var $this = $(this);
      var width = $this.outerWidth();
      var xx = e.offsetX;
      var className = (xx < (width / 2))
                    ? 'slide-out-from-left'
                    : 'slide-out-from-right';
      $this.removeClass(classList).addClass(className);
    });

});
```

这样就写完了，再把开头的例子放上吧。

<p data-height="268" data-theme-id="0" data-slug-hash="PNbGZQ" data-default-tab="result" data-user="ochukai" class="codepen">See the Pen <a href="http://codepen.io/ochukai/pen/PNbGZQ/">ooo-nav</a> by Oliver (<a href="http://codepen.io/ochukai">@ochukai</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

谢谢。
