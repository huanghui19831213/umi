import styles from './index.scss';
import { Form, Icon, Input, Button, Row, Col  } from 'antd';
// import OImg from '@/assets/image/tree.png';

import { Component } from 'react';
import { connect } from 'dva';
import request from '@/utils/request';
import router from 'umi/router'

@connect(({token,loading}) => ({
  token:token,
  loading
}))
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      img:'',
      uuid:''
    };
  };
  componentDidMount() {
    this.getCaptchaImage()
  };
  getCaptchaImage (){
    request('/api/captchaImage', {method: 'GET'}).then(e=>{
      if(e.code===200){
        this.setState({
          img:"data:image/gif;base64,"+ e.img,
          uuid:e.uuid
        })
      }
    })
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, arr) => {
      if (!err) {
        console.log(arr)
        request('/api/login', {
          method: 'POST',
          requestType:'form',
          data: {...arr,uuid:this.state.uuid}
        }).then((e)=>{
          if(e.code===500){
            this.getCaptchaImage()
          }else if(e.code===200){
              this.props.dispatch({
                  type: 'token/setToken',
                  data: e.token
              })
              router.push('/')
          }
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
        {/* <img src={OImg} alt="" className={styles.bg} /> */}
        <div>
          <h6>用户登录</h6>
          <Form  labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}  onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="用户名" >
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="username"
                  />,
                )}
            </Form.Item>
            
            <Form.Item label="密码" >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="password"
                />,
              )}
            </Form.Item>

            <Form.Item label="验证码" >
              <div className={styles.flex}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: 'Please input your Code!' }],
              })(
                <Input placeholder="Code" className={styles.code}/>
              )}
              <img src={ this.state.img } alt="" className={styles.oImg}  onClick={()=>{this.getCaptchaImage()}}/>
              </div>
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
    token:state.token.data
  }
}
export default connect(mapStateToProps)(LoginForm)


