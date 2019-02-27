import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Menu, Icon, Button} from 'antd'
import {NavLink,withRouter} from 'react-router-dom'

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuconfig'

const SubMenu = Menu.SubMenu;
const Item = Menu.Item
 class  LeftNav extends Component{

//  初始化菜单结构
  componentWillMount(){


    this.menu = this.handlerMenu(menuList)

  }
  handlerMenu = (menuList)=> {

  return menuList.map(item=>{
    // console.log(item)
    if(item.children){
      console.log(item.children)
      return <SubMenu key= {item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
        {
          this.handlerMenu(item.children)

        }

      </SubMenu >
    }else {
      return <Item key={item.key}>
        <NavLink to={item.key}>
          <Icon type={item.icon} />
          <span>{item.title}</span>
        </NavLink>
      </Item>
    }
  })
}

  render(){
    console.log(this.menu)
  // const result = this.props.l
     const result = this.props.location.pathname
    console.log(result)
    return (
      <div className="left-nav">
        <div >
          <NavLink to='/home' className="header">
            <img src={logo} alt="logo"/>
            <p>硅谷后台</p>
          </NavLink>

        </div>
        <Menu
          mode="inline"
           theme="dark"
          selectedKeys ={[result]}
        >
          {this.menu}
        </Menu>
      </div>
    )
  }

}

export default withRouter(LeftNav)