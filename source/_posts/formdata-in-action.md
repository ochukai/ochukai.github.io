title: 使用 formData 提交表单和上传图片
tags:
  - formData
  - ajax
  - image upload
categories:
  - form
  - JavaScript
date: 2016-04-11 15:34:57
---
最近做了一个表单，需要提交好多信息和一些图片，后台的同学说要图片随着表单一起提交。那就不能用 ajax 单张上传了~

图片的话，最多可以选8张，选中了的也可以取消掉，因为并没有传到服务器，所以删除很easy。

然后我就想到了可以用 FormData 来做，因为之前好像用过，感觉很方便。

### FormData

> The FormData interface provides a way to easily construct a set of `key/value` pairs representing form fields and their values, which can then be easily sent using the `XMLHttpRequest.send()` method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".

如果使用 jQuery 提交 formData 的话，大致像这样：
```js
$.ajax({
  url        : url,
  type       : 'POST',
  data       : formData,
  // 下面这两条需要特别注意
  processData: false,
  contentType: false,
  success(data) {
    // ...
  },
  error(xhr) {
    // ...
  }
});
```

就是把 formData 作为 data 发送到后台就好了，如果要构造一个 formData 对象的话，也很简单呢
```js

var formdata = new FormData();
formData.append('ticket_id', 1);

```

如果放文件在 formData 里面的话呢，也没有太复杂的地方：
```js
// html
// <input
//   ref="input-image"
//   accept="image/*"
//   onChange={ this.onImageSelected }
//   type="file"
// />

// ....
isImage: function (file) {
  // (!src.type.match(/image.*/)
  var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
  return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
},

onImageSelected(e) {
  var file = e.target.files[0];
  console.log('select image', file);

  if (!this.isImage(file)) {
    Modal.error({ title: '请选择一张图片' });
    return;
  }

  this.props.onImageSelected(file);
}
// ...

// 放多个也可以~
formData.append('file1', file1)
formData.append('file2', file2)

```

对了，因为我把上传文件的 input 隐藏掉了，显示出来了是一个 加号 的图标，所以如果要触发 input 的点击事件的话：
```js
onItemClick() {
  const input = findDOMNode(this.refs['input-image']);
  input.click();
},
```

### 生成 formData
一个一个的 append 可能速度太慢了，而且需要每个都写一遍，其实生成的 formData 的方式还是蛮多的：
```js
// 1
var form =  document.getElementById("form");
var formdata = new FormData(form);

// 2
var form =  document.getElementById("form");
var formdata = form.getFormData();
```

好了，没了。
