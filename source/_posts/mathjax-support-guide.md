title: ❤ 如何支持 MathJax~
tags:
  - mathjax
date: 2019-04-22 15:49:39
mathjax: true
---

好久好久之前就有一个 issue 提出来要支持 **MathJax**，结果到现在我都没有实现，直到昨天看到有人又要这个，所以我觉得还是写写吧，毕竟不是太复杂的东西。

是这个 [MathJax](https://github.com/mathjax/MathJax)， 但是这个 repo clone 到本地之后，我发现他有 50m + 的大小，于是找了一个 cdn:

```url
http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML
```

想要页面支持 MathJax，只要这个页面引入他的 js，然后按照 MathJax 的语法来写公式就 ok 了。

## mathjax: true

当然作为一个主题，我就帮你们把 js 引入了，你们只要写公式就好了，但是因为 MathJax 的 js 还是挺大的，所以我在页头加了一个属性：**mathjax**，就是来标加，如果当前文章需要 MathJax 的支持，就把 **mathjax** 设置为 **true**。

就像这样：

```
title: ❤ 如何支持 MathJax~
tags:
  - mathjax
date: 2019-04-22 15:49:39
mathjax: true
---
# 文章内容
```

其他页面就不用添加这个属性了，自动就不会引入 MathJax 的 js。

## 开始写公式

下面就是写公式了，之前我都没有接触过这个东西，所以随便从网上找了一个

```
$$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$
```

> new post -> 复制代码 -> yarn start -> 打开 localhost:4000

发现公式没有出来，于是我又去 bing 查了一下，原来还需要改一个东西，

大概就在 `~/node_modules/marked/lib/marked.js` 的第 464 行，如果找不到，就搜索 escape。

![修改代码](/images/mathjax-marked.png)

然后照图，把 **escape**， **em** 修改为下面的值:

```js
var inline = {
  // escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  escape: /^\\([`*\[\]()# +\-.!_>])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  // em: /^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,
  em:/^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
};
```

然后再次 yarn start，发现公式出来了~

$$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$

