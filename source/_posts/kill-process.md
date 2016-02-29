title: 杀死正在占有你端口的小程序
tags:
  - 端口占用
categories:
  - LINUX
date: 2016-02-25 18:38:07
---

最近在 mac 上用 terminal 启动 python 的时候经常会提示我，端口被占用了，像这样
``` bash
0 errors found
February 25, 2016 - 18:25:21
Django version 1.6.7, using settings 'green.settings'
Starting development server at http://0.0.0.0:8000/
Quit the server with CONTROL-C.
Error: That port is already in use.
```

```
ps aux | grep python
```

```shell
(kkh)➜  green git:(feature/shopping_mall_womens_day) ✗ ps aux | grep python
Oliver          23232   0.0  0.0  2434840    752 s002  S+    5:25下午   0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn python
Oliver          23103   0.0  0.8  2550628  66364 s002  S     5:23下午   0:02.23 /Users/Oliver/dev/kkh/bin/python manage.py runserver 0.0.0.0:8000
```

```bash
kill 23103
```
