import styles from './index.scss';
import { Form, Icon, Input, Button, Row, Col  } from 'antd';
import OImg from '@/assets/image/tree.png';

import { Component } from 'react';
import { connect } from 'dva';
// import request from '@/utils/request';


@connect(({login,loading}) => ({
  login:login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:''
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, arr) => {
      if (!err) {
        // request('/api/web/rest/UserRest/login', {
        //   method: 'POST',
        //   data: values
        // })
        // this.setState({
        //   username:values.username,
        //   password:values.password
        // })
        this.props.dispatch({
          type: 'login/login',
          data: arr
       })
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    return(
      <div className={styles.contentBg}>
        <img src={OImg} alt=""/>
        <span className={styles.title}>token:{this.props.token}</span>
        <div>
          <h6>用户登录</h6>
          <Form  labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}  onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="Username" >
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
            </Form.Item>
            
            <Form.Item label="Password" >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
          
            <Row>
              <Col span={7}></Col>
              <Col span={12}>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                
                <Button className='ml20' onClick={this.handleReset}>
                  重置
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}
const LoginForm = Form.create({ name: 'loginForm' })(Login);


const mapStateToProps =(state) => {
  return {
    token:state.login.token
  }
}
export default connect(mapStateToProps)(LoginForm)


