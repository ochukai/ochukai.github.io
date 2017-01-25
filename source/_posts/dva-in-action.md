title: 稍微总结一下 dva 😜
tags:
  - dva
  - react
  - js
categories:
  - React
  - JavaScript
date: 2017-01-23 09:28:20
---

使用 dva 已经四个月了吧，陆陆续续做了两三个项目，之前在非常恶心的傻逼公司 Kyligence，算是我的 dva 的启蒙地，那一天傍晚，不小心看到了 ant-tool，然后又看到了 antd，于是感觉我的前端有了一次不小的改变~ 😇

## 几个概念

![](../images/dva-flow.png)

上面是一张 dva 的图，`component，state，dispatch，connect` 都是与 redux 一样的概念，不过，dva 把 **action -> reducer** 拆分成了，**action -> model(reducer, effect,subscription)**，这一部分改变的还是很多的，让 dispatch 的写法方便了一万倍。

## Model

一个简单的 model 是这样的:

```js
export default {
  namespace: 'example', // 这里是命名空间  
  state: {},
  subscriptions: {},
  
  effects: {
    * query({ payload }, { select, call, put }) {
      //
    }
  },

  reducers: {
    querySuccess(state, { payload }) {
      //
    }
  },
}
```

### namespace

可以简单的理解为 comboReducer 使用这个值作为 key，而且 namespace 最重要的地方是用在 dispatch（put）的时候

```js
// 假如 example 的 model 定义了 query 这个 effect 或者 reducer。
dispatch({ type: 'example/query' })

// 当前 model 中存在名为 querySuccess 的 reducer
// 然后在 effect 中这样访问 reducer
yield put({ type: 'querySuccess' }) 

// 在组件中当然可以直接 dispatch({ type: 'example/someReducer' })
```

### state 

就是一个对象

### subscriptions 

顾名思义可以订阅一些事件，待续😆

### effects 

异步操作，这里使用了 [redux-sagas](https://github.com/redux-saga/redux-saga)，先举个例子吧，其实就是异步的action， 但是是使用 sagas 实现的，很好（niu）看（bi）。

```js
  // ...
  * update({ payload }, { call, put }) {
    yield put({ type: 'showModalLoading' });

    const { data } = yield call(saveTenants, payload);
    if (data.status === 'success') {
      yield put({ type: 'hideModal' });
      yield put({ type: 'query' }); // 刷新一下列表
    } else {
      yield put({ type: 'hideModalLoading' });
    }
  },
  // ...
```

（感觉丝毫不需要我用文字描述，顺着读完就知道是什么意思了，还是特么异步的）

> select, put, call 这些概念是 sagas 里面的

### reducer 

修改 state 的地方

## dva

dva 会对 dispatch 做一些处理，比如他要把 **example/query** 分成 example 下面的 query （effect/reducer）。

所以肯定要注册这个 model，才能让 dva 知道 example 的存在，

```js
import dva from 'dva';
const app = dva();

app.model(require('./models/example'));
```

其实 dva 出了 model 这个方法，还有其他的几个

```js
// 1. Init
import dva from 'dva';
const app = dva();

// 2. Plugins
app.use({
/**
* called when an effect or subscription emit an error.
*
* @param  {string} err       Exception
* @param  {function} action  the effect or subscription
*/
// onError : (err, action) => {}
});

// 3. Model
app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

```

## [dev-cli](https://github.com/dvajs/dva-cli)

比较好用的东西，解决了新建 router，component，model 还要添加 dva 的配置的问题，生成 router， component 的同时会直接在 dva 配置中更新。

例子：

```js
$ dva g route product-list
$ dva g model products
$ dva g component Editor
$ dva g component Users/UserModal
$ dva g component Header --no-css
```