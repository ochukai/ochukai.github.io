title: wamp mysql 中文显示为？
tags:
  - mysql
  - 中文乱码
id: 235
categories:
  - MySQL
date: 2015-08-09 13:25:28
---

发现中文显示为“？”，然后我看了一下 mysql.ini，添加了两行

```
[mysqld]
port=3306
#下面的两行是添加的
character_set_client=utf8
character_set_server=utf8
```

后来再看 mysql 中的信息发现这样了，不过中文问题已经解决了。
```sql
mysql> show variables like 'character%';
+--------------------------+----------------------------------------------------
+
| Variable_name            | Value
|
+--------------------------+----------------------------------------------------
+
| character_set_client     | gbk
|
| character_set_connection | gbk
|
| character_set_database   | utf8
|
| character_set_filesystem | binary
|
| character_set_results    | gbk
|
| character_set_server     | utf8
|
| character_set_system     | utf8
|
| character_sets_dir       | E:\Soft\wamp\bin\mysql\mysql5.6.12\share\charsets\
|
+--------------------------+----------------------------------------------------
```