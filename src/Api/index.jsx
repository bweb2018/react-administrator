
import ajax from './ajax'
const prefix = 'http://loaclhost:5000'

export const reqLogin = ({username,possword})=> ajax(prefix +'/login',{username,possword},'POST')
export const reqAddUser = user=> ajax(prefix +'/login',user,'POST')

