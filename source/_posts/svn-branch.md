title: 使用 SVN 的 branch 功能 😂
tags:
  - svn
  - branch
date: 2018-12-14 17:18:08
---

## 前言

来到目前这个公司就一直再用 svn，工作之余可能会用 git 管理一些自己的项目。

目前这个项目写了一年，基本都是流水线似的开发，写完一个功能发布一个功能，一共两个人，就做在一起，沟通基本靠吼。

现在项目基本稳定了，但是要解决一些小 bug 之类的，解决之后当天直接就打包上线了，于是矛盾就出现了，功能稳定了，之前立下的 flag 要开始实现了，“发布之后这个就升级一下” 之类的话，现在要开始做了。

所以呢，如果在主分支上面升级新功能，当天解决的 bug 要打包就不愉快了，因为新代码把之前的代码搞乱了。

现在就需要分支了，其实早就需要分支了。

前几天我还在用 git 做分支，改 bug 的话， 就切换到 master，改完 bug svn 提交，打包。之后再 切回之前的 git 分支，但是 git 和 svn 的合作并不是特别融洽，麻烦。

所以今天学了一下 svn 的分支，真的，自从我听说 svn，就从来没用过他的分支功能，想来也不会太好用。

## 开始学习 svn 的分支之前

这些知识是我看到 svn 的 branch 之后才知道的，但是要写在前面，我也不知道为啥，就写在这里吧。

### svn 的目录结构

在 svn server 的管理界面创建新的 repo 的时候，会有两种选项
1. empty repo
2. trunk，branches，tags

第二种的意思是，创建一个 repo 文件夹，并且新建 trunk（主分支），branches（分支），tags（标签） 这三个文件夹。

第二种应该算是标准的 svn 项目结构，服务器使用 trunk 部署，平时开发在各自的分支上面做开发，做好了合并到 trunk。

## 创建分支

svn 创建分支的命令是 **copy**，是不是很神奇。

svn 创建分支的意思大概是，把这个文件夹复制到别的地方，你随便搞吧。因为是两个文件夹，所以肯定没关系。

所以要创建分支，可以直接执行， svn copy trunk/ branches/branch_name, svn 会原封不动的 把 trunk 文件夹的内容复制到 branches 下面的  branch_name 文件夹，真的一模一样。

```sh
ochukai@DESKTOP-IMK2E44 MINGW64 /e/dev/svn/***-pc
$ ls
branches  tags  trunk

ochukai@DESKTOP-IMK2E44 MINGW64 /e/dev/svn/***-pc
$ svn copy trunk/ branches/branch_name
A         branches/branch_name
# 提交
ochukai@DESKTOP-IMK2E44 MINGW64 /e/dev/svn/***-pc
$ svn commit -m "add branch_name"
```

## 切换分支

切换分支就是打开文件夹， **cd branches/branch_name**

## 合并
跟 git 差不多。

**svn merge ../branches/branch_name/**

```sh
ochukai@DESKTOP-IMK2E44 MINGW64 /e/dev/svn/***-pc/trunk
$ svn merge ../branches/branch_name/
# ...

ochukai@DESKTOP-IMK2E44 MINGW64 /e/dev/svn/***-pc
$ svn commit -m "merge"
```

好了。






