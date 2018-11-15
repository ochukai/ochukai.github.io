title: flex shrink 的用处
tags:
  - flex
  - flex shrink
date: 2017-08-08 15:38:17
---

flex grow 和 shrink 这两兄弟我经常遇见，不过目前为止，grow 还没有帮过我什么忙， shrink 很不错，帮过我几次了。

```css
flex-shrink: 0
```

每当别的元素位置不够了，要来挤压我的空间时， flex-shrink 就会帮我把别的元素挡在门外，是一个很有原则的人。

> flex-shrink 定义收缩比率。不允许负值
