import React,{Component} from 'react'

import LoginForm from '../../Components/login-form'
import {reqLogin} from '../../Api'

import logo from '../../assets/images/logo.png'
import './index.less'
export default class Login extends Component{
state = {

  msgErr:''
}
  handlerAjax = async(username,password)=>{
    // console.log(userName,passWord)
    const result = await reqLogin(username,password)

    console.log(result)
    if(result.status === 0){
    //  请求通过进行跳转到主页面
   this.props.history.replace('/')

    } else if(result.status === 1){
    //
      this.setState({
        msgErr:result.msg
      })
    }
  }

  render(){
    const {msgErr} = this.state
    const height = '30px'
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-form">
          <div className="login-err" style={{height}}>{msgErr}</div>
            <h2>用户登陆</h2>
            <LoginForm handlerAjax={this.handlerAjax}/>
        </section>
      </div>
    )

  }
  
}