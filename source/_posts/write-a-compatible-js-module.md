title: 编写一个可以兼容 AMD 和 CMD 的 js 模块
tags:
  - compatible module
  - AMD
  - CMD
categories:
  - JavaScript
date: 2015-11-29 20:11:07
---

没什么好解释的，直接看代码吧。

```js
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        //define(['jquery', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify/Seajs
        module.exports = factory(require('jquery'), require('underscore'));
    } else {
        // Browser globals
        factory(jQuery, _);
        //factory();
    }
}(function ($, _) {
    //doSomething...
}));
```

还有一种写法
```js
// from: http://segmentfault.com/a/1190000003732752
;(function(){
    function MyModule() {
        // ...
    }
    
    var moduleName = MyModule;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = moduleName;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() { return moduleName; });
    } else {
        this.moduleName = moduleName;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
});
```