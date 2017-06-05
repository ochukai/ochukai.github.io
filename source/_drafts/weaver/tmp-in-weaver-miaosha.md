title: tmp-in-weaver-miaosha
tags:
  - null
categories:
  - null
---


具体逻辑

1、新建，往数据库插入数据

2、点击立即开始：修改活动状态，为进行中、实际开始时间为当前时间、然后推送消息给用户

3、用户收到信息，点击进入
     如果没用有包了则显示已结束
     如果还有红包则显示抢
    点击【抢】告知结果，
    如果抢到 则发送红包给他
    如果没抢到则告知没抢到
    
4、展示抢的结果

5、大屏幕上实时展示抢到的红包的用户——和去年的摇一摇红包一样

----------------------------------


秒杀功能。需求见上面发送的。

1、PC端操作界面就是我刚才发的界面

2、移动端 就是去年的红包功能的 抢红包部分  拷贝过来修改

3、大屏幕样式 和效果就用去年 摇一摇红包的效果

@王仲海 负责  ，PC刚才发送的界面前端编写

@王洪亮，负责后端对接

@ 丁坤宇 负责整体协调及大屏幕编写

@陈伟，负责移动端 墙红包的界面调整

@章宏武 协助补充完成相关逻辑



@王朋飞，@吕德强  你们重点测试一下      滚动抽奖+数钱功能。


```sql
CREATE TABLE `eb_seckill_base` (
  `id` varchar(32) NOT NULL,
  `name` varchar(200) DEFAULT NULL COMMENT '活动名称',

  `type` tinyint(4) DEFAULT NULL COMMENT '秒杀类型 1:实物 2:红包',
  `money` int(8) DEFAULT NULL COMMENT '红包总金额,单位：元',
  `givetype` tinyint(4) DEFAULT NULL COMMENT '红包分配方式 1:均分 2:随机',
  `min` int(8) DEFAULT NULL COMMENT '随机红包的最小金额',
  `max` int(8) DEFAULT NULL COMMENT '随机红包的最大金额',

  `goodsname` varchar(500) DEFAULT NULL COMMENT '物品名称',
  `count` tinyint(4) DEFAULT NULL COMMENT '秒杀数量',

  `imgid` varchar(32) DEFAULT NULL COMMENT '奖品图片',

  `starttime` date DEFAULT NULL COMMENT '开始时间',
  
  `pageid` varchar(32) DEFAULT NULL COMMENT '依赖应用',

)
```