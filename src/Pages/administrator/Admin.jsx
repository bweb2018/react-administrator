import React,{Component} from 'react'

import {Route,Switch,Redirect} from 'react-router-dom'
import {Layout} from 'antd';


import LeftNav from '../../Components/left-nav'
import Header from '../../Components/header'
import Home from '../home'
import Product from '../product/product'
import Category from '../category'
import MemoryTool from '../../tools/memorytool'
import User from '../user'
import Role from '../role'
import Bar from '../bar'
import Line from '../line'
import Pie from '../pie'




export default class Admin extends Component{


  render(){
    const { Content, Footer, Sider} = Layout;
  const user = MemoryTool.user
    if(!user || !user._id){
      return <Redirect to="/login"/>
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header />
              <Content style={{margin:'20px'}}>
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/user' component={User}/>
                <Route path='/role' component={Role}/>
                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={Line}/>
                <Route path='/charts/pie' component={Pie}/>
                <Redirect to='/home'/>
              </Switch>
              </Content>
            <Footer />
          </Layout>
        </Layout>
    )
  }
}
