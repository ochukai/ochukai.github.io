igtitle: Splice 和 Slice 的区别
tags:
  - splice
  - slice
categories:
  - Javascript
date: 2016-07-11 10:52:16
---

之前写过一遍介绍 `splice()` 方法的，这一次又遇到了 `slice()`, 这两个太像了, 首先看这两个意思吧：

> splice [splais]
> n. 接合；结婚
> vt. 拼接；接合；使结婚

和  

> slice [slais]
> n. 薄片；部分；菜刀，火铲
> vt. 切下；把…分成部分；将…切成薄片
> vi. 切开；割破

## 区别

`slice()` 方法可从已有的数组中返回选定的元素。这个函数有两个参数 `slice(start, end)` 会返回一个从 `start` 到 `end` 之前元素的新数组， 如果 `end` 是`负数`，就从数组末尾倒着数, 如果 end 没有设置，就返回从 start 到数组末尾组成的新数组咯~

总之这是一个返回新数组的函数，知识返回而已，不会改变原来的数组，而 `splice` 方法则会改变原来的数组.

## 例子
```
var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"

console.log(arr.slice(4)) // ["Adrew", "Martin"] == arr.slice(4, 6)
console.log(arr.slice(0, -4)) // ["George", "John"] == arr.slice(0, 2) 
```