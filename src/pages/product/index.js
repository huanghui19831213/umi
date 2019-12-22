import styles from './index.scss';
import { Component } from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
  Upload
} from 'antd';

const { TextArea } = Input;

class Product extends Component {
  render(){
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.productform}>
        <Form  onSubmit={this.handleSubmit}>
          <Form.Item label="商品名称">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <div className={styles.flex}>
            <Form.Item label="商品型号" >
              <Input />
            </Form.Item>
            
            <Form.Item label="库存商品" >
              <Input onBlur={this.handleConfirmBlur} />
            </Form.Item>
          </div>
          <div className={styles.flex}>
            <Form.Item label="市场价格" >
              <Input />
            </Form.Item>
            
            <Form.Item label="商品价格" >
              <Input onBlur={this.handleConfirmBlur} />
            </Form.Item>
          </div>
          <Form.Item label="商品介绍" >
            <TextArea rows={6} onBlur={this.handleConfirmBlur} />
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
              <BraftEditor/>
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