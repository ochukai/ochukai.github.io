title: 使用命令行更新 Win10 的密钥
tags:
  - win10
  - win10-key
  - slmgr
date: 2016-12-16 13:02:13
---

今天在公司装了 win10，但是点击更换密钥的时候老是卡死，然后就搜了一下发现可以用命令行设置

```shell
# 设置密钥
slmgr /ipk DDCGG-9N3QJ-2B23T-C***V-XD72F

# 检查是否已激活
slmgr.vbs -ato
```
