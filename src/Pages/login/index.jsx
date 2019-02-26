import React,{Component} from 'react'
import logo from '../../assets/images/logo.png'
import './index.less'
import {
  Form,
  Icon,
  Input,
  Button,
} from 'antd';
const Item = Form.Item
export default class Login extends Component{

  render(){
    
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-form">
            <h2>用户登陆</h2>
          <form action="" className="form">
            <Item>
            <Input prefix={<Icon type="user" />} placeholder="Username" />
            </Item>
            <Item>
            <Input prefix={<Icon type="lock" />} placeholder="Password"/>
            </Item>
            <Item>
            <Button type="primary" htmlType="submit">登录</Button>
            </Item>
          </form>

        </section>
      </div>
    )
    const WrappedNormalLoginForm = Form.create({ name: 'username' })(Login)
  }
  
}