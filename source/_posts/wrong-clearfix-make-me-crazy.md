title: 'Wrong clearfix Make me crazy!'
date: 2015-11-11 17:45:59
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
