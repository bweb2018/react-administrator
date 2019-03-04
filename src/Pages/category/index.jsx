import React,{Component} from 'react'
import {Modal,Card ,Button,Table, message,Form,Icon} from 'antd'
import './index.less'
import {getServerData,reqAddCategory,updateCategoryForm} from '../../Api'
import AddCategoryForm from '../../Components/addcategory-form'
import UpdateCategoryForm from '../../Components/update-category-form'
class Category extends Component{

  state = {
    oneCategoryData:[] ,//初始化显示后台数据
    twoCategoryData:[],  //二级后台显示数据
    visible:false , //初始添加分类对话框
    updateShow:false,
    category:{},
    showDefaultState:'0',
    isTwoLoadingIcon:true
  }
  componentWillMount(){
    this.columns = [[{
      title: '分类名称',
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
          <a href="javascript:void (0)" onClick={ ()=>{
            this.setState({showDefaultState:category._id,category})
            this.handlerSerData(category._id)
          }}>查看子品类</a>
        </div>
      }
    }],[{
      title: '分类名称',
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
          {/*<a href="javascript:void (0)" onClick={()=> this.showOneCategory(category)*/}
          {/*}>查看子品类</a>*/}
        </div>
      }
    }]];
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

    const {getFieldsValue ,resetFields} = this.form
    const {parentId,categoryName} = getFieldsValue()
    const updateCategory = {visible:false}
    if(parentId && categoryName){
      //  如何获取用户输入内容成功向后台发送数据并添加
      const result = await reqAddCategory(parentId,categoryName)

      if(result.status === 0){
        //  添加用户成功再把数据写入到本地
        if(parentId === '0'){
          message.success('添加成功')
            updateCategory.oneCategoryData=[...this.state.oneCategoryData ,result.data]
          resetFields()
        } else {


          updateCategory.twoCategoryData = [...this.state.twoCategoryData,result.data]


        }
      } else {
        message.error('添加失败')
        resetFields()
      }
    } else {
      message.warn('输入内容不能为空')
      console.log('获取用户输入内容为空')
    }
    resetFields()
    this.setState(updateCategory)
  }

  //请求后台数据
  handlerSerData = async(parentId)=>{
    const{twoCategoryData} = this.state
    const result = await getServerData(parentId)
    if(result.status === 0){
      if(parentId === '0'){
        this.setState({oneCategoryData:result.data})//请求一级分类数据
      } else {
        if (result.data.length) {
          this.setState({
            twoCategoryData: result.data,
            isTwoLoadingIcon: true
          })//请求二级分类数据
        } else {
          //防止之前有数据对loading有影响
          this.setState({
            twoCategoryData,
            isTwoLoadingIcon: false
          })
        }
      }
    } else {
      console.log('数据请求失败')
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
    // const Option = Select.Option
    const {oneCategoryData,visible,updateShow,category,twoCategoryData,showDefaultState} = this.state
    const isDataShow = showDefaultState === '0'
    const showData = isDataShow ? oneCategoryData:twoCategoryData
    // const isLoadingShow = isDataShow ? oneCategoryData.length === 0 : isTwoLoadingIcon &&twoCategoryData.length === 0
    const showName = category.name
    return (
      <div className="content">
        <Card className="content-car"
              title={
                showDefaultState === '0' ? <Button type="default" onClick={()=>this.setState({showDefaultState:'0'})}>一级分类列表 </Button>:
                  <Button type="default" onClick={()=>this.setState({showDefaultState:'0'})}>一级分类<Icon type="arrow-right"/>{showName}</Button>
              }

              extra={<Button type="primary" onClick={this.addCategory}>添加品类</Button>}
        >
          <Table rowKey="_id"
                 columns={showDefaultState === '0'? this.columns[0]:this.columns[1]}
                 dataSource={showData}
                 pagination={
                   {
                     pageSize:3,
                     showSizeChanger:true,
                     showQuickJumper:true,
                     pageSizeOptions:['3','6','9','12'],

                   }}
                 loading={false}
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
            <AddCategoryForm oneCategoryData={oneCategoryData} showName= {showName} setCategory={form => this.form = form}/>
          </Modal>
        </Card>
      </div>
    )
  }
}
export default Form.create()(Category)