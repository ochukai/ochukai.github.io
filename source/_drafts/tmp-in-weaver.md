title: tmp in weaver
tags:
  - null
categories:
  - null
draft: 'true'
date: 2016-11-22 09:49:57
---

```sql
CREATE TABLE `eb_lottery_screen_setting` (
  `id` varchar(32) NOT NULL,
  `logo` varchar(255) DEFAULT NULL COMMENT 'logo',
  `banner` varchar(255) DEFAULT NULL COMMENT 'banner',
  `background_image` varchar(255) DEFAULT NULL COMMENT '投影屏幕背景',
  `scroll_music` varchar(255) DEFAULT NULL COMMENT '摇奖音乐',
  `win_music` varchar(255) DEFAULT NULL COMMENT '中奖音乐',
  `is_default` tinyint(4) DEFAULT NULL COMMENT '默认设置：0-否、1-是',
  `relate_activity_id` varchar(32) DEFAULT NULL COMMENT '活动id',
  `creatorid` varchar(32) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `updaterid` varchar(32) DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL,
  `tenantid` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
```

相关字段：
* Logo logo
* Banner banner
* 投影屏幕背景 background_image
* 摇奖音乐 scroll_music
* 中奖音乐 win_music
* 默认设置 is_default
* 相关活动 relate_activity_id


```js
  const beforeCoverUpload = (file) => {
    const isSuitable = /^image\/(png|jpe?g)$/i.test(file.type);
    if (!isSuitable) {
      message.error("请上传png, jpeg, jpg格式的图片！");
    }
    return isSuitable;
  }

  
  const afterFileUpload = (fileid) => {
    setFieldsValue({'meeting.cover': fileid});
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      
      onSearch(getFieldsValue());
    });
  }


```


对岗位职责的理解
按照要求写好前端网页，偶尔修改一些简单的后台代码。
及时发现自己代码的问题，尽量 bug 要少~

试用期的成长
知道了云桥系统
知道了e-cology，e-office，e-teams 的区别与使用场景（试用了e-teams， 界面超级好看，仅次于我们的会务系统了）
对 react 的工具栈又有了新的认识，之前对 dva 不是很熟悉，现在就很擅长了。
现在慢慢适应了签到签退每天写微博的工作了。


目前存在的不足
之前就发生过因为交流不够 然后有一个表单的形式写错了，我感觉还是要更多的沟通。
偶尔早上的时候会犯困（九点半到十点半之间），导致效率比较低。


如何做的更好
多向老同事学习
努力做好本职工作，严格要求自
多学习与工作相关的知识
和同事搞好关系，和周围的人和谐相处
保持自己好的态度以及整洁的形象

对本公司和产品建议和意见
都挺好的，就是 查看或者编辑流程要弹出一个窗口感觉不太好，有时这个窗口就不知道去哪了，如果是一个新 tab 会体验好一些~


