title:  Zepto 插件写法
tags:
  - zepto
categories:
  - JavaScript
date: 2016-06-20 14:32:33
---
一般是这样的...  比较水, 并没有怎么写过.

我只是把 bootstrap 的 button 组件改了一下, 删掉了 data-api 部分, 感觉这样该够用了。

```js

+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element);
    this.options   = $.extend({}, Button.DEFAULTS, options);
  }

  Button.DEFAULTS = {
    loadingText: 'loading...';
  }

  Button.prototype.setState = function (state) {};

  Button.prototype.toggle = function () {};


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this),
          lookup   = $.fn.button.lookup,
          instance = lookup[$this.data('bs.button')];

      if (!instance) {
        lookup[++lookup.i] = (instance = new Button(this, options));
        $this.data('bs.button', lookup.i);
      }

      // button method
      // if (option == 'toggle') {
      //   data.toggle();
      // } else if (option) {
      //   data.setState(option);
      // }
    });
  }

  var old = $.fn.button;

  $.fn.button             = Plugin;
  $.fn.button.lookup      = { i: 0 };
  $.fn.button.Constructor = Button;


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };

} (Zepto);

```
