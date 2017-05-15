title: 升级到 React 15.5.0 之后遇到的问题。
tags:
  - react
  - jscodeshift
  - proptypes
  - react-codemod
date: 2017-04-17 16:43:52
---

propTypes 被从 react 包里面分离出来了，如果要用到 **propTypes**, 则必须要自己安装 `prop-types`

```sh
npm install prop-types --save
```

那么，对于之前项目里面已经存在的 **propTypes** 呢，可以使用 facebook 的这个工具 jscodeshift[^1] 和 codemod[^2], 其中 codemod 最好 clone 在当前项目文件夹。

用法像这样：

```shell
jscodeshift 
  --extensions=js,jsx 
  -t ./react-codemod/transforms/React-PropTypes-to-prop-types.js 
  src

Processing 310 files...
Spawning 3 workers...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 50 files to free worker...
Sending 10 files to free worker...
All done.
Results:
  0   errors
  0   unmodified
  310 skipped
  0   ok
Time elapsed: 4.758seconds
```

执行完之后，代码会变成这样：

{% codeblock lang:js mark:1,9-15 %}
import PropTypes from 'prop-types';
import React from 'react';

import { Form, Card, Modal, Spin } from 'antd';

// ...

UserAnswerModal.propTypes = {
  item: PropTypes.object,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
{% endcodeblock %}

于是问题就解决了，但是因为你引用的包可能会有这个问题，所以 warning 应该不会消失。

[^1]: [github/jscodeshift](https://github.com/facebook/jscodeshift)
[^2]: [github/react-codemod](https://github.com/reactjs/react-codemod)
