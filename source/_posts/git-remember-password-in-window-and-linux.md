title: GIT - 记住密码在 window & linux
tags:
  - git
  - 记住密码
categories:
  - GIT
date: 2015-11-23 10:46:44
---

# Window

```sh
# 因为 window 不允许之间新建 . 开头的文件，所以使用 mv 的方式
mv git-credentials .git-credentials
```

然后编辑 **.git-credentials**
```
# github 是这样的格式
https://{username}:{password}@github.com 

# git.oschina.net 是这样的
https://{username}:{password}@git.oschina.net
```

最后一步是
```sh
git config --global credential.helper store
```

# Linux

> 在此之前或许要添加 ssh-key (https://help.github.com/articles/generating-ssh-keys/#platform-linux)

```
$ git config --global credential.helper cache
# 默认缓存密码15分钟，可以改得更长, 比如1小时
$ git config --global credential.helper 'cache --timeout=3600'
```
