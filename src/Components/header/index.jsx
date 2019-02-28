import React,{Component} from 'react'
import dayjs from 'dayjs'
import './index.less'
import {Row,Col,Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import MemoryTool from '../../tools/memorytool'
import {remItem} from '../../tools/localstroetool'
import menuList  from '../../config/menuconfig'
import {getJsonp } from '../../Api'
 class Header extends Component{

state = {

  getDate:dayjs().format('YYYY-MM-DD-HH:mm:ss'), //初始化时间
  dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png', //初始化天气
  weather: '晴11'
}

componentWillMount(){

 }
componentDidMount(){

 this.showDate()
  this.showWeather()
}



componentWillUnmount(){
    clearInterval(this.times)
}

//显示天气
  showWeather = ()=>{

   getJsonp('北京').then((res)=>{
console.log(res.dayPictureUrl)
      this.setState({
        dayPictureUrl: res.dayPictureUrl, //初始化天气
        weather: res.weather
      })
   })
     .catch(()=>{})


  }

//显示时间
  showDate = ()=>{
    this.times = setInterval(()=>{
      this.setState({
        getDate:dayjs().format('YYYY-MM-DD-HH:mm:ss')
      })
    },1000)
  }

//  用户退出页面功能
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

  //菜单标题自动显示
  showMenu = (menu)=>{
    const pathName = this.props.location.pathname
    for (let i = 0; i < menu.length; i++) {

      if(menu[i].children){
        const title = this.showMenu(menu[i].children)
        if(title){
          return title
        }
      }else {
       if(menu[i].key === pathName){
       return  menu[i].title
       }
      }
    }
  }

  render(){
    const result = this.showMenu(menuList)
    const {username} = MemoryTool.user
    const {getDate,dayPictureUrl,weather} = this.state
    return (
      <div className="right-header">
        <Row className="header-top">
          <span>欢迎{username}</span>
          <a href="javascript:void (0)" onClick={this.outReq}>退出</a>
        </Row>
        <Row  className="header-bottom">
          <Col span={6} className="header-bottom-left"><p>{result}</p></Col>
          <Col span={18} className="header-bottom-right">
            {getDate}
            <img src={dayPictureUrl}></img>{weather}
          </Col>
        </Row>
      </div>
    )
  }

}

export default withRouter(Header)