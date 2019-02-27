
import ajax from './ajax'

const prefix = ''

export const reqLogin = (username,password)=> ajax(prefix +'/login',{username,password},'POST')
export const reqAddUser = user=> ajax(prefix +'/manage/user/update',user,'POST')

