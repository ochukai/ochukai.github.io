layout: drafts
title: 小程序
date: 2017-04-07 10:50:17
tags:
---

# app.json 配置项列表

* pages	  String Array	是	设置页面路径
* window	Object	否	设置默认页面的窗口表现
* tabBar	Object	否	设置底部 tab 的表现
* networkTimeout	Object	否	设置网络超时时间
* debug	          Boolean	否	设置是否开启 debug 模式

```
window

navigationBarBackgroundColor	HexColor	#000000	导航栏背景颜色，如"#000000"
navigationBarTextStyle	String	white	导航栏标题颜色，仅支持 black/white
navigationBarTitleText	String		导航栏标题文字内容
backgroundColor	HexColor	#ffffff	窗口的背景色
backgroundTextStyle	String	dark	下拉背景字体、loading 图的样式，仅支持 dark/light
enablePullDownRefresh	Boolean	false	是否开启下拉刷新，详见页面相关事件处理函数。
```


# page.json

* navigationBarBackgroundColor	HexColor	#000000	导航栏背景颜色，如"#000000"
* navigationBarTextStyle	String	white	导航栏标题颜色，仅支持 black/white
* navigationBarTitleText	String		导航栏标题文字内容
* backgroundColor	HexColor	#ffffff	窗口的背景色
* backgroundTextStyle	String	dark	下拉背景字体、loading 图的样式，仅支持 dark/light
* enablePullDownRefresh	Boolean	false	是否开启下拉刷新，详见页面相关事件处理函数。
* disableScroll	Boolean	false	设置为 true 则页面整体不能上下滚动；只在 page.json 中有效，无法在 app.json 中设置该项


## App
* onLaunch	Function	生命周期函数--监听小程序初始化	当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
* onShow	Function	生命周期函数--监听小程序显示	当小程序启动，或从后台进入前台显示，会触发 onShow
* onHide	Function	生命周期函数--监听小程序隐藏	当小程序从前台进入后台，会触发 onHide
* onError	Function	错误监听函数	当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
* 其他	Any		开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问

```js
App({
  onLaunch: function(options) { 
    // Do something initial when launch.
  },
  onShow: function(options) {
      // Do something when show.
  },
  onHide: function() {
      // Do something when hide.
  },
  onError: function(msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})
```


## 场景值
```
1001	发现栏小程序主入口
1005	顶部搜索框的搜索结果页
1006	发现栏小程序主入口搜索框的搜索结果页
1007	单人聊天会话
1008	群聊会话
1011	扫描二维码
1014	小程序模版消息
1020	公众号 profile 页相关小程序列表
1022	聊天顶部置顶小程序入口
1023	安卓系统桌面图标
1024	小程序 profile 页
1025	扫描一维码
1028	我的卡包
1029	卡券详情页
1035	公众号自定义菜单
1036	App 分享消息卡片
1042	添加好友搜索框的搜索结果页
1043	公众号模板消息
```

```js
Page({
  data: {
    text: "This is page data."
  },

  onLoad: function(options) {
    // Do some initialize when page load.一个页面只会调用一次
  },
  onReady: function() {
    // Do something when page ready.一个页面只会调用一次
  },
  
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    /*
    监听用户下拉刷新事件。
    需要在config的window选项中开启enablePullDownRefresh。
    当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
    */

  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
   // return custom share data when user share.
   /*
    只有定义了此事件处理函数，右上角菜单才会显示“分享”按钮
    用户点击分享按钮的时候会调用
    此事件需要 return 一个 Object，用于自定义分享内容
    */
  },
  // Event handler.
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    })
  },
  customData: {
    hi: 'MINA'
  }
})
```


```html
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```

嵌套

```html
<view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="i">
  <view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="j">
    <view wx:if="{{i <= j}}">
      {{i}} * {{j}} = {{i * j}}
    </view>
  </view>
</view>
```


事件

事件绑定

事件绑定的写法同组件的属性，以 key、value 的形式。
* key 以bind或catch开头，然后跟上事件的类型，如bindtap, catchtouchstart
*value 是一个字符串，需要在对应的 Page 中定义同名的函数。不然当触发事件的时候会报错。

**bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。**

```html
<view id="outter" bindtap="handleTap1">
  outer view
  <view id="middle" catchtap="handleTap2">
    middle view
    <view id="inner" bindtap="handleTap3">inner view</view>
  </view>
</view>
```


### dataset
在组件中可以定义数据，这些数据将会通过事件传递给 SERVICE。 书写方式： 以data-开头，多个单词由连字符-链接，不能有大写(大写会自动转成小写)如data-element-type，最终在 event.target.dataset 中会将连字符转成驼峰elementType。

示例：

```js
// <view data-alpha-beta="1" data-alphaBeta="2" bindtap="bindViewTap"> DataSet Test </view>
Page({
  bindViewTap:function(event){
    event.target.dataset.alphaBeta === 1 // - 会转为驼峰写法
    event.target.dataset.alphabeta === 2 // 大写会转为小写
  }
})
```

### 尺寸单位
rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

设备	         rpx换算px (屏幕宽度/750)	px换算rpx (750/屏幕宽度)
iPhone5	      1rpx = 0.42px	  1px = 2.34rpx
iPhone6	      1rpx = 0.5px	  1px = 2rpx
iPhone6 Plus	1rpx = 0.552px	1px = 1.81rpx


### 全局样式与局部样式
定义在 app.wxss 中的样式为全局样式，作用于每一个页面。
在 page 的 wxss 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。
