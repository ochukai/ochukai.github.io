title: 写了一个 Vue 的图片预览插件~😜
tags:
  - vue
  - image-preview
date: 2017-06-01 06:01:01
---

最近的项目里面需要一个图片点击放大预览的插件~ 项目是 vue 写的 SPA ~

找了好久，没有现成的，有一个，但是写的我很不喜欢，需要手动传入图片地址，宽度和高度，都这样了，还写什么程序~

然后我打算自己写一个~

## 思路

基本思路的话，就是点击图片的时候，产生一个遮罩层（或者遮罩层本来就有），然后在遮罩层添加一个图片，居中什么的样式到时随便了。点击事件很简单， `@click` 就好了，点击图片之后可以获取到图片的路径，因为点击的是已经显示出来的图片，所以当前图片的 meta 信息肯定包含了该图片的长和宽。

生成一个遮罩层也很简单，然后根据图片的长宽和屏幕的长宽（或者浏览窗口的大小）可以计算图片的居中位置。

然后添加到 body 上面就好了，但是添加的话，因为 vue 有自己的生命周期，`document.body.appendChild()` 的话事件都不能用 vue 的了，于是如果 **append 一个 vue 的插件到 dom **算是第一个问题。

简单的思路就这样，只要实现了动态添加 vue 组件到 body，那么这个插件就可以实现了。

## 实现

我先去看了一个 element-ui 的代码，好复杂，有一个很大的 mixin， 看来看去没明白，后来我想起之前看到的那个图片预览的插件，[github/vue-fancybox](https://github.com/xiecg/vue-fancybox)，顺便帮作者宣传一下吧，虽然不符合我的价值观~ 

这个插件有一个插入的操作，大概是这么写的，

```js
const FancyBoxConstructor = Vue.extend(fancyBox);
let instance = new FancyBoxConstructor({
  el: document.createElement('div')
});

document.body.appendChild(instance.$el);
```

他还写了好多别的代码，但是主要逻辑应该是这个，首先初始化组件之后，再 append 到 body，不错。

然后我就借用了，

```js
const ImagePreviewConstructor = Vue.extend(ImagePreview);

export default (el) => {

  let instance = new ImagePreviewConstructor({
    el: document.createElement('div'),
    data: {
      img: el,
      imgSrc: el.src
    }
  });

  document.body.appendChild(instance.$el);

};
```

初始化的时候顺便传入 **props**, 这个文件算是组件的入口文件了，调用这个组件的方式是这样的：

```js
handleContentClick(e) {
  const el = e.target;
  if (el.localName === 'img') {
    e.preventDefault();

    const imageSrc = el.src;
    if (imageSrc) {
      showImagePreview(el);
    }
  }

  return false;
}
```

这样的话，组件便可以开始了，或者说已经结束了，因为只要在 template 里面写个 div， 再写个 img 就好了， 剩下的就是样式问题：

```html
<template>
  <transition name="image-fade">
    <div class="image-preview__wrapper"
         style="z-index: 2003;"
         ref="wrapper"
         @click.self="handleClick"
         @mousewheel.stop="handleMouseWheel"
         v-if="imgSrc">
      <img :src="imgSrc"/>

      <div class="toolbar">
        <el-button icon="minus" @click="handleZoomIn">缩小</el-button>
        <el-button icon="plus" @click="handleZoomOut">放大</el-button>
        <el-button icon="close" @click="handleClose">关闭</el-button>
      </div>
    </div>
  </transition>
</template>
```

这里我加了一个 `transition` 标签，是 vue 里面很方便写出入场动画的标签，文档在这里[vue/transition](http://cn.vuejs.org/v2/guide/transitions.html), 里面就是 div 和 img，或许这样的结构有点简陋，但是能用啊，而且公司不给太多时间（咦，这个心态不对呀~）

组件 mounted 之后，要初始化图片的位置和事件，

```js
mounted() {
  document.querySelector('html').style.overflow = 'hidden';

  Vue.nextTick(() => {
    this.initImagePosition();
    this.initHammer();
  });
},
```

哦对了，图片的手势处理，拖拽我用的 hammerjs 来做的。

然后就是 **handleClick**，点击图片之后的操作了，加了 `.self` 是为了事件只在 div 标签触发，用过 vue 的人都知道，好用~

效果是这样的~

![](/images/vue-image-preview.jpg)
