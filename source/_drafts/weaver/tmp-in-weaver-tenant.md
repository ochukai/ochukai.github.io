title: temp-in-weaver-tenant
tags:
  - null
categories:
  - null
---


@章宏武  @王仲海  @王洪亮   会务上需要有个租户管理界面，

查询租户

可以调整  租用的版本、 到期日期、 用户数  、租户名称、禁用、启用 


```
/eb/base/tenant				          入口

/eb/base/tenant/save			      只能修改，不能新建
/eb/base/tenant/query			      条件、分页查询：name-租户名称，status-下拉框，正常：1、删除：0、禁用：-1
/eb/base/tenant/queryById/${id}	查询单条数据
/eb/base/tenant/changeStatus		参数：ids：id逗号分隔字符串，status：状态，参数值同query
```


id                varchar(32)            租户ID                                      
pid               varchar(32)            上级租户ID                                 
tenantid          varchar(32)            租户id                                   

maxcpcount        int(11)                企业号数量                                
maxmpcount        int(11)                公众号数量                                
isconcurrency     tinyint(1)             是否并发                                   
maxddcount        int(11)                钉钉号数量                                
maxlanxincount    int(11)                蓝信号数量                                
maxgzbcount       int(11)                工作宝号数量                             
maxjdyzjcount     int(11)                金蝶云之家号数量                       
maxweworkcount    int(11)                企业微信数量                             

company_code      int(11)                                                              
limit_user_count  int(11)                日访问限额      

                                                                            
version_level     tinyint(4)             版本   
status            int(11)                租户状态: -1-禁用、0-删除、1-正常  

-- 没用 
maxuser           int(11)                最大用户数                                  

name              varchar(50)            租户名称    
expire_time       date                   到期时间                                   
enable_seckill    tinyint(4)             是否开启秒杀功能：1-是、0-否   

createtime        datetime               创建时间                                   
creatorid         varchar(32)            创建人ID                                    
updatetime        datetime               最后修改时间                             
updaterid         varchar(32)            最后修改人ID  