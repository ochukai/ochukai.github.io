title: 修改 wamp 中 mysql 默认空密码
tags:
  - mysql
  - password
date: 2015-07-31 23:32:13
---

```sql
use mysql

update user set password=PASSWORD('hooray') where user='root';

flush privileges;
```
