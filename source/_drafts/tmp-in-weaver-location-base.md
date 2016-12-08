title: tmp in weaver - location-base
tags:
  - null
categories:
  - null
draft: 'true'
date: 2016-11-22 10:44:30
---
# 导航设置
## 表结构
```sql
CREATE TABLE `eb_location_base` (
  `id` varchar(32) NOT NULL,
  `name` text COMMENT '位置名称',
  `desc` text COMMENT '位置描述',
  `descaddr` text COMMENT '详细地址',
  `lng` varchar(200) DEFAULT NULL COMMENT '经度',
  `lat` varchar(200) DEFAULT NULL COMMENT '纬度',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `updatetime` datetime DEFAULT NULL COMMENT '最后更新时间',
  `userid` varchar(32) DEFAULT NULL COMMENT '创建人ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```

## API
```shell
/ebridge/location/saveOrUpdate 保存或者更新
/ebridge/location/delete 删除
/ebridge/location/getElbById 根据ID获取单个数据
/ebridge/location/getElbList 获取列表的
```

```
标题：单行文本
描述：单行文本
详细地址：
定位点选择：（从百度地图选择经纬度坐标）

http://developer.baidu.com/map/jsdemo.htm#i1_1
```


```js
	// 百度地图API功能
	var map = new BMap.Map("allmap");          
	map.centerAndZoom('上海', 11);
  map.addEventListener("click", function(e){
		alert(e.point.lng + "," + e.point.lat);
	});

	var local = new BMap.LocalSearch(map, {
		renderOptions:{map: map}
	});

	local.search("开元名都大酒店");
```


```js
// 百度地图API功能
	var map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
	/*
  缩放控件type有四种类型:
	BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；
  BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；
  BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮
  */
	
	//添加控件和比例尺
	function add_control(){
		map.addControl(top_left_control);        
		map.addControl(top_left_navigation);     
		map.addControl(top_right_navigation);    
	}
	//移除控件和比例尺
	function delete_control(){
		map.removeControl(top_left_control);     
		map.removeControl(top_left_navigation);  
		map.removeControl(top_right_navigation); 
	}
```


```js
var map = new BMap.Map("container");
map.centerAndZoom(new BMap.Point(121.461165, 31.234095), 11);

function search () {
  var myAddress = document.getElementById('searchValue').value;

  var myGeo = new BMap.Geocoder();
  myGeo.getPoint(myAddress, function(point) { //我输入的是“知春路”，第一步getPoint是地址解析。
    if (point) {
      map.centerAndZoom(point, 16);
      map.addOverlay(new BMap.Marker(point));

      myGeo.getLocation(point, function(rs) { //这里弹出“知春路”的详细地址信息，第二步getLocation是反地址解析。
        var addComp = rs.addressComponents;
        console.log(addComp);
      });
    }
  }, "上海市"); //必须设置城市
}
```

# 议程设置
## 表结构
## API

# 议程查看
## 表结构
## API