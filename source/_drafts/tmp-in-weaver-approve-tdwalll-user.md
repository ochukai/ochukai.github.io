title: tmp-in-weaver-approve-tdwalll-user
tags:
  - null
categories:
  - null
draft: 'true'
date: 2016-11-22 10:44:30
---

```sql
Field          Type           Null    Key     Default  Comment                      
-------------  -------------  ------  ------  -------  ---------------------------
id             varchar(32)    NO      PRI     (NULL)                                          
tdwallid       varchar(32)    YES             (NULL)   签到墙ID   

fileid         varchar(32)    YES             (NULL)   签到上传的图片        
remark         varchar(2000)  YES             (NULL)   签到发送的文字        
ifapprove      tinyint(4)     YES             (NULL)   是否审核通过 0否1是  
nickname       varchar(200)   YES             (NULL)   用户昵称                 
userimg        varchar(1000)  YES             (NULL)   用户头像                 
```

```
/eb/tdwall/data/list/:tdwallid? pageNo pageSize

/eb/tdwall/data/list/updateApprove/:dataid?ifapprove=0 or 1
```