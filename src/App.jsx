import React,{Component} from 'react'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Login from './Pages/login/index'
import Admin from './Pages/administrator/Admin'
import './assets/less/index.less'

export default class App extends Component{

  render(){

    return (
      <Router>
        <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Admin}/>
        </Switch>
      </Router>
    )

}
}