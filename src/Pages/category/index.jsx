import React,{Component} from 'react'
import {Modal,Card ,Row ,Col,Button,Table,Pagination,Select , message,Form} from 'antd'
import './index.less'
import {getServerData,reqAddCategory,updateCategoryForm} from '../../Api'
import AddCategoryForm from '../../Components/addcategory-form'
import UpdateCategoryForm from '../../Components/update-category-form'
 class Category extends Component{

  state = {

    serverData:[] ,//初始化显示后台数据
    visible:false , //初始添加分类对话框
    updateShow:false,
    category:{}
  }

componentWillMount(){
  this.columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript:void(0)">{text}</a>,
  }, {
    title: '操作',
    width:300,
    render:(category)=>{
      return <div>
        <a href="javascript:void (0)"
           onClick={()=>{this.setState({category,updateShow:true})
           }}>修改名称</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:void (0)">查看子品类</a>
      </div>
    }}];
}

  componentDidMount(){
  //请求后台数据
    this.handlerSerData('0')
  }
  //点击按钮添加品类
  addCategory = ()=>{

    this.setState({
      visible:true,
    })
  }

  //添加品类确认按钮
  submitCategory = async()=>{
    const {getFieldsValue} = this.form

    const {parentId,categoryName} = getFieldsValue()

    if(parentId && categoryName){
    //  如何获取用户输入内容成功向后台发送数据并添加
      const result = await reqAddCategory(parentId,categoryName)

      if(result.status === 0){
      //  添加用户成功再把数据写入到本地
        console.log(result)
        this.setState({
          serverData:[...this.state.serverData ,result.data],
          visible:false
        })
        message.success('添加成功')
      } else {
        message.error('添加失败')
        // resetFields()
      }
    } else {
      message.warn('输入内容不能为空')
      console.log('获取用户输入内容为空')
    }
  }

  //请求后台数据
  handlerSerData = async(parentId)=>{

    const result = await getServerData(parentId)
    if(result.status === 0){
      this.setState({
         serverData:result.data
      })
    } else {
      console.log('数据请求成功')
    }

  }

  //更新分类
   submitUpdateCategory = async()=>{
     const userInputInfo = this.form.getFieldsValue().categoryName
     console.log(userInputInfo)
     const {name,_id} = this.state.category
     console.log(typeof userInputInfo)
     console.log(typeof name)
     if(userInputInfo === name){

      message.warn('输入的分类已存在，请重新输入')
     } else {
       const result = await updateCategoryForm(_id,userInputInfo)
       if(result.status === 0){
         this.setState({
           updateShow:false,
           serverData:this.state.serverData.map((item)=> {
             if(item._id === _id){
               item.name= userInputInfo
              return item
             } else {return item} })
         })
       } else {
         this.setState({
           updateShow:false
         })
       }
     }
   }


  render(){
    const Option = Select.Option
    const {serverData,visible,updateShow,category} = this.state
    return (
      <div className="content">
      <Card className="content-car"
        title="品类管理"
        extra={<Button type="primary" onClick={this.addCategory}>添加品类</Button>}
      >
        <Table rowKey="_id"
          columns={this.columns}
          dataSource={serverData}
          pagination={{pageSize:3,showSizeChanger:true}}
        />,
        <Modal
          title="更新分类"
          visible={updateShow}
          okText="确定"
          cancelText="取消"
          onOk={this.submitUpdateCategory}
          onCancel={()=>this.setState({updateShow:false})}
        >
          <UpdateCategoryForm setCategory={form => this.form = form} currentCategoryName={category.name}/>
        </Modal>
        <Modal
          title="添加品类"
          visible={visible}
          okText="确定"
          cancelText="取消"
           onOk={this.submitCategory}
          onCancel={()=>this.setState({visible:false})}
        >
          <AddCategoryForm serverData={serverData} setCategory={form => this.form = form}/>
        </Modal>
      </Card>
      </div>
    )
  }
}
export default Form.create()(Category)