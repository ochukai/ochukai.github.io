title: Baseview in Backbone
tags:
  - backbone
  - base
  - view
  - js
categories:
  - Backbone
date: 2015-11-13 00:36:15
---
## 前言
今天研究了好久的 Backbone，一直搞不明白，怎么通过 router 的改变来切换 view。

## 过程跌宕起伏

事情是这样的，都知道 backbone 有 model, collection, view, router 这些基本概念，今天我要写一个简单的网页，有两个 nav 项，因为用了 backbone，自然就想到了单页应用，就是单击其中某一个的时候，显示这一个 nav 项对应的内容。

这就用到了 router 的事件，每当 router 改变时，重新 render 整个页面。（我是这么想的，也不是整个，router 变了有些内容必然会跟着变。）

```js
var appView = this;
Backbone.history.on('route', function (router, name) {
    console.log('current route:', name);
    appView.render();
});
```

另外，在 router 里面我定义了一个变量，用来表明哪一个 nav 项被点击。
```js
Backbone.Router.extend({

    // ... other methods

    routes: {
        '': 'chat', // default to #chat
        'chat': 'chat',
        'broadcast': 'broadcast',
        '*nothingMatched': 'pageNotFoundRoute' // 404
    },

    chat: function () {
        console.log("chat page loaded.");
        window.App.currentRouter = 'chat';
    },

    broadcast: function () {
        console.log('broadcast page loaded.');
        window.App.currentRouter = 'broadcast';
    },

    pageNotFoundRoute: function() {
        console.log('pageNotFoundRoute');
    }

});
```

事实证明，我的想法是有一点点正确的，因为运行顺序是这样的：
```bash
in appView initialize.
doctor-router.js:11 Route initialize
doctor-router.js:22 chat page loaded.    # 首先，进入 router 的处理方法
app.js:31 current route: chat            # 然后，响应 router 的 change 事件
app.js:58 in appView render.             # 最后，appView 的 render 方法根据 route name
                                         # render对应的 view
```

render 的时候，首先要 **remove** 当前的view，然后 render 新的view。我是这么写的：
```js
if (this.siderView) {
    // 删掉当前的
    this.siderView.remove();
}

if (App.currentRouter === 'chat') {
    this.siderView = new ChatSiderView();
} else if (App.currentRouter === 'broadcast') {
    this.siderView = new DoctorProfileView();
}

// render 新的 view
this.siderView.render();
```

运行之后我发现，这样点击下一个 nav 的时候， view 变成了空白的。后来审查元素，发现 el 那个节点整个被删掉了，因为他们两个共同放在同一个 el 下面。
```js
// view 1
var DoctorProfileView = Backbone.View.extend({
    el: '.left_aside',
    className:  'doctor_profile'
    // ...
});

// view 2
var ChatSiderView = BaseView.extend({
    el: '.left_aside',
    // ...
});
```

因为是新手，而且这是第一次用 backbone，所以还不知道 $el 就是 juqery 对象（其实问题不在这里），所以我就开始了漫无目的的搜索。

其实办法肯定是有的，就是让他俩不共用同一个 el 节点，每次 render 完了之后，添加到要显示的地方，remove 的时候也只会删掉他自己，况且还可以用 hide。

## 有了一线希望

终于，我看到网上有人写了这么一句：
```js
this.$el.empty();
```

然后我顺藤摸瓜看起了 backbone 的源代码：
```js
  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function (options) {
      this.cid = _.uniqueId('view');
      _.extend(this, _.pick(options, viewOptions));
      this._ensureElement();
      this.initialize.apply(this, arguments);
  };

  // Ensure that the View has a DOM element to render into.
  // If `this.el` is a string, pass it through `$()`, take the first
  // matching element, and re-assign it to `el`. Otherwise, create
  // an element from the `id`, `className` and `tagName` properties.
  _ensureElement: function () {
      if (!this.el) {
        // ...
        // omit this because we pass 'el' as options to the View.
        // ...
      } else {
          this.setElement(_.result(this, 'el'));
      }
  }

  // Change the view's element (`this.el` property) and re-delegate the
  // view's events on the new element.
  setElement: function (element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
  }

  // Creates the `this.el` and `this.$el` references for this view using the
  // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
  // context or an element. Subclasses can override this to utilize an
  // alternative DOM manipulation API and are only required to set the
  // `this.el` property.
  _setElement: function (el) {
      this.$el = el instanceof Backbone.$
               ? el
               : Backbone.$(el);
      this.el = this.$el[0];
  }
```

上面这一段就是说，如果我们传入了 el 那么 backbone 会自动设置 $el（通过命名就能看出这是一个 jquery 对象咯）, 并且绑定我们在 events 定义的事件到这上面。

然后还有 backbone 的 remove view 的方法：
```js
  // Remove this view by taking the element out of the DOM, and removing any
  // applicable Backbone.Events listeners.
  remove: function () {
      this._removeElement();
      this.stopListening();
      return this;
  },

  // Remove this view's element from the document and all event listeners
  // attached to it. Exposed for subclasses using an alternative DOM
  // manipulation API.
  _removeElement: function () {
      this.$el.remove();
  }
```

解除事件监听，删掉元素。

## 最终的 hide 方法

于是，我模仿着写了一个 hide 方法：
```js
  hide: function () {
      this.undelegateEvents();
      this.$el.empty();
      this.stopListening();
  }
```
好像很简单，哈哈， 顺便把 appView 里面也改掉：
```js
if (this.siderView) {
    this.siderView.hide();
}

if (!App.currentRouter || App.currentRouter === 'chat') {
    this.siderView = new ChatSiderView();
} else if (App.currentRouter === 'broadcast') {
    this.siderView = new DoctorProfileView();
}

this.siderView.render();
```
运行之后，切换 view 正常了。耶！

然后我想让我的view 都具有 hide 这个方法，恰好 backbone 很好的面向对象，于是：
```js
/*global define*/
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var BaseView = Backbone.View.extend({

        hide: function () {
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();
        }

    });

    return BaseView;

});

// how to use
var ChatSiderView = BaseView.extend({

    el: '.left_aside',

    //...
});
```

感觉非常顺畅。

## 后记
频繁的删除dom元素，速度肯定是慢的，恰好我的网页很简单，所以看不出明显的缺点，网上也是推荐使用 `display：none` 和 `display：block` 来切换 view， 等我以后再研究吧。

以上。
