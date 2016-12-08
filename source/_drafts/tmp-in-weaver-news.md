title: '''tmp-in-weaver-news'''
tags:
  - null
categories:
  - null
draft: 'true'
date: 2016-11-24 17:39:33
---

会议图文信息
```
/eb/meeting/news/saveOrUpdate
/eb/meeting/news/delete
/eb/meeting/news/getEmnById
/eb/meeting/news/getEmnList
```

图文里面的议程

```
/eb/meeting/agenda/saveOrUpdate
/eb/meeting/agenda/delete
/eb/meeting/agenda/getEmaById
/eb/meeting/agenda/getEmaList
```

> 第一个参数以emn.  
> 第二个参数以ema.


```sql
CREATE TABLE `eb_meeting_news` (
  `id` varchar(32) NOT NULL,
  `meetingid` varchar(32) DEFAULT NULL COMMENT '会议ID',
 
  `title` varchar(500) DEFAULT NULL COMMENT '标题',
  `desc` text COMMENT '描述',
 
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `updatetime` datetime DEFAULT NULL COMMENT '最后修改时间',
  `userid` varchar(32) DEFAULT NULL COMMENT '创建人ID',
  `tenantid` varchar(32) DEFAULT NULL COMMENT '租户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```

```sql
CREATE TABLE `eb_meeting_agenda` (
  `id` varchar(32) NOT NULL,
  `newsid` varchar(32) DEFAULT NULL COMMENT '会议描述表ID', # 点击的时候 会 携带过来
  `parentid` varchar(32) DEFAULT NULL COMMENT '上级议程ID', # 添加子议程
  
  `title` varchar(500) DEFAULT NULL COMMENT '议程标题',
  `desc` text COMMENT '议程描述',
  `starttime` datetime DEFAULT NULL COMMENT '开始时间',
  `endtime` datetime DEFAULT NULL COMMENT '结束时间',
  `ifreward` tinyint(4) DEFAULT NULL COMMENT '是否开启悬赏',

  'sort' # 排序

  `userid` varchar(32) DEFAULT NULL COMMENT '创建人ID',
  `tenantid` varchar(32) DEFAULT NULL COMMENT '租户ID',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `updatetime` datetime DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

```

```js

import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || '0';
//   const tns = _tns || gData;

//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z);

const Demo = React.createClass({
  getInitialState() {
    return {
      gData,
      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    };
  },

  onDragEnter(info) {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  },

  onDrop(info) {
    console.log(info);

    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }

        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const data = [...this.state.gData];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      ar.splice(i, 0, dragObj);
    } else {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    }

    this.setState({ gData: data });
  },

  render() {
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
      }

      return <TreeNode key={item.key} title={item.key} />;
    });

    return (
      <Tree
        defaultExpandedKeys={this.state.expandedKeys}
        draggable
        onDragEnter={this.onDragEnter}
        onDrop={this.onDrop}
      >
        {loop(this.state.gData)}
      </Tree>
    );
  },

});

ReactDOM.render(<Demo />, mountNode);
```


```js
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

function generateTreeNodes(treeNode) {
  const arr = [];
  const key = treeNode.props.eventKey;
  for (let i = 0; i < 3; i++) {
    arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
  }
  
  return arr;
}

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
        curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };

  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data) => {
    if (level < 1 || curKey.length - 3 > level * 2) 
      return;

    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };

  loop(treeData);
  setLeaf(treeData, curKey, level);
}

const Demo = React.createClass({
  getInitialState() {
    return {
      treeData: [],
    };
  },

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        treeData: [
          { name: 'pNode 01', key: '0-0' },
          { name: 'pNode 02', key: '0-1' },
          { name: 'pNode 03', key: '0-2', isLeaf: true },
        ],
      });
    }, 100);
  },

  onSelect(info) {
    console.log('selected', info);
  },

  onLoadData(treeNode) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
        this.setState({ treeData });
        resolve();
      }, 1000);
    });
  },

  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
      }

      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;
    });

    const treeNodes = loop(this.state.treeData);
    return (
      <Tree onSelect={this.onSelect} loadData={this.onLoadData}>
        {treeNodes}
      </Tree>
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
```