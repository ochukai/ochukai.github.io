title: tmp in weaver
tags:
  - null
categories:
  - null
draft: 'true'
date: 2016-11-22 09:49:57
---

wx737946fa638ad945

84969dd348a56818d0f05033a7ae2b3a

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






云桥会务需要实现的4个需求点

1、云桥会务移动端注册页面
    1.1 用户访问，提示是否 授权 云桥—就是ouath过程
    1.2 确认授权之后  如果未注册过的进入授权表单填写页面
    1.3 如果注册过的直接进入 系统
——和PC端逻辑是一直的，只是PC端是扫码，移动端不是扫码

2、从企业号单点登录到会务系统

2.1用户点击企业号菜单，进行企业号的oauth，得到用户企业号中的信息wxuserid
2.3根据这个wxuserid去数据库查询这个wxuserid是否绑定的用户
2.3 如果绑定了那么直接进入系统
2.4 如果没绑定那么按照上面 1的流程进行（最后把注册账号和企业号账号绑定在一起）

3、从OA系统单点登录到会务系统
3.1用户点击OA系统菜单,创建ticket，将ticket传递到会务系统
3.2 会务系统根据ticket 获取这个用户在OA中的信息（id）
3.2 根据这个OA id 去数据库查询这个OAID是否绑定了的用户
3.3 如果绑定了那么直接进入系统
3.4 如果没绑定那么按照上面 1的流程进行（最后把注册账号和企业号账号绑定在一起）

4、通讯录功能：
  4.1 一个人一旦与一个租户发生会议关系，报名，签到、抽奖 等等，就会加入到这个租户的通讯录中（类似会员）
  4.2 参会者与租户关联表数据信息包含（姓名、手机、单位、职务、邮件、创建者、所有者，后续字段可以扩展）
  4.3  用户在手机上可以通过一个连接，访问这卡片显示——姓名、手机、单位、职务、邮件，以及二维码
  4.4  后续可以通过扫描这个二维码来进行签到等各种动作

   通讯录数据的权限，
    1、租户管理员看所有
    2、普通用户看创建者、所有者 是自己的 +共享给自己的。
    3、这个用户参与过你组织的活动（只能看基本信息）


--------------------------------------

需要有一个云桥mysql数据库连接的操作手册。

1、获取账号密码
2、开放异地访问权限
3、安装工具

附录

关闭异地访问权限


-------------------------

加 主题（subject），左侧菜单就改成叫FAQ，点击出现的是主题列表，

主题暂时包含名称和描述，可以新建、编辑、删除、数据维护、查看（直接进入前台的查询页面），数据维护就是现在的 问题列表维护页面， 即每个问题都是属于某个主题的，分类也是一样，

每个主题下面的数据是独立的， 两个主题之间没有什么关联性， 

前台的查看查询页面 就是某个主题下的所有数据（传一个主题ID），
页面上的大标题（包括title）取主题的名称，description取主题的描述
