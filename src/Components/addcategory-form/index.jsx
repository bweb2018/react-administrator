import React,{Component} from 'react'
import {Select  , Form ,Input} from 'antd'
import PropTypes from 'prop-types'

class AddCategoryForm extends Component{
  static propTypes = {
    oneCategoryData:PropTypes.array.isRequired,
    setCategory:PropTypes.func.isRequired
  }

  componentWillMount(){
    const {setCategory} = this.props
    setCategory(this.props.form)
  }


  render(){
    const {oneCategoryData,showName} = this.props
    const show = showName ? showName : '0'
    console.log(showName)
    const {Item} = Form
    const{getFieldDecorator} = this.props.form
    const { Option } = Select;
    return (
      <Form>
        <Item label="所属分类">
          {
            getFieldDecorator(
              'parentId',
              {initialValue:show }
            )(
              <Select >
                <Option key='0' value="0">一级分类</Option>
                {oneCategoryData.map(item => <Option key={item._id}>{item.name}</Option>)}

              </Select>)
          }
        </Item>
        <Item label="分类名称">
          {
            getFieldDecorator(
              'categoryName',
              {}
            )(
              <Input placeholder="请输入分类名称" />
            )
          }
        </Item>
      </Form>
    )
  }

}
export default Form.create()(AddCategoryForm)