title: css-animation-queue-list
tags:
  - css
  - animation
categories:
  - CSS
date: 2016-03-3 17:45:24
---


# @keyframes
基本写法是一个开始状态和一个结束状态：
```css
@keyframes demo-anim {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

<p data-height="268" data-theme-id="0" data-slug-hash="QNbBOy" data-default-tab="result" data-user="ochukai" class="codepen">See the Pen <a href="http://codepen.io/ochukai/pen/QNbBOy/">QNbBOy</a> by Oliver (<a href="http://codepen.io/ochukai">@ochukai</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

> 其中 `animation-iteration-count: number or infinite;` 可以设置循环次数，infinite为无限次

还可以定义的很详细：
```css
@keyframes demo-anim {
  from {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(20, 20);
  }
  40% {
    transform: translate(40, 0);
  }
  60% {
    transform: translate(60, 20);
  }
  80% {
    transform: translate(80, 0);
  }
  to {
    transform: translate(100, 20);
  }
}

```

# animation-fill-mode
> animation-fill-mode : none | forwards | backwards | both;


值|描述
-|-
none|不改变默认行为。
forward|当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。
backwards|在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。
both|向前和向后填充模式都被应用。


> 用到的知识点就是上面两个，下面开始写。

# Queue-in List
我要写的效果是一个列表，当列表显示时，其子项逐个出现，从右向左滑入，透明度也由浅变深。

## 思路
先写一个使 li 从左向右滑入的效果，然后再给需要稍晚滑入的 li 加上 `animation-delay` 就好了。

## css
```css
/* 定义 li 样式 */
li {
  width: 200px;
  height: 30px;
  background-color: #ccc;
  margin-top: 2px;
  opacity: 0; /* 默认是隐藏的 */
}

/* 定义动画 */
@keyframes queue-in {
  from {
    /* 开始时 在左边 */
    transform: translateX(40px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 调用动画 */
.list-queue-in > li {
  animation-name: queue-in;
  animation-duration: .3s;
  /* 这一行就表示动画结束时元素的状态就是动画的最后一帧 */
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
}
```


## html
这是 进入状态时的 html

```html
<ul class="list-queue-in">
  <li class="list-ad-0" key="0">1</li>
  <li class="list-ad-1" key="1">2</li>
  <li class="list-ad-2" key="2">3</li>
  <li class="list-ad-3" key="2">4</li>
  <li class="list-ad-4" key="2">5</li>
</ul>
```
> 这样的话，li 已经可以从右向左滑入了，但是，是在一起滑入的，我需要他们分开~

## animation-delay

`list-ad-0` 这个东西就是提前定义好的 `animation-delay`，比如：

```css
.list-ad-0 {
  -webkit-animation-delay: 0s;
          animation-delay: 0s;
}

.list-ad-1 {
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
}
```
然后，他们就可以一个接一个的滑了~

## 最后
所有的代码都在这里，就是这样的效果：
<p data-height="268" data-theme-id="0" data-slug-hash="zqYgxb" data-default-tab="result" data-user="ochukai" class="codepen">See the Pen <a href="http://codepen.io/ochukai/pen/zqYgxb/">zqYgxb</a> by Oliver (<a href="http://codepen.io/ochukai">@ochukai</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
