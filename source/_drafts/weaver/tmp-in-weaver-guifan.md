title: '''tmp-in-weaver-guifan'''
tags:
  - null
categories:
  - null
draft: 'true'
date: 2016-12-08 18:20:56
---

```
PC端访问入口   /eb/ 开头
移动端访问入口 /ebclient/ 开头

类名：
  EbXxxxController
  EbXxxxService
  EbXxxxModel
  EbXxxxBean
  EbXxxxUtils
```

```
页面：
PC端： /webpage/p/xxxx/xxxx.html  小写

  /webpage/p/xxxx/css
  /webpage/p/xxxx/js
  /webpage/p/xxxx/image

移动端：/webpage/m/xxxx/xxxx.html 小写

  /webpage/m/xxxx/css
  /webpage/m/xxxx/js
  /webpage/m/xxxx/image
```

```
数据库：
  eb_xxx_ 开头
每张表必须包含字段
  id varchar(32) 唯一标识
  creatorid varchar(32)  创建人
  createtime datetime  创建时间
  updaterid varchar(32) 修改人
  updatetime datetime 修改时间
  tenantid varchar(32) 租户ID
```


如果是人员类数据表，还需要一个字段，对应 eb_userdata 表的 ID，即所有人员相关的数据都会对应 eb_userdata 表中的一条数据，可以调用 EbUserDataModel.findByUserDataBean 方法来获取，具体调用逻辑可以与我沟通确认

sysuserdataid varchar(32) 基础用户数据表ID

以上规则后续请严格遵循（已有的不规范的如果调整方便最好都统一调整好），其他规则会不断补充！