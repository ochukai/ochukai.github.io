title: 🐷用 js 判断某元素进入视窗区域以及图片的懒加载~
tags:
  - lazyload
  - inSight
  - js
date: 2019-04-18 09:43:00
---

一直很想写这个的，一直很想些 html 的某个元素滚动到视窗的判断，感觉还是很有用的。前段时间在写一个企业 IM，要写用户已读了某条信息的操作，如果加上这个进入视窗的判断，就会很准确的知道了用户看消息的过程，但是之前没有判断，只要用户打开这个聊天窗口，我就默认他把所有未读信息全读了，哪怕有四百条未读信息，看吧，那个人有超能力~


## getBoundingClientRect

[getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) 这个方法可以获取元素的大小以及相对于视窗的位置，于是我们可以用。

拿我的博客里面的评论框来举例子，输出结果在下面：

```bash
> $('.comment_trigger')[0].getBoundingClientRect()
> DOMRect {x: 179.5, y: 745, width: 664, height: 114, top: 745, …}
    bottom: 859
    height: 114
    left: 179.5
    right: 843.5
    top: 745
    width: 664
    x: 179.5
    y: 745
    __proto__: DOMRect
```

`getBoundingClientRect` 返回了一个 `DOMRect` 这个东西，我也不知道是啥，但是里面的几个属性还是很容易懂的，其中，

* top    是元素距离窗口顶端的距离
* bottom 是元素距离窗口底端的距离
* left   是元素距离窗口左侧的距离
* right  是元素距离窗口右侧的距离

于是用这个方法来判断是否进入视窗的写法，大概像这样

```js
function isInSight(el) {
  const $el = typeof el === 'string'
    ? document.querySelector(el)
    : el;

  // left, top, right, bottom
  const rect = $el.getBoundingClientRect();

  return !(
    rect.top > window.innerHeight // top 不在视窗
    || rect.bottom < 0 // bottom 也不在
    || rect.left > window.innerWidth // 同理
    || rect.right < 0
  );
}
```

到这里我们可以判断页面上任意一个元素在不在当前的视窗了，前提是它静止不动的时候，要动起来的话，比如滚动的时候，我们就要添加一些事件来触发这个判断，然后再做一些操作。

## lazyload

页面中所有的图片，我们滚动它的位置的时候再去加载它，可以提高页面的加载速度吧。

下面的 loadImg 是概念方法，具体实现怎么都可以咯~

```js
window.addEventListener("scroll", () => {
  document.querySelectorAll("img").forEach(img => {
    if (isInSight(img)) {
      loadImg(img);
    }
  }))
});
```

就像这样，滚动窗口的时候遇到图片就会加载了，但是效果可能不是那么好看，要处理一下的话，可以在进入页面的时候，把所有图片的 src 都暂存到 data-src 上面，然后给每个图片的 src 都设置同一个路径，比如'loading.png', 这样就会好看很多了。

当然最重要的是，isInSight 方法已经实现了。