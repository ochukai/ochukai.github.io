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