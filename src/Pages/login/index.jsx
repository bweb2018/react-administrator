import React,{Component} from 'react'
import {
  Form,
  Icon,
  Input,
  Button,
  message,
} from 'antd';
import {Route,Switch,Redirect} from 'react-router-dom'
import LoginForm from '../../Components/login-form'
import {reqLogin} from '../../Api'

import logo from '../../assets/images/logo.png'
import './index.less'
export default class Login extends Component{

  handlerAjax = async(username,password)=>{
    // console.log(userName,passWord)
    const result = await reqLogin(username,password)

    console.log(result)
    if(result.status === 0){
    //  请求成功
   this.props.history.replace('/')

    } else {

    }
  }

  render(){
    
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-form">
            <h2>用户登陆</h2>
            <LoginForm handlerAjax={this.handlerAjax}/>
        </section>
      </div>
    )

  }
  
}