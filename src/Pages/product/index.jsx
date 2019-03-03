import React,{Component} from 'react'
import {Card,Table,Button,Icon,Select,Input,message} from 'antd'

import {reqProductLIst} from '../../Api'

export default class Index extends Component{

  state = {

    product:[],
    total:''
  }


  componentDidMount(){

    this.getProductData(1,3)
  }

  //获取商品列表

  getProductData = async(pageNum,pageSize)=>{
      const result = await reqProductLIst(pageNum,pageSize)
    const {product,total} = this.state
    if(result.status === 0){
      message.success('数据获取成功')
        this.setState({product:result.data.list ,total:result.data.total})
    } else {
      message.error('数据获取失败')
    }
  }

  //搜索产品
  searchProduct = ()=>{


  }

  render(){
    const Option = Select.Option
    const Search = Input.Search
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
      render: category => {return <div><Button type='primary'>上架</Button>&nbsp;&nbsp;已下架</div>}
    }, {
      title: '操作',
      dataIndex: 'operation',
      width:200,
      render: category => {
        return <div><Button type='primary'>详情</Button>&nbsp;&nbsp;
                  <Button type='primary'>修改</Button>
               </div>}
    }];

    return (
      <Card
        title={
          <div>
            <Select defaultValue="lucy" style={{ width: 160 }} >
              <Option value="jack">根据商品名称</Option>
              <Option value="lucy">根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" style={{width:150}}/>
            <Button type="primary" style={{marginLeft:10}} onClick={this.searchProduct}>搜索</Button>
          </div>
        }
        extra={<div><Button type='primary'><Icon type="plus"/>添加产品</Button></div>}
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
          loading = {product.length === 0}
        />
      </Card>
    )
  }

}