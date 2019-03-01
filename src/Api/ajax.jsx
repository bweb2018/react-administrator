

//用来axios的二次封装，能让我们更好用
import axios from 'axios'

export default function ajax (url,data={},method='GET'){
  return  new Promise((resolve,reject)=>{
  let promise = null
  if(method === 'GET'){
    promise = axios.get(url,{params:data})
  } else if(method === 'POST'){
    promise = axios.post(url,data)
  }

    promise
      .then((res)=>{
     // console.log(res.data)
    return resolve(res.data)

  }
      )
      .catch((err)=>{
        console.log(err)
      return  reject('请求失败')
  })
  })
}
