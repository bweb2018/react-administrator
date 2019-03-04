import React,{Component} from 'react'
import { Form ,Input} from 'antd'
import PropTypes from 'prop-types'
 class UpdateCategoryForm extends Component{
 static propTypes = {
   currentCategoryName:PropTypes.string.isRequired,
   setCategory:PropTypes.func.isRequired
 }

 componentWillMount(){
   const {setCategory} = this.props
  setCategory(this.props.form)
 }

  render(){
    //输入框显示当前所选的分类
    const name = this.props.currentCategoryName
    const {Item} = Form
    const{getFieldDecorator} = this.props.form
    return (
      <Form>
      <Item label="更新分类">
        {
          getFieldDecorator(
            'categoryName',
            {
              initialValue:name
            }
          )(
            <Input />
          )
        }
      </Item>
      </Form>
    )
  }
}
export default Form.create()(UpdateCategoryForm)