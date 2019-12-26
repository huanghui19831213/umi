import styles from './index.scss';
import { Component } from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {
  Form,
  Input,
  Icon,
  Button,
  Upload
} from 'antd';

const { TextArea } = Input;

class Product extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value)
      }
    });
  };
  state = {
    editorState: null
  }
  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    // const result = await saveEditorContent(htmlContent)
    console.log(htmlContent)
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }
  render(){
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.productform}>
        <Form  onSubmit={this.handleSubmit}>
          <Form.Item label="商品名称">
            {getFieldDecorator('productName', {
              rules: [
                {
                  required: true,
                  message: '请输入商品名称!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <div className={styles.flex}>
            <Form.Item label="商品型号" >
            {getFieldDecorator('productType', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品型号!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            
            <Form.Item label="商品库存" >
            {getFieldDecorator('amount', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品库存!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </div>
          <div className={styles.flex}>
            <Form.Item label="商品价格" >
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品价格!',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item></Form.Item>
          </div>
          <Form.Item label="商品描述" >
            {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品描述!',
                  },
                ],
              })(<TextArea rows={6} />)}
          </Form.Item>
          <Form.Item label="商品图片" >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
            >
              <div>
                <Icon type="plus" />
              </div>
              {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
            </Upload>
          </Form.Item>
          
          <Form.Item label="详细信息" >
             {getFieldDecorator('detail', {
                rules: [
                  {
                    required: true,
                    message: '请输入详细信息!',
                  },
                ],
              })(<BraftEditor 
                value={this.state.editorState}
                onChange={()=>this.handleEditorChange()}
                onSave={this.submitContent}/>)}
              
          </Form.Item>
          <div className={styles.mt62}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button className={styles.ml20} >
                重置
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}
const ProductForm = Form.create({ name: 'product' })(Product);
export default ProductForm