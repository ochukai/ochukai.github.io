title: JavaScript 中 Timestamp 与 Date 的转化
tags:
  - ts
  - date
  - format
  - js
categories:
  - JavaScript
date: 2015-12-02 11:10:44
---
## 问题产生
今天在处理一个接口时，发现返回的格式是这样的：
```json
{
    'meta': {
        'has_next_msg': false
    }
    'objects': [
        {
            'text': '111', 
            'from_user_type': 'PAT', 
            'pic': '', 
            'ts': 1419939065
        }
    ]
}
```

`ts` 那个属性我不太熟悉，不过我觉得应该是 timestamp 的意思吧。后来才知道，`ts` 就是该条消息的发送时间戳（timestamp），显示这条信息的时候应该显示为日期。

## 把 Date 转化为 Timestamp

我们都知道，在 js 里面把 date 转化为 timestamp 的方法比较简单，而且方法也有好多种，比如：

```js
// get the timestamp in seconds
Math.floor(Date.now() / 1000);

// or with a slightly way
Date.now() / 1000 | 0

// Year 2038 problem? lol...
new Date('Jan 1, 2039') / 1000 | 0 // -2117514496 

/*----------*/
Math.round(new Date().getTime()/1000);

+new Date / 1000 | 0

~~(Date.now() / 1000)

new Date / 1e3 | 0
```

## 把 Timestamp 转化为 Date

还有一种需求，比如我要把 timestamp 转化为 `1991-10-03 06:01:54` ，那么就需要先把这个 timestamp 转化为日期， 然后再进行format吧，正好我找到一个比较方便的办法：
```js
Date.prototype.format = function(format) {
    var o = {
        'M+': this.getMonth() + 1,          // month
        'd+': this.getDate(),                 // day
        'h+': this.getHours(),                  // hour
        'm+': this.getMinutes(),                  // minute
        's+': this.getSeconds(),                    // second     
        'q+': Math.floor((this.getMonth() + 3) / 3),  // quarter
        'S' : this.getMilliseconds()                 // millisecond
    };
    
    // year
    if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '')
                       .substr(4 - RegExp.$1.length));
    }
    
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            var first = RegExp.$1;
            var str = first.length === 1 
                    ? o[k] 
                    : ('00' + o[k]).substr(('' + o[k]).length); // nb
            format = format.replace(first, str);
        }
    }
    
    return format;
};

function tsToDate(timestamp) {
    return (new Date(timestamp * 1000)).format('yyyy-MM-dd hh:mm:ss');
} 


// test it
> tsToDate(1448967948)
< "2015-12-01 19:05:48"
```