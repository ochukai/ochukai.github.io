title: JavaScript 中的 Decorator
tags:
  - decorator
categories:
  - JavaScript
date: 2016-12-21 09:33:38
---

昨天在看一个拖拽库的时候，遇到了这么一段代码，感觉很有意思：
```jsx
@sortable
class DemoHOCItem extends React.Component {

  render() {
    return (
      <div { ...this.props }>
        { this.props.children }
      </div>
    );
  }
  
}
```

查了一下之后发现这是 es7 的新语法，叫 [Decorator](https://github.com/wycats/javascript-decorators)。

## 语法

如果要定义一个 Decorator 的话，不难，其实每一个 decorator 就是一个 function，有三个参数，像这样

```js
let log = (target, name, descriptor) => {
  console.log(target, name, descriptor);

  const method = descriptor.value;
  descriptor.value = (...args) => {
    logger.info(`before function execute: ${name}(${args}) = ?`);
    return method.apply(target, args);
  }
}
```

三个参数还是比较好理解的

然后要用这个 decorator 的时候

```js
class Example {

  @log
  add(a, b) {
    return a + b;
  }
   
}

let my = new Example();
my.add(2, 3);
```

这好像跟 Java 的 Annotation 形式差不多。 但是功能却跟 Python 的 Decorator 一样。

下面是运行时的输出

![正常](..//images/decorator-1.png)

所以呢，decorator 的三个参数分别是
1. target 目标方法所在的类
2. name 方法名
3. descriptor 该方法的一些描述， 其中 `value` 就是方法本身，这一点再上一个例子中已经用过了。

## 用在 class 上面

因为我最开始见到 decorator 是看到

```jsx
@sortable
class DemoHOCItem extends React.Component {/*...*/}
```

这时， decorator 是用在 class 上面的，当 decorator 用在 class 上面的时候只有第一个参数有值，比如

```js
@log
class Example {

  @log
  add(a, b) { return a + b; }
   
}
```
只会输出

```shell
# 也就是 name, descriptor 都是 undefined
2016-12-21 10:28:26.617 function Example() {
        _classCallCheck(this, Example);
    } undefined undefined
```