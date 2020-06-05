import React, {Component} from 'react';
import '../style/globalStyle.css';
import '../style/style.css';
import axios from '../axios/index';

import {Button, Card, Checkbox, Form, Input, Modal} from 'antd';
const FormItem = Form.Item;

class Floor2Right extends Component {
  state = {
    socialNumber: '',
    showModal1: false,
    showModal2: false,
    companyName: '',
    buttonText: '获取验证码',
    cursorType: 'no-drop',
    backgroundColor: '#eee',
    textColor: '#aaa',
    time: 5,
    telNumber: '',
    isChecked: false
  };

  componentDidMount() {
    this.requestList();
  }

  // 请求假数据
  requestList = () => {
    axios.ajax({
      url: '/list/list',
      data: {
        params: {
          companyName: '中国东信' // 传参
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        this.setState({
          companyName: res.data.companyName
        });
      }
    });
  };

  // 打开 同意授权协议 详情
  handleShowAgrement = (e) => {
    this.setState({
      showModal1: true
    });
  };

  // 打开 点击查看 详情
  handleCheckForLook = () => {
    this.setState({
      showModal2: true
    });
  };

  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values); // 可以成功取到数据
      }
      // 这里写发送表单内容给后端接口的代码
    });
  };

  // 监听输入公司名称, 如果符合接口数据, 则返回社会信用代码
  handleChange = (e) => {
    let value = e.target.value;
    if (value == this.state.companyName) {
      axios.ajax({
        url: '/list/list',
        data: {
          params: {
            companyName: '中国东信'
          }
        }
      }).then((res) => {
        if (res.code == 0) {
          this.setState({
            socialNumber: res.data.socialNumber
          });
        }
      });
    }
  };

  // 监听电话号码
  handleChangeTelNumber = (e) => {
    // 先把输入的号码储存下来存到state变量中
    let value = e.target.value;
    this.setState({
      telNumber: value
    });
    // 注意!! 这里长度要加1, 经过测试, telNumber长度从0开始
    if (this.state.telNumber.length + 1 == 11) {
      this.setState({
        cursorType: 'pointer',
        backgroundColor: '#d3e1fd',
        textColor: '#0f71cb'
      });
    } else {
      // 如果长度不等于11位数. 意思是重新获取验证码之前对号码进行了改动, 那就要禁用按钮
      this.setState({
        cursorType: 'no-drop',
        backgroundColor: '#eee',
        textColor: '#aaa'
      });
    }
  };

  // 获取验证码
  handleClickButton = () => {
    this.setState({
      cursorType: 'no-drop',
      backgroundColor: '#eee',
      textColor: '#aaa'
    });
    // 每隔一秒执行一次countDown方法
    this.timeChange = setInterval(this.countDown, 1000);
  };

  countDown = () => {
    // 关键在于用ti取代time进行计算和判断，因为time在方法中不会进行刷新
    let ti = this.state.time;
    if (ti > 0) {
      ti = ti - 1;
      this.setState({
        time: ti, // 实时刷新数字
        buttonText: ti + '秒后重新获取'
      });
    } else {
      // 当ti=0时执行终止循环方法
      clearInterval(this.timeChange);
      this.setState({
        cursorType: 'no-drop',
        time: 5,
        buttonText: '获取验证码'
      });
      this.reSendCode(); // 调用再次获取验证码方法
    }
  };

  // 再次获取验证码
  reSendCode = () => {
    // 这里一定要先做判断位数是否等于11, 因为当倒计时到0时
    // 肯定会调用这个方法. 没有这个位数判断, 我修改号码位数同样可以执行获取验证码操作
    // 如果有位数的变动, 则会触发 handleChangeTelNumber
    if (this.state.telNumber.length == 11) {
      this.setState({
        cursorType: 'pointer',
        backgroundColor: '#d3e1fd',
        textColor: '#0f71cb'
      });
    }
  };

  // checkbox点击事件改变选中状态
  handleClickCheckBox = () => {
    this.setState({
      isChecked: this.state.isChecked == false ? true : false
    });
  };

  // 自定义校验方法是否勾选checkbox
  handleConfirm = (rule, value, callback) => {
    if (this.state.isChecked == true) {
      callback('请勾选同意授权协议');
    }
    callback(); // 回调函数必须调用
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const FormItemLayout = {
      labelCol: {span: 9},
      wrapperCol: {span: 15}
    };
    const tailLayout = {
      wrapperCol: {
        offset: 12,
        span: 12
      }
    };

    return (
      <div>
        <Card
          bordered={false}
          style={{marginTop: '50px'}}
        >
          <Form
            layout="horizontal"
          >
            <FormItem
              label="资金需求"
              colon={false}
              {...FormItemLayout}
            >
              {
                getFieldDecorator('moneyRequire', {
                  rules: [
                    {
                      required: true,
                      message: '资金需求不能为空'
                    },
                    {
                      pattern: /^\d{1,5}$/, // 判断输入的资金是否为数字且在1~5位数之间
                      message: '资金需求为1~5位纯数字'
                    }
                  ]
                })(<Input type="text" placeholder="请输入金额"/>)
              }
              <span className="moneyKind">万元</span>
            </FormItem>
            <FormItem
              label="企业名称"
              colon={false}
              {...FormItemLayout}
            >
              {
                getFieldDecorator('companyName', {
                  rules: [
                    {
                      required: true,
                      message: '企业名称不能为空'
                    }
                  ]
                })(<Input onChange={this.handleChange} on placeholder="请输入企业名称"/>)
              }
            </FormItem>
            <FormItem
              label="社会信用代码(或纳税人识别号)"
              colon={false}
              {...FormItemLayout}
            >
              {
                getFieldDecorator('socialNumber', {
                  initialValue: this.state.socialNumber
                })(<Input disabled/>)
              }
            </FormItem>
            <FormItem
              label="法定代表人姓名"
              colon={false}
              {...FormItemLayout}
            >
              {
                getFieldDecorator('representativeName', {
                  rules: [
                    {
                      required: true,
                      message: '法定代表人不能为空'
                    }
                  ]
                })(<Input type="text" placeholder="请输入联系人"/>)
              }
            </FormItem>
            <FormItem
              label="法定代表人身份证号"
              colon={false}
              {...FormItemLayout}
            >
              {
                getFieldDecorator('idNumber', {
                  rules: [
                    {
                      required: true,
                      message: '法定代表人身份证号不能为空'
                    }
                  ]
                })(<Input type="number" placeholder="请输入法定代表人身份证号"/>)
              }
            </FormItem>
            <FormItem
              label="联系人电话"
              colon={false}
              style={{display: 'inline-block', width: 'calc(46%)', marginRight: 8, marginLeft: 120}}
              {...FormItemLayout}
            >
              {
                getFieldDecorator('telNumber', {
                  rules: [
                    {
                      required: true,
                      message: '联系人电话不能为空'
                    },
                    {
                      patter: /^\d{11}$/g,
                      message: '手机号格式错误'
                    }
                  ]
                })(<Input onChange={this.handleChangeTelNumber} placeholder="请输入联系方式"/>)
              }
            </FormItem>
            <FormItem
              label=""
              colon={false}
              style={{display: 'inline-block', width: 'calc(32%)'}}
            >
              {
                getFieldDecorator('telVerification', {
                  rules: [
                    {
                      required: true,
                      message: '短信码不能为空'
                    }
                  ]
                })(<Input placeholder="短信码"/>)
              }
              <button
                className="requiredAuth"
                onClick={this.state.cursorType == 'no-drop' ? '' : this.handleClickButton}
                style={{
                  cursor: this.state.cursorType,
                  background: this.state.backgroundColor,
                  color: this.state.textColor
                }}
              >
                {this.state.buttonText}
              </button>
            </FormItem>
            <Form.Item style={{display: 'inline-block', width: 'calc(50% - 5px)', marginRight: 8, paddingLeft: 100}}>
              {
                getFieldDecorator('userIsRead', {
                  rules: [
                    {
                      required: true,
                      message: '同意授权协议不能为空'
                    },
                    {
                      validator: this.handleConfirm // 自定义校验规则
                    }
                  ]
                })(
                  <Checkbox checked={this.state.isChecked} onClick={this.handleClickCheckBox}>
                    <span  onClick={this.handleShowAgrement} style={{color: '#127cdd'}}>同意授权协议</span>
                  </Checkbox>
                )
              }
            </Form.Item>
            <Form.Item style={{display: 'inline-block', width: 'calc(50% - 5px)', paddingLeft: 180}}>
              {
                getFieldDecorator('checkForLook', {})(
                  <span
                    onClick={this.handleCheckForLook}
                    style={{
                      color: '#127cdd',
                      textDecoration: 'underline',
                      paddingBottom: '1px',
                      borderBottom: '1px solid #000'
                    }}
                  >
                    点击查看
                  </span>
                )
              }
            </Form.Item>
            <FormItem
              {...tailLayout}
            >
              <Button
                onClick={this.handleSubmit}
                size="large"
                htmlType="submit"
                style={{
                  backgroundImage: 'linear-gradient(180deg,#fc7f53 9%,#fb5541 91%)',
                  borderRadius: '25px',
                  fontSize: '18px',
                  color: '#fff'
                }}
              >
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
        <Modal
          visible={this.state.showModal1}
          closable={false}
          footer={[
            <Button
              key="知道了"
              type="primary"
              onClick={() => {
                this.setState({
                  showModal1: false
                });
              }}>
              知道了
            </Button>
          ]}
        >
          <span className="spanTitle">用户业务隐私声明</span>
          <br/><br/>
          尊敬的用户：
          <br/><br/>
          &#8195;&#8195;广西联合征信有限公司（以下合称为“联合征信”、“我们”或“我们的”）充分尊重您的隐私权。我们特此制定本《用户业务隐私声明》（以下简称为“本声明”）以便您了解我们如何搜集、使用、披露、保护、存储及传输您的数据。请您仔细阅读本声明。如您有任何疑问，请告知我们，联系方式详见本声明第九条。如您继续使用联合征信提供的服务，则视为同意接受本隐私声明的约束。
          <br/><br/>
          &#8195;&#8195;本声明阐述了联合征信如何处理您的信息，但本声明不涵盖所有的处理场景，本声明讨论、提及、介绍的产品或服务视您所使用的平台或所在地理位置而有不同。<b>在使用具体产品或服务时，除本声明外，还建议您阅读有关隐私通知或补充声明。</b>
          <br/><br/>
          本声明将帮助您了解以下内容：
          <br/><br/>
          一、联合征信会如何收集和使用您的信息
          <br/><br/>
          二、联合征信会如何使用 Cookie 和同类技术
          <br/><br/>
          三、联合征信如何委托处理、共享、转让、公开披露您的信息
          <br/><br/>
          四、联合征信会如何保护您的信息
          <br/><br/>
          五、您如何管理您的信息
          <br/>
        </Modal>
        <Modal
          visible={this.state.showModal2}
          closable={false}
          footer={[
            <Button
              key="知道了"
              type="primary"
              onClick={() => {
                this.setState({
                  showModal2: false
                });
              }}>
              知道了
            </Button>
          ]}
        >
          <span className="spanTitle">用户业务隐私声明</span>
          <br/><br/>
          尊敬的用户：
          <br/><br/>
          &#8195;&#8195;广西联合征信有限公司（以下合称为“联合征信”、“我们”或“我们的”）充分尊重您的隐私权。我们特此制定本《用户业务隐私声明》（以下简称为“本声明”）以便您了解我们如何搜集、使用、披露、保护、存储及传输您的数据。请您仔细阅读本声明。如您有任何疑问，请告知我们，联系方式详见本声明第九条。如您继续使用联合征信提供的服务，则视为同意接受本隐私声明的约束。
          <br/><br/>
          &#8195;&#8195;本声明阐述了联合征信如何处理您的信息，但本声明不涵盖所有的处理场景，本声明讨论、提及、介绍的产品或服务视您所使用的平台或所在地理位置而有不同。<span className="spanText">在使用具体产品或服务时，除本声明外，还建议您阅读有关隐私通知或补充声明。</span>
          <br/><br/>
          本声明将帮助您了解以下内容：
          <br/><br/>
          一、联合征信会如何收集和使用您的信息
          <br/><br/>
          二、联合征信会如何使用 Cookie 和同类技术
          <br/><br/>
          三、联合征信如何委托处理、共享、转让、公开披露您的信息
          <br/><br/>
          四、联合征信会如何保护您的信息
          <br/><br/>
          五、您如何管理您的信息
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Floor2Right);
