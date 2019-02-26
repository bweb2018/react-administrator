import React,{Component} from 'react'

import {BrowserRouter ,Route,Switch} from 'react-router-dom'
import Login from './Pages/login/Login'
import Admin from './Pages/administrator/Admin'
export default class App extends Component{

  render(){

    return (
      <BrowserRouter>
        <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Admin}/>
        </Switch>
      </BrowserRouter>
    )

}
}