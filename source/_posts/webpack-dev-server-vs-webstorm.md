title: webpack-dev-server 在 webstorm 中失效的问题
tags:
  - webpack-dev-server
  - webpack
  - webstorm
categories:
  - WebStorm
date: 2016-12-08 19:32:09
---

最近换了公司 ！！！

重新用上了高大上的 win7 系统，还是熟悉的画面，然后又装上了 WebStorm，准备开始我的性福人生。

但天有不测风云，在使用一个基于 webpack 构建的项目中，每次修改代码之后，webpack-dev-server 总是不能够自动重新编译，很烦！！！

这可急坏了宝宝！！！

但是我非常冷静的分析了一下原因，可能是因为webstorm有自动保存的机制， 是不是很机智，一下子就命中了要害（但其实这中间的过程可复杂了）

![正常](../images/webstorm-save-file.png)

如上图， 在 `File -> Settings -> Appearance & Behavior -> System Settings` 里面，取消勾选上面红框的两项。

每次修改之后，`ctrl + s` 就可以了。
 