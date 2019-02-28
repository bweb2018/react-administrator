import React,{Component} from 'react'

import {Route,Switch,Redirect} from 'react-router-dom'
import {Row,Col,} from 'antd';


import LeftNav from '../../Components/left-nav'
import Header from '../../Components/header'
import Footer from '../../Components/footer'
import Home from '../home'
import Product from '../product'
import Category from '../category'
import MemoryTool from '../../tools/memorytool'
import User from '../user'
import Role from '../role'
import Bar from '../bar'
import Line from '../line'
import Pie from '../pie'
import './index.less'



export default class Admin extends Component{


  render(){
  const user = MemoryTool.user
    if(!user || !user._id){
      return <Redirect to="/login"/>
    }
    return (
        <Row>
          <Col span={4}>
            <LeftNav />
          </Col>
          <Col span={20}>
            <Header />
            <div className="right-content">
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/user' component={User}/>
                <Route path='/role' component={Role}/>
                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={Line}/>
                <Route path='/charts/pie' component={Pie}/>
              </Switch>
            </div>
            <Footer />
          </Col>
        </Row>
    )
  }
}
