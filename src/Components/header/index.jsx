import React,{Component} from 'react'

import './index.less'
import {Row,Col,Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import MemoryTool from '../../tools/memorytool'
import {remItem} from '../../tools/localstroetool'
import menuList  from '../../config/menuconfig'
 class Header extends Component{

outReq = ()=>{
  const confirm = Modal.confirm
  confirm({
    title: '您确定要退出登录?',
    okText:'确定',
    cancelText: '取消',

    onOk: ()=> {
      remItem()
      MemoryTool.user = {}
      this.props.history.replace('/login')
      console.log('OK');

    },
  });

}

  render(){
    const {username} = MemoryTool.user
    return (
      <div className="right-header">
        <Row className="header-top">
          <span>欢迎{username}</span>
          <a href="javascript:void (0)" onClick={this.outReq}>退出</a>
        </Row>
        <Row  className="header-bottom">
          <Col span={6} className="header-bottom-left"><p>首页</p></Col>
          <Col span={18} className="header-bottom-right"><p>首页</p></Col>
        </Row>
      </div>
    )
  }

}

export default withRouter(Header)