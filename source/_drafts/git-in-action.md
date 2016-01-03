title: git in action
tags:
  - git
categories:
  - GIT
---

# git 的工作流

```sh
git-flow feature start cs_send_message_to_doctor
```

# branch

# stash
* git stash: 备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到Git栈中。
* git stash pop: 从Git栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复。
* git stash list: 显示Git栈内的所有备份，可以利用这个列表来决定从那个地方恢复。
* git stash clear: 清空Git栈。
* git stash apply stash@{n}: 恢复到第 n 个

### git stash apply 的例子
```shell
$ git stash list
stash@{0}: WIP on master: e95dc37 Require administrator authority...
stash@{1}: WIP on md_develop: fcaa18f Add an object to recieve md...

$ git stash apply stash@{1}
```

> 而且，pop 出来的内容只是你上次 stash 时候的内容，在这之间，如果对stash的文件做了修改，`stash pop` 之后就没了。  

> 所以在 `stash pop` 之前尽量`commit`一下，然后用 `cherry-pick` 来通过增量的方法将修复的内容合并到新版本上，如果有冲突需要手动解决。

# fetch 和 pull 的区别

# cherry-pick

# revert 和 reset
- git revert 是撤销某次操作，此次操作之前的commit都会被保留
- git reset 是撤销某次提交，但是此次之后的修改都会被退回到暂存区