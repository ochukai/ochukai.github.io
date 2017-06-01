title: VUE 总结一下~
tags:
  - vue
  - image-preview
date: 2017-05-24 11:27:55
---

最近开始接触 vue, 写了一个算是前端小论坛的公司内部项目, 算是一个知识库, 可添加一些常见的问题供别人查阅~

现在做个总结吧, 项目写完一个多星期, 现在想想差不多都忘记了~ 真是老了~


## 生命周期

![](/images/vue-lifecycle.png)

其中 created 和 mounted 的顺序要确定好~ 比较重要的就像下面这三个吧, 其他的像是 `updated`, `beforeUpdate` 我几乎没有用过, 暂时不说~ 

### created
实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

### mounted
el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
这个时候可以获取到 template 里面的标签元素了, 如果要修改大小样式之类的在这里面写~

### destroyed

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。


## 动画

使用过 vue 的 transition 标签之后最大的感慨便是, 做动画比 react 简单好多啊, 可能是我之前用 react 并没有写过动画的缘故吧, 但不可否认 vue 的动画很简单~

我之前写的一个小组件

```xml
<template>
  <transition name="back-top-fade">
    <div v-if="show" class="back-to-top hidden-xs" @click="handleBackTopClick">
      <i class="el-icon-caret-top"></i>
    </div>
  </transition>
</template>
```

这是一个简单的返回顶部的按钮, 当页面滚动到 一定距离的时候 **show** 变为 true, (对了, 为什么我的网址没有返回顶部的按钮呢~ 打开控制台就知道了~)

```js
handleScroll() {
  let scrollTop = getScrollTop();
  this.show = scrollTop > 400;
},
```

transition 下面的元素通过 **v-if** **v-show** 来控制隐藏和消失~ 然后会有几个状态类~

1. **v-enter**: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
2. **v-enter-active**: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。
3. **v-leave**: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
4. **v-leave-active**: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。

我只写了一个样式, 这样的话 按钮进出场的效果都是一样的~

```css
.back-top-fade-enter,
.back-top-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0
}
```

## 事件


下面这几个比较有用

* 普通的  @click 事件
* @click.self 这样很有用, 只是点击自己的时候有用
* @click.stop 阻止单击事件冒泡
* @click.prevent 阻止默认行为

## Vue Router
**beforeRouteUpdate** 这个方法很好用

```js

  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },

  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },

  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
  
```

还有一个就是

```xml
<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

## watch

watch 很好用~
