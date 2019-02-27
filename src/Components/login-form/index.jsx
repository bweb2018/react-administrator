import React,{Component} from 'react'

import {
  Form,
  Icon,
  Input,
  Button,
  message,
} from 'antd';
const Item = Form.Item

class LoginForm extends Component{


  handleSubmit = (e) =>{
    e.preventDefault()
   this.props.form.validateFields((err,values)=>{
console.log(err,values)
     if(!err){
       console.log(values)
     } else {
       message.config({
         duration: 0.5,
         top:435

       })
       console.log(Object.values(err));3
      const errMsg =  Object.values(err).reduce((prev,curr)=>{
        return prev + curr.errors[0].message+''
       },'')
       message.error(errMsg);
       this.props.form.resetFields(['password'])



     }
   })
  }
  render() {
const {getFieldDecorator,getFieldValue,validateFirst,resetFields} = this.props.form

  return (
    <form className="form" onSubmit={this.handleSubmit}>
      <Item>
        {getFieldDecorator('userName', {
        rules: [

        { required: true, message: '用户名不能为空'},
        {min:4 ,message:'输入的内容不能小于4位'},
        {max:11 ,message:'输入的内容不能大于11位'},
        {pattern:/^[a-zA-Z0-9_]+$/, message:'用户名必须是大小写字母数字和下划线'},

        ]},{validateFirst:false})(
          <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
          )}
      </Item>
      <Item>
        {getFieldDecorator('password',{
          rules:[
            {required:true,message:'密码输入不能为空'},
            {min:6,message:'输入的位数不能低于6位'},
            {max:18,message:'输入的位数不能大于18位'},
            {pattern:/^[a-zA-Z0-9_]+$/, message:'密码必须是大小写字母数字和下划线'},

          ]
        })(<Input prefix={<Icon type="lock"/>} type='password' placeholder="请输入密码"/>)}

      </Item>
      <Item>
        <Button type="primary" htmlType="submit" onClick={this.handlerSubmit}>登录</Button>
      </Item>
    </form>
  )
}


}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default WrappedNormalLoginForm