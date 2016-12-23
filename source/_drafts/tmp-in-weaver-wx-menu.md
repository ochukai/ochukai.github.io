title: tmp-in-weaver-wx-menu
tags:
  - null
categories:
  - null
---

功能模块名称

1. 会议报名
2. 会议议程
3. 会议签到
4. 上墙互动
5. 抽奖活动
6. 活动投票—暂时不做
7. 文档内容—暂时不做
8. 文档列表—暂时不做

弹出窗口 

1. 菜单名称 
2. 是否分类菜单
    * 一级菜单可以取消选择此项，只有名称
    * 二级菜单不显示此项，默认显示下面的模块与列表
3. 左侧：显示功能模块
4. 右侧上方：搜索栏
5. 右侧中间：显示模块的数据（单选框 + 名称）
6. 右侧底部：分页按钮


```sql
Field         Type          Collation        Null    Key     Default  Extra   Privileges                       Comment                                                                                
------------  ------------  ---------------  ------  ------  -------  ------  -------------------------------  ---------------------------------------------------------------------------------------
id            varchar(32)   utf8_general_ci  NO      PRI     (NULL)           select,insert,update,references  菜单ID主键      

sysagentid    varchar(32)   utf8_general_ci  YES             (NULL)           select,insert,update,references  应用id                                                                               
type          tinyint(4)    (NULL)           YES             (NULL)           select,insert,update,references  企业号菜单还是公众号菜单                                                   
name          varchar(200)  utf8_general_ci  YES             (NULL)           select,insert,update,references  名字                                                                                 
menutype      tinyint(2)    (NULL)           YES             (NULL)           select,insert,update,references  菜单类型                                                                           
menukey       varchar(500)  utf8_general_ci  YES             (NULL)           select,insert,update,references  菜单key                                                                              
outinterface  varchar(32)   utf8_general_ci  YES             (NULL)           select,insert,update,references  调用接口                                                                           
outsysid      varchar(32)   utf8_general_ci  YES             (NULL)           select,insert,update,references  调用系统                                                                           
model         varchar(32)   utf8_general_ci  YES             (NULL)           select,insert,update,references  调用模块                                                                           
linkaddr      varchar(500)  utf8_general_ci  YES             (NULL)           select,insert,update,references  链接地址                                                                           
countaddr     varchar(500)  utf8_general_ci  YES             (NULL)           select,insert,update,references  获取未读数量链接                                                               
displayway    tinyint(4)    (NULL)           YES             (NULL)           select,insert,update,references  数据展示形式，0：链接，1：列表，2：幻灯片，3：列表和幻灯片  
pid           varchar(32)   utf8_general_ci  YES             (NULL)           select,insert,update,references  上级菜单id                                                                         
isoauth       tinyint(4)    (NULL)           YES             (NULL)           select,insert,update,references  是否授权                                                                           
xuhao         tinyint(4)    (NULL)           YES             (NULL)           select,insert,update,references  序号  
                                                                               
rmtype        tinyint(4)    (NULL)           YES             (NULL)           select,insert,update,references  回复消息类型                                                                     
returnmsg     varchar(32)   utf8_general_ci  YES             (NULL)           select,insert,update,references  回复信息                                                                           
                                                                     
exeaction     tinyint(4)    (NULL)           YES             (NULL)           select,insert,update,references  执行动作 0 回复消息 1调用接口                                              
tenantid      varchar(32)   utf8_general_ci  YES             (NULL)           select,insert,update,references  租户id                                                                               
cover         varchar(32)   utf8_general_ci  YES             (NULL)           select,insert,update,references  封面文件ID                                                                         
matchruleid   varchar(32)   utf8_general_ci  YES             (NULL)           select,insert,update,references  
```

