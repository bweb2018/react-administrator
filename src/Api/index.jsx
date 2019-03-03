
import ajax from './ajax'
import jsonp from 'jsonp'
const prefix = ''


export const reqLogin = (username,password)=> ajax(prefix +'/login',{username,password},'POST')
export const reqAddUser = user=> ajax(prefix +'/manage/user/update',user,'POST')
export const getJsonp = city => {return new Promise((res,rej)=>{jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
                                {},
                                (err,data)=>{if(!err){res(data.results[0].weather_data[0])} else { console.log(err) }})})}

//请求获取后台数据

export const getServerData = parentId => ajax(prefix+'/manage/category/list',{parentId})

//向后台发送数据并添加到后台
export const reqAddCategory = (parentId,categoryName) => ajax(prefix+'/manage/category/add',{parentId,categoryName},'POST')


//向后台发送数据并更新

export const updateCategoryForm = (parentId,categoryName) => ajax(prefix+'/manage/category/update',{parentId,categoryName},'POST')

//获取后台商品分页列表数据

export const reqProductLIst = (pageNum,pageSize) => ajax(prefix+'/manage/product/list',{pageNum,pageSize})