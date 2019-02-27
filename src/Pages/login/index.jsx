import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {reqLogin} from '../../App'
import LoginForm from '../../Components/login-form'
import logo from '../../assets/images/logo.png'
import './index.less'
export default class Login extends Component{

  handlerAjax = (username,possword)=>{

    reqLogin({username,possword})

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