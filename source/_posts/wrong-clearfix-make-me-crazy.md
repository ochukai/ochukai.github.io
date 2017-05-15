title: Clearfix 的正确写法~
tags:
  - html
  - css
categories:
  - css
---

Clearfix 就是这么简单！

```css
.clearfix:after,
.clearfix:before {
    display: table;
    content: " "
}

.clearfix:after {
    clear: both
}
```
