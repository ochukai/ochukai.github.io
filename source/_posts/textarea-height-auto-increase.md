title: Textarea 的高度自动增长
tags:
  - textarea
categories:
  - HTML
date: 2017-01-20 11:48:10
---

一般情况下，textarea 的高度是定死的，rows 指定了之后，高度就不变了，内容多了之后会出现滚动条，这样的设定在大部分的场景下面是够用的， 但是有时就会很丑陋（废话😊）。

我们都知道 HTML 的元素都有一个 scrollHeight 这个属性，就是当该元素出现滚动条的时候，内容的高度。

那就方便了：

```js
$(".weui-textarea").on('input propertychange keyup',function () {
  $(this).height(this.scrollHeight);
});
```

这样就实现了高度自动增加的 Textarea，但当我试着删掉几行，想让它自动降低高度的时候不禁菊花一紧，他不动~

这就尴尬,,ԾㅂԾ,,了，于是我就找了另外一种方法:

```js
$('.weui-textarea').on('input keyup', function () {
  // 尝试滚动一段距离，如果没有滚动条，scrollTop 还是 0
  if (this.scrollTop == 0) {
    this.scrollTop = 1;
  }

  while (this.scrollTop == 0) {
    if (this.rows > minRows) {
      this.rows--;
    } else {
      break;
    }

    this.scrollTop = 1;
    if (this.rows < maxRows) {
      this.style.overflowY = "hidden";
    }

    if (this.scrollTop > 0) {
      this.rows++;
      break;
    }
  }

  while (this.scrollTop > 0) {
    if (this.rows < maxRows) {
      this.rows++;
      if (this.scrollTop == 0) {
        this.scrollTop = 1;
      }
    } else {
      this.style.overflowY = "auto";
      break;
    }
  }
});
```

这是一个例子~ （换行试试~😏）

<textarea 
  class="weui-textarea" 
  placeholder="这是一个例子~" 
  rows="3" 
  style="resize: none;width: 100%;border: 1px solid pink; border-radius:4px; padding: 5px;font-size:14px;"></textarea>
<script>
  $(function () {

    var minRows = 3;
    var maxRows = 10;

    $('.weui-textarea').on('input keyup', function () {
      // 尝试滚动一段距离，如果没有滚动条，scrollTop 还是 0
      if (this.scrollTop == 0) {
        this.scrollTop = 1;
      }

      while (this.scrollTop == 0) {
        if (this.rows > minRows) {
          this.rows--;
        } else {
          break;
        }

        this.scrollTop = 1;
        if (this.rows < maxRows) {
          this.style.overflowY = "hidden";
        }

        if (this.scrollTop > 0) {
          this.rows++;
          break;
        }
      }

      while (this.scrollTop > 0) {
        if (this.rows < maxRows) {
          this.rows++;
          if (this.scrollTop == 0) {
            this.scrollTop = 1;
          }
        } else {
          this.style.overflowY = "auto";
          break;
        }
      }
    });

  });
</script>