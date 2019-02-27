

//用来axios的二次封装，能让我们更好用

import axios from 'axios'

const ajax = (url,data={},mothod='GET')=> {

  const result = new Promise((resolve,reject)=>{
  let message = null
  if(mothod === 'GET'){

    message = axios.get(url,{params:data})

  } else if(mothod === 'POST'){
    message = axios.post(url,data)
  }

    message
      .then((res)=>resolve(res.data)
      )
      .cache((err)=>{
        console.log(err)
        reject('请求失败')
  })

  })

}
