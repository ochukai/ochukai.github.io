title: Javascript 中的 splice 方法

tags:
  - splice
  - array
  - js

categories:
  - javascript
  - date: 2016-03-16 14:25:53

--------------------------------------------------------------------------------

> splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。(会改变原始数组)

## 语法

```js
  arrayObject.splice(index, how-many, item1, item2, ...itemX)
```

参数               | 描述
----------------- | -----------------------------------
index             | 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
how-many          | 必需。要删除的项目数量。``如果设置为 0，则不会删除项目``。
item1, ..., itemX | 可选。向数组添加的新项目。

## 用法举例

在数组最开始插入一个元素
```js
var arrr = [1,2,3,4];   // arrr: [1, 2, 3, 4]
arrr.splice(0, 0, 0);   // arrr: [0, 1, 2, 3, 4]
```

删除第三个
```js
arrr.splice(3, 1) // return [3] 删除的元素会做为返回返回值
                  // arrr: [0, 1, 2, 4]
```

删除后面两个
```js
arrr.splice(2, 2) // return [2， 4]
                  // arrr: [0, 1]
```
