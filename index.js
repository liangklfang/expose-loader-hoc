import React from "react";
import ReactDOM from "react-dom";
import jQuery from "jquery";
import { Form, Input, Select, Button } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
class Test extends React.Component {
  render() {
    return <div>我是内容{this.props.name}</div>;
  }
}

class Demo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback("Price must greater than zero!");
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log('HOCComponent被渲染后的name值为====',this.props.name);
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Price">
          {getFieldDecorator("price", {
            initialValue: 100
          })(<Input />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Submit,我的props为{this.props.name}
          </Button>
        </FormItem>
      </Form>
    );
  }
}


function withHeader(WrappedComponent) {
  return class HOC extends React.Component {
    render() {
      return (
        <div>
          <div className="demo-header">我是标题</div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}
//Demo = _antd.Form.create()(Demo);
// 我的代码打包成了SearchForm = _form2.default.create()(SearchForm);
Demo = Form.create()(Demo);
ReactDOM.render(
  <Demo name={"qt 0000"} />,
  document.getElementById("example")
);
export default Demo;
