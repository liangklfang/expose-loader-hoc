/**
 * 归属者搜索组件 单选 返回工号信息
 */

import React from 'react';
import { Select, Spin } from 'antd';
import IO from './IO.js';
const Option = Select.Option;

class UserSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.state = {
      //select option列表
      data: [],
      fetching: false,
      value:this.props.value
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.props.value){
      this.setState({
        value:nextProps.value
      })
    }
  }


  fetchData = (value) => {
    if(!value && value!==''){
      this.lastFetchId += 1;
      this.setState({ data:[],fetching:false });
    }
    else{
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.setState({ fetching: true ,value});
      //下面这一部分可以作为业务参数注入 todo修改
      IO.findUserByKeyword({keyword: value})
      .then((res) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        if (res.success == true) {
            if(res.data){
              const data = res.data.map(item => ({
                text: `${item.empId}-${item.lastName}(${item.nickNameCn})`,
                value: item.empId+'',
              }));
              this.setState({ data,fetching:false });
            }
        } else {
          this.setState({ data:[],fetching:false });
          //message.warning(res.message || '搜索用户信息失败');
        }
      });
    }
  }


  // 处理选中的数据变化
  handleSelect = (value) => {
    //找到value对应的data 返回对应的data
    this.setState({
      data:[],
      fetching: false
    });

    const onChange = this.props.onChange;
    onChange && onChange(value);
  }



  render() {
    const { fetching, data, value } = this.state;
    const placeholder = this.props.placeholder || '请输入姓名或工号搜索';
    return (
      <div className="buc-user-select">
        <Select
          mode={"combobox"}
          style={{'width':'100%'}}
          placeholder={placeholder}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchData}
          onSelect={this.handleSelect}
          value={value}
          disabled={this.props.disabled || false}
        >
          {data.map((d,index)=> <Option key={index} value={d.value}>{d.text}</Option>)}
        </Select>
      </div>
    );
  }
}

UserSelect.displayName = 'UserSelect';
export default UserSelect;
