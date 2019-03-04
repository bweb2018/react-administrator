import React,{Component} from 'react'
import {Card,Table,Button,Icon,Select,Input,message} from 'antd'
import {reqProductLIst,searchProductLIst} from '../../Api'

export default  class Index extends Component{

  state = {
    searchType:'productName',
    searchName:'',
    product:[],
    total:''
  }


  componentDidMount(){

    this.getProductData(1,3)
  }

  //获取商品列表
  getProductData = async(pageNum,pageSize)=>{
    const {searchType,searchName} = this.state
    let result
    if(searchName){
      result = await searchProductLIst({pageNum,pageSize,searchType,searchName})//点击搜索
      console.log(result)
    } else {
      result = await reqProductLIst(pageNum,pageSize)//获取商品列表
    }
    if(result.status === 0){
      message.success('数据获取成功')
        this.setState({product:result.data.list ,total:result.data.total})

    } else {
      message.error('数据获取失败')
    }
  }

  //搜索产品
  searchProduct = (name,value)=>{
    this.setState({
     [name]:value,
    })
}

  //添加产品
  addProduct = ()=>{


  }


  render(){
    const Option = Select.Option
    const {product,total} = this.state
    const columns = [{
      title: '商品名称',
      dataIndex: 'name',
    }, {
      title: '商品描述',
      dataIndex: 'desc',
    }, {
      title: '价格',
      dataIndex: 'price',
      render: text => {return '￥'+text}
    }, {
      title: '状态',
      dataIndex: 'state',
      width:200,
      render: product => {return <div><Button type='primary'>上架</Button>&nbsp;&nbsp;已下架</div>}
    }, {
      title: '操作',
      // dataIndex: 'operation',  写上就是key对应的value 不写就是对象
      width:200,
      render: (product)=> {
        return <div>
                  <Button type='primary'>详情</Button>&nbsp;&nbsp;

                  <Button type='primary' onClick={()=>this.props.history.push('/product/saveupdate',{product})}>修改</Button>
               </div>}
    }];

    return (
      <Card
        title={
          <div>
            <Select defaultValue="productName" style={{ width: 160 }} onChange ={ value =>{this.searchProduct('searchType',value) }}>
              <Option value="productName">根据商品名称</Option>
              <Option value="productDesc">根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" style={{width:150}} onChange ={ e =>{this.searchProduct('searchName',e.target.value) }}/>
            <Button type="primary" style={{marginLeft:10}} onClick={()=>this.getProductData(1,3)}>搜索</Button>
          </div>
        }
        extra={<div><Button type='primary' onClick={()=>this.props.history.push('/product/saveupdate')}><Icon type="plus"/>添加产品</Button></div>}
     >
        <Table
          columns={columns}
          dataSource={product}
          bordered
          pagination={
            {
              defaultPageSize:3,
              showSizeChanger:true,
              showQuickJumper:true,
              pageSizeOptions:['3','6','9','12'],
              total:total,
              onChange:this.getProductData,
              onShowSizeChange:this.getProductData
            }}
          rowKey='_id'
          loading = {product.length === 0}
        />
      </Card>
    )
  }

}

