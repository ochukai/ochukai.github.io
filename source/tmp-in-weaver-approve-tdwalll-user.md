title: tmp-in-weaver-approve-tdwalll-user
tags:
  - null
categories:
  - null
---


```sql
Field          Type           Collation           Null    Key     Default  Extra   Privileges                       Comment                      
-------------  -------------  ------------------  ------  ------  -------  ------  -------------------------------  -----------------------------
id             varchar(32)    utf8mb4_general_ci  NO      PRI     (NULL)           select,insert,update,references                               
tdwallid       varchar(32)    utf8mb4_general_ci  YES             (NULL)           select,insert,update,references  签到墙ID                  
fileid         varchar(32)    utf8mb4_general_ci  YES             (NULL)           select,insert,update,references  签到上传的图片        
remark         varchar(2000)  utf8mb4_general_ci  YES             (NULL)           select,insert,update,references  签到发送的文字        
ifapprove      tinyint(4)     (NULL)              YES             (NULL)           select,insert,update,references  是否审核通过 0否1是  
nickname       varchar(200)   utf8_general_ci     YES             (NULL)           select,insert,update,references  用户昵称                 
userimg        varchar(1000)  utf8_general_ci     YES             (NULL)           select,insert,update,references  用户头像                 
createtime     datetime       (NULL)              YES             (NULL)           select,insert,update,references                               
updatetime     datetime       (NULL)              YES             (NULL)           select,insert,update,references                               
creatorid      varchar(32)    utf8mb4_general_ci  YES             (NULL)           select,insert,update,references                               
updaterid      varchar(32)    utf8_general_ci     YES             (NULL)           select,insert,update,references                               
sysuserdataid  varchar(32)    utf8_general_ci     YES             (NULL)           select,insert,update,references  提交的用户ID            
tenantid       varchar(32)    utf8mb4_general_ci  YES             (NULL)           select,insert,update,references   
```