```js
[
  {
    'id': '',

    'name': 'sdfsdsdf',
    'menutype': '1',
    'linkaddr': '',

    'menukey': '',
    'outinterface': '0',
    'outsysid': '0',
    'model': '0',
    'isoauth': '1',
    'returnmsg': '',
    'rmtype': '0',
    'exeaction': '0',
    'subList': [
      {
        'id': '',
        'name': 'sdfsadf',
        'menutype': '3',
        'linkaddr': '/sdfsdf',

        
        'menukey': '',
        'outinterface': '0',
        'outsysid': '0',
        'model': '0',
        'isoauth': '1',
        'returnmsg': '',
        'rmtype': '0',
        'exeaction': '0'
      }
    ]
  }
]
```

```
[
  {
    'id': 'sdsdsdfesdv',
    'name': 'sdfsdsdf',
    'pid': 0,
    'linkaddr': ''
  },
  {
    'id': '',
    'pid': 'sdsdsdfesdv',
    'name': '第一个菜单',
    'linkaddr': '/sdfsdf'
  },
  {
    'id': 'ggdfdsfgfghghjghjghj',
    'pid': '0',
    'name': '第一个菜单',
    'linkaddr': '/sdfsdf'
  },
  {
    'id': 'assfdsdfdfeee',
    'pid': 'ggdfdsfgfghghjghjghj',
    'name': '第一个菜单',
    'linkaddr': '/sdfsdf'
  },
  {
    'id': 'weerfgfgfhgsdgdgd',
    'pid': '0',
    'name': '第一个菜单',
    'linkaddr': '/sdfsdf'
  },
  {
    'id': 'ssdsasdfdsfsdfasdf',
    'pid': 'ggdfdsfgfghghjghjghj',
    'name': '第一个菜单',
    'linkaddr': '/sdfsdf'
  },
  {
    'id': 'ssssdsdsdsdsdsds',
    'pid': 'weerfgfgfhgsdgdgd',
    'name': '第一个菜单',
    'linkaddr': '/sdfsdf'
  }
]

```


```js
[
  {
    type: 1,
    name: '回忆',
    url: ''
  }

]
```


```

getTypeList -- [type name url]

getTypeDatas -- list, page

```


```js

import { Table, Icon, Switch, Radio, Form } from 'antd';
const FormItem = Form.Item;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 150,
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: 70,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  width: 360,
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const footer = () => 'Here is footer';
const scroll = { y: 240 };

class Demo extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination: true,
    size: 'default',
    expandedRowRender,
    title,
    footer,
    rowSelection: {},
    scroll: undefined,
  }

  handleToggle = (prop) => {
    return (enable) => {
      this.setState({ [prop]: enable });
    };
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  handleExpandChange = (enable) => {
    this.setState({ expandedRowRender: enable ? expandedRowRender : false });
  }

  handleTitleChange = (enable) => {
    this.setState({ title: enable ? title : undefined });
  }

  handleFooterChange = (enable) => {
    this.setState({ footer: enable ? footer : undefined });
  }

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  }

  handleScollChange = (enable) => {
    this.setState({ scroll: enable ? scroll : undefined });
  }

  render() {
    const state = this.state;
    return (
      <div>
        <Table {...this.state} columns={columns} dataSource={data} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

```jsx
<ButtonGroup>
  <Popover
    placement="topLeft"
    content={
      <div>
        <Button>边缘对齐</Button><br/>
        <Button>边缘对齐</Button><br/>
        <Button>边缘对齐</Button>
      </div>
    }
  >
    <Button>边缘对齐</Button>
  </Popover>
  <Popover
    placement="topLeft"
    content={
      <div>
        <Button>边缘对齐</Button><br/>
        <Button>边缘对齐</Button><br/>
        <Button>边缘对齐</Button>
      </div>
    }
  >
    <Button>边缘对齐</Button>
  </Popover>
  <Popover
    placement="topLeft"
    content={
      <div>
        <Button>边缘对齐</Button><br/>
        <Button>边缘对齐</Button><br/>
        <Button>边缘对齐</Button>
      </div>
    }
  >
    <Button>边缘对齐</Button>
  </Popover>
</ButtonGroup>
```