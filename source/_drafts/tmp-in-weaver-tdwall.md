title: '''tmp-in-weaver-tdwall'''
tags:
  - null
categories:
  - null
---

```sql

# logo
id              varchar(32) NOT NULL
tdwallid        varchar(32) NULL

backgroundImg   varchar(32) NULL 背景图片

showTime        tinyint(4)  NULL 头像显示时间
fillSpeed       tinyint(4)  NULL 头像填充速度 # 1 马上完成 2 加速 3 正常
# 头像显示方向暂时不要

isRepeatFill    tinyint(4)  NULL 是否重复填充
repeatFillTime  tinyint(4)  NULL 重复填充时间,单位分钟,在该时间后开始重复填充

gridSize        tinyint(4)  NULL 网格大小
maxX            tinyint(4)  NULL 横向最大多少格子
maxY            tinyint(4)  NULL 纵向最大多少格子
coordinates     text        NULL logo 坐标数组


isOpenXM        tinyint(4)  NULL 是否开启谢幕 # 0 否 1 是
curtainImageURL varchar(32) NULL 谢幕图片

```

```sql
# 3d

id                varchar(32) NOT NULL
tdwallid          varchar(32) NULL 活动ID

bgType            tinyint(4)  NULL 0: 使用颜色作为背景图片 10: 使用图片作为背景图片
bgImage           varchar(32) NULL BGType为 10 时 取该值作为背景图片
bgColor           varchar(30) NULL BGType为 0 时取该值作为背景颜色 默认为 #000

showTypes         varchar(50) NULL 图片动态组成的图案 0:球状 10:螺旋(圆柱) 20:网格(立方体) 30:自定义logo
changeSecond      tinyint(4)  NULL 动态图案切换时间，单位：秒

# 绘制 logo
logoSetting            text        NULL 自定义的logo坐标数组
logoBackgroundImageURL varchar(32) NULL 显示自定义logo时的背景图片,后台设置使用 -- 弹出框中的上传

logoType          tinyint(4)  NULL 缺省小图片的样式 0：半透明背景 10：背景图片
customImage       varchar(32) NULL LogoType 为 10 时取该值作为背景图片

isRepeatFill      tinyint(4)  NULL 是否开启图片重复填充
beginTime         datetime    NULL 重复填充开始时间

areaSize          smallint(8) NULL 图片运行远近0-4000

# 后台用
gridSize          tinyint(4)  NULL 绘制的logo的列数,后台用
isRepeatShow      tinyint(4)  NULL 是否开启图片循环展示到前台
```


```
/eb/tdwall/setting/logo/getSettingById

/eb/tdwall/setting/td/getSettingById
```