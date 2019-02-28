import React from 'react'
import ReactDOM  from 'react-dom'
import App from './App.jsx'
import {getItem} from './tools/localstroetool'
import MemoryTool from './tools/memorytool'

const user = getItem()
if(user && user._id){
  MemoryTool.user = user
}

ReactDOM.render(<App />,document.getElementById('root'))