title:  Canvas 方法小结
tags:
  - canvas
categories:
  - JavaScript
date: 2016-06-27 11:11:11
---

继上次 WebGL 魔方没有完成之后, 最近又想要写一个魔方, 同样的, 人生就需要一次说写就写的旅程。

## 原理
要用 Canvas 的 2d 做出 3d 的魔方,  

## 坐标系转换 

### 3D 转平面

```js
// ...
getPositionInTwoDimensionalSystem: function() {
    // focalLength 表示当前焦距，一般可设为一个常量
    var focalLength = 300;
    // 把z方向扁平化
    var scale = focalLength / (focalLength + this.z);
    this.x2 = this.x * scale;
    this.y2 = this.y * scale;
},
// ...


to2Dx: function() {
    var x = this.x,
        y = this.y + f;
    return VW * x / (VW + y);
},
to2Dy: function() {
    var y = this.y + f,
        z = this.z + h;
    return -(VW * z + VH * y) / (VW + y);
},

```

### 