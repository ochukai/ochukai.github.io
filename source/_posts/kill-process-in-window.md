title: 在 window 里面杀死某个进程
tags:
  - 端口占用
categories:
  - Window
date: 2016-11-22 09:49:57
---

## 查看被谁占用
```shell
netstat -ano | findstr 8989
  
# C:\Users\Administrator>netstat -ano | findstr 8989
#   TCP    0.0.0.0:8989           0.0.0.0:0              LISTENING       6360
#   TCP    [::]:8989              [::]:0                 LISTENING       6360
#   TCP    [::1]:8989             [::1]:53638            ESTABLISHED     6360
#   TCP    [::1]:8989             [::1]:53640            ESTABLISHED     6360
#   TCP    [::1]:8989             [::1]:53641            ESTABLISHED     6360
#   TCP    [::1]:8989             [::1]:53645            ESTABLISHED     6360
#   TCP    [::1]:8989             [::1]:53646            ESTABLISHED     6360
#   TCP    [::1]:8989             [::1]:53652            ESTABLISHED     6360
#   TCP    [::1]:8989             [::1]:53653            ESTABLISHED     6360
#   TCP    [::1]:8989             [::1]:53654            ESTABLISHED     6360
#   TCP    [::1]:53638            [::1]:8989             ESTABLISHED     5440
#   TCP    [::1]:53640            [::1]:8989             ESTABLISHED     5440
#   TCP    [::1]:53641            [::1]:8989             ESTABLISHED     5440
#   TCP    [::1]:53645            [::1]:8989             ESTABLISHED     5440
#   TCP    [::1]:53646            [::1]:8989             ESTABLISHED     5440
#   TCP    [::1]:53652            [::1]:8989             ESTABLISHED     5440
#   TCP    [::1]:53653            [::1]:8989             ESTABLISHED     5440
#   TCP    [::1]:53654            [::1]:8989             ESTABLISHED     5440
```

```shell
tasklist | findstr 8989//查看pid为3036的是什么程序在用
```

## 杀死某进程
```shell
# /T 包括子进程
# /F 强制
  
taskkill /T /F /PID 8989
```
