title: tmp-in-weaver-vote
tags:
  - null
categories:
  - null
---

```sql
CREATE TABLE eb_vote (
  id                varchar(32)    NOT NULL,
  title             varchar(255)   NULL  '标题',
  desc              varchar(1000)  NULL  '描述',

  is_finish         tinyint(4)     NULL  '是否结束：0-否、1-是，手动控制的结束',
  is_open           tinyint(4)     NULL  '是否开放投票：0-否、1-是',

  start_time        datetime       NULL  '开始时间',
  end_time          datetime       NULL  '结束时间',

  vote_count        tinyint(4)     NULL  '每人允许投票数',
  repeat_vote       tinyint(4)     NULL  '是否允许重复投票：0-否、1-是',
  show_result       tinyint(4)     NULL  '手机端显示结果：0-不显示、1-投票后显示、2-投票前显示',

  usersoruce        varchar(255)   NULL  '用户来源', # 不知道什么意思
  result_sortby     tinyint(4)     NULL  '投票结果排序：1-按投票项顺序、2-按投票数降序、3-按投票数升序',

  relate_meeting_id varchar(32)    NULL  '关联会议id'
)

CREATE TABLE eb_vote_item (
  id              varchar(32)    NOT NULL,

  name            varchar(255)   NULL  '投票项名称',
  desc            varchar(1000)  NULL  '投票项描述',
  image_id        varchar(32)    NULL  '图片id',    #图片
  sort            tinyint(4)     NULL  '排序',

  relate_vote_id  varchar(32)    NULL  '关联投票id'
) 

CREATE TABLE eb_vote_screen_setting (
  id                varchar(32)   NOT NULL,

  # 三个图片
  logo              varchar(255)  NULL  'logo',
  banner            varchar(255)  NULL  'banner',
  background_image  varchar(255)  NULL  '投影屏幕背景',

  is_default        tinyint(4)    NULL  '默认设置：0-否、1-是',
  relate_vote_id    varchar(32)   NULL  '投票id'
)
```



```jsx
import { Form, Input, Icon, Button } from 'antd';
const FormItem = Form.Item;

let uuid = 0;
class DynamicFieldSet extends React.Component {
  
  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
    });
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };

    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Passengers' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            }],
          })(
            <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      );
    });

    return (
      <Form horizontal>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

ReactDOM.render(<WrappedDynamicFieldSet />, mountNode);

```

