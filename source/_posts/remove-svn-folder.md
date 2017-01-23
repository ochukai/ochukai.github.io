title: 删除 .svn 文件夹
tags:
  - svn
categories:
  - SVN
date: 2017-01-22 10:09:47
---

新建 remove-svn.bat, 放到项目根目录执行就好了。（本来以为 svn 会提供这样的功能，结果还要自己写，😒）

```bat
@echo on
@for /r . %%a in (.) do @if exist "%%a\.svn" rd /s /q "%%a\.svn"
@pause
```
