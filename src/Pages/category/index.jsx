import React,{Component} from 'react'
import {Card ,Row ,Col,Button,Table,Pagination} from 'antd'
import './index.less'
export default class Category extends Component{

  render(){
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '操作',
      className: 'column-money',
      width:300,
      render:()=>{
        return <div>
                  <a href="javascript:void (0)">修改名称</a>&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href="javascript:void (0)">查看子品类</a>
                </div>
      }}];
    const data = [{
      key: '1',
      name: 'a',
    }, {
      key: '2',
      name: 'b',
    }, {
      key: '3',
      name: 'c',
    },{
      key: '4',
      name: 'd',
    },{
      key: '5',
      name: 'e',
    },{
      key: '6',
      name: 'f',
    },{
      key: '7',
      name: 'g',
    },{
      key: '8',
      name: 'h',
    },{
      key: '9',
      name: 'j',
    }

    ];
    const {} = Table
    return (
      <div className="content">
      <Card className="content-car"
        title="品类管理"
        extra={<Button type="primary">添加品类</Button>}
      >
        <Table
          columns={columns}
          dataSource={data}

          pagination={{pageSize:3,showSizeChanger:false,
            pageSizeOptions:[3,6,9,12],showQuickJumper:true,

          }}
        />,

      </Card>
      </div>
    )
  }

}