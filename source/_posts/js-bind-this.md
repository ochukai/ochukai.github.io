title: JavaScript 绑定 this
tags:
  - this
  - js
categories:
  - JavaScript
date: 2016-12-30 10:28:20
---

其实这篇文章主要是介绍这个东西 [Proposal Bind Operator](https://github.com/tc39/proposal-bind-operator) 或者 [bind_operator](http://wiki.ecmascript.org/doku.php?id=strawman:bind_operator)。

也是在一个很偶然的机会看到了，git 上面的一个项目用到了这个用法，为什么自己发现不了这些东西呢？

## 传统的 this 绑定

### 在函数外面暂存一个变量
```js
// 别名
var self = this;
setTimeout(function() {
  this.doSomething();
}, 1000);
```

### 使用 bind 函数 & 箭头函数

在使用 `class *** extends React.Component {}` 的写法声明 React 组件的时候，组件的方法都不会被自动绑定 this 了，下面的两种方法比较常见：

```js
// bind
setTimeout(
  function() {
    this.doSomething();
  }.bind(this), 
  1000
);
```

使用 `bind` 方法显得稍微有点长，不太好看，不过很好用。

```js
// var _this = this;

// bind
setTimeout(
  () => {
    // _this.doSomething();
    this.doSomething();
  }, 
  1000
);
```

箭头函数在经过`babel`编译后， 差不多就是注释的部分了， 还是用的暂存的办法保存了 `this`，但是写法就简单了太多。

### ::

看到这种语法之后，感觉其他的都弱爆了。

在 React 里面，可以这么写

```jsx
// { title: '******************', onConfirm: this.handleSave.bind(this) },
<Popconfirm title="确定要保存吗？" onConfirm={::this.handleSave}>
  <Button type="ghost" >保存</Button>
</Popconfirm>
```

可以看到，注释部分表示的编译后的代码，就是用 `bind` 实现的。

双冒号前面的对象就是 `bind` 的参数， 如果没有就是当前的 `this`, 毕竟这种做法就是用来做绑定的。

但是有一个问题，就是像这样的需求不好实现，

```jsx
<Button
  type="ghost"
  icon="edit"
  onClick={this.handleEdit.bind(this, item)}
/>
```

然后就是黑人问号脸，我试了几种形式 (当然不能用 bind 方法，否则这 :: 没有意义了)

* [this, item]::this.handleEdit
* (this, item)::this.handleEdit  // hhh
* this::this.handleEdit(item)    // hhh

感觉唯一靠谱的就是第一种写法了， 编译之后

```js
_react2.default.createElement(
  _button2.default,
  { 
    type: 'ghost', 
    icon: 'edit', 
    onClick: (_context = [this, item], this.handleEdit).bind(_context) 
  },
  ''
)
```

这样 bind 之后的方法内的 this 是一个数组，要想获取到真正的 this, 在 handleEdit 中还需要做

```js
function handleEdit () {
  // this: [this, item]
  // 感觉好尴尬~
  console.log(this[0]);
  // const [ _this, item ] = this;
}
```

> 所以呢 在需要绑定 this 并且要添加额外参数的时候，就不要用 **::** 了。老老实实用 **bind** 就好了。

## 箭头函数声明在 class 里面

```jsx
class Example extends React.Component {

  handleButtonClick = (e) => {
    this.setState({ loading: true });
  };

  render() {
    return <Button onClick={this.handleButtonClick}>;
  }

}

// var Example = React.createClass({
//
//   handleButtonClick: function(e) {
//     this.setState({ loading: true });
//   },
//   ...
// });

```

这样应该是最简单的方式了，因为是自动绑定 this 的（与注释中的代码效果是一样的）。

以上。
