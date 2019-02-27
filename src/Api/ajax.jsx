

//用来axios的二次封装，能让我们更好用

import axios from 'axios'

export default function ajax (url,data={},method='GET'){
  return  new Promise((resolve,reject)=>{
  let promise = null

  if(method === 'GET'){
console.log(data)
    promise = axios.get(url,{params:data})

  } else if(method === 'POST'){
    promise = axios.post(url,data)
  }


    promise
      .then((res)=>{return resolve(res.data)
        console.log(res)}

      )
      .catch((err)=>{
        console.log(err)
        reject('请求失败')
  })

  })


}
