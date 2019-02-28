
import ajax from './ajax'
import jsonp from 'jsonp'
const prefix = ''


export const reqLogin = (username,password)=> ajax(prefix +'/login',{username,password},'POST')
export const reqAddUser = user=> ajax(prefix +'/manage/user/update',user,'POST')
export const getJsonp = (city)=>{

  return new Promise((res,rej)=>{

    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},(err,data)=>{
        if(!err){
          res(data.results[0].weather_data[0])
        } else {

        }
    })
  })


}

