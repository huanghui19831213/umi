import styles from './index.scss';
import { Component } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import request from '@/utils/request';
import {
  Form,
  Input,
  Icon,
  Button,
  Upload,
  message 
} from 'antd';

const { TextArea } = Input;

class Product extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        let data = {...value,'detail':value.detail.toHTML()};
        request('/bus/product', {
          method: 'POST',
          requestType:'form',
          data: data
        }).then((e)=>{
          
        })
        
      }
    });
  };
  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传JPG或PNG格式的图片');
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('上传的图片不能大于4M');
    }
    return isJpgOrPng && isLt4M;
  };
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
              beforeUpload={this.beforeUpload}
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
              })(<BraftEditor />)}
              
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