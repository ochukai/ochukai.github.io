title: 在微信网页上面不要识别电话号码
tags:
  - 微信开发
categories:
  - 微信开发
date: 2016-02-26 18:36:25
---

在 header 里面加上下面两个 meta 就好了。

```html
<meta name="format-detection" content="telephone=no"/>
<meta http-equiv="x-rim-auto-match" content="none">
```



        var shareContent = JSON.stringify({
            "title": title,
            "description": description,
            "url": url,
            "imgUrl": imgUrl,
            "type": "link",
            "dataUrl": ""
        });
        var greenapple_share = function () {
            try {
                window.js_bridge.return_jsonstr(shareContent);
            } catch (err) {
                return shareContent;
            }
        };
        try {
            window.js_bridge.return_jsonstr(shareContent);
            window.js_bridge.need_share();
        } catch (err) {
            console.log(err);
        }
