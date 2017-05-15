layout: drafts
title: tmp-in-weaver-vue
date: 2017-03-21 16:21:13
tags:
---


1、目前手头上的工作存在什么问题？如何优化现在的工作？

2、你觉得个人工作现状存在什么问题？我们团队存在什么样的问题？

3、需要我做一些什么样的变化、给你们提供一些什么样的支持。

4、对于云桥、会务、执行力及自用功能的发展自己有什么想法？需要需要去做些什么？有什么是你想去做的？

大家思考下，后面找个时间大家一起交流沟通下，有些问题觉得不便一起沟通的，也可以直接找我沟通下。


```html
<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'home'">Home</router-link>

<!-- 同上 -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
<!--router.push({ name: 'user', params: { userId: 123 }})-->

```


```js

new Vue({
  // ...
  components: {
    // <my-component> will only be available in parent's template
    'my-component': Child
  }

})

```

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
