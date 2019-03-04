import React, {Component} from 'react';
import {Card, Input, Icon, Form, Cascader, InputNumber, Button } from 'antd';
import {getServerData} from '../../Api'

const Item = Form.Item;

 class SaveUpdate extends Component {

  state = {
    options:[]
  }
   componentWillMount(){
    this.getCategory('0')
   }
   getCategory = async (parentId) =>{
     const result = await getServerData(parentId)
      if(result.status === 0){
        if(parentId === '0'){
          this.categorys = result.data
          this.initOptionsData()
        } else {
          this.subCategorys = result.data
        }
      }
   }

  //初始化options数据
   initOptionsData = async() => {
      const {state} = this.props.location
      let options = this.categorys.map((item,index)=> ({value:item._id,label:item.name , isLeaf: false}))
      if(state && state.product.pCategoryId !== '0'){
       await this.getCategory(state.product.pCategoryId)
       const {pCategoryId} = state.product
       options.map(item => {
         if(item.value === pCategoryId){
           item.children = this.subCategorys.map(item => ({value: item._id, label: item.name}))
         }
         return item
       })
     }
      this.setState({options})
   }

     //选择分类级联选择显示
     loadData = async (selectedOptions) => {
       const targetOption = selectedOptions[selectedOptions.length - 1];
       targetOption.loading = true;
       await this.getCategory(targetOption.value)
       targetOption.loading = false
       if(this.subCategorys.length){
         targetOption.children = this.subCategorys.map(item => ({value: item._id, label: item.name}))
       } else {
         targetOption.isLeaf = true
       }

       this.setState({
             options: [...this.state.options],
           });
     }

  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    const {options} = this.state;
    const {getFieldDecorator} = this.props.form
    const {state} = this.props.location
    const product = state ? state.product : false
    let category = []
    if(product){
      if(product.pCategoryId === '0'){
        category.push(product.categoryId) //一级分类
      } else {
        category = [product.pCategoryId,product.categoryId]//二级分类
      }
    }
    return (
      <Card
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon  type='arrow-left' style={{fontSize: 25, marginRight: 10}} onClick = {()=>this.props.history.goBack()}/>
            <span>{state? '修改商品':'添加商品'}</span>
          </div>
        }
      >
        <Form>
          <Item label='商品名称' {...formItemLayout}>
            {
              getFieldDecorator(
                'name',
                {
                  initialValue:product.name
                }
              )(<Input placeholder='请输入商品名称'/>)
            }
          </Item>
          <Item label='商品描述' labelCol={{span: 2}} wrapperCol={{span: 5}}>
            {
              getFieldDecorator(
                'desc',
                {
                  initialValue:product.desc
                }
              )(<Input placeholder='请输入商品描述'/>)
            }

          </Item>
          <Item label='选择分类' {...formItemLayout} >
            {
              getFieldDecorator(
                'category',
                {
                  initialValue:category
                }
              )(<Cascader
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
                placeholder='请选择分类' options={options}/>)
            }
          </Item>
          <Item label='商品价格' {...formItemLayout}>

          <Item {...formItemLayout}>
            {
              getFieldDecorator(
                'price',
                {
                  initialValue:product.price
                }
              )(<InputNumber
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />)
            }
          </Item>
          </Item>
          <Item label='商品图片' {...formItemLayout}>
          </Item>
          <Item label='商品详情' {...formItemLayout}>
          </Item>
          <Item>
            <Button type='primary' htmlType='submit'>提交</Button>
          </Item>
        </Form>
        <Cascader
          options={this.state.options}
          loadData={this.loadData}
        />
      </Card>
    )
  }
}

export default Form.create()(SaveUpdate)