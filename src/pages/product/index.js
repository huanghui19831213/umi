import styles from './index.scss';
import { Component } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import request from '@/utils/request';
import router from 'umi/router'
import { connect } from 'dva';
import {
  Form,
  Input,
  Icon,
  Button,
  Upload,
  message 
} from 'antd';

const { TextArea } = Input;
const editorProps = {
  height: 350,
  contentFormat: 'html',
  // initialContent: line ? line.introduction : '',
  // onChange: this.handleChangeEditor,
  // onRawChange: this.handleRawChange,
  media: {
    allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
    image: true, // 开启图片插入功能
    video: true, // 开启视频插入功能
    audio: true, // 开启音频插入功能
    validateFn: null, // 指定本地校验函数，说明见下文
    // uploadFn: uploadFn, // 指定上传函数，说明见下文
    removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
    onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
    onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
    onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
  },
}
class Product extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      files:[],
      data:{},
      status:'see',
      methodType:'POST',

    };
  };
  componentDidMount(){
    if(this.props.match.params.id){
      this.getInfo()
    }
    if(this.props.match.params.id&&Number(this.props.match.params.editor)===1){
      //修改
      this.setState({status:'editor',methodType:'PUT'})
    }else if(this.props.match.params.id&&Number(this.props.match.params.editor)!==1){
      //查看
      this.setState({status:'see'})
    }else{
      //新增
      this.setState({status:'add',methodType:'POST'})
    }
  };
  getInfo(){
    request('/api/bus/product/'+this.props.match.params.id).then((e)=>{
      if(e.code===200){
        this.setState({...e.data,detail:BraftEditor.createEditorState(e.data.detail),files:e.data.productImg?[{url:e.data.productImg,uid:e.data.productImg}]:[]},()=>{
        })
      }
    })
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      // 批量上传
      if (!err) {
        let files='';
        this.state.files.map((e)=>{
          files=files+','+e.url
        })
        let data = {...value,detail:value.detail.toHTML(),files:files.substring(1,files.length),productId:this.props.match.params.id||''};
        request('/api/bus/product', {
          method: this.state.methodType,
          requestType:'form',
          data: data
        }).then((e)=>{
          router.push('/')
        })
        
      }
    });
  };
  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传JPG或PNG格式的图片');
      return isJpgOrPng ;
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('上传的图片不能大于4M');
      return isLt4M;
    }
  };
  
  handleReset = () => {
    console.log(this.props.form)
    this.props.form.resetFields();
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    let state = this.state;
    const uploadParms = {
      multiple:true,
      customRequest: info => {
        const formData = new FormData();
        formData.append('file', info.file);
        request('/api/common/upload',{
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }).then(e=>{  
            let data={
              url:e.url,
              uid: e.fileName
            }
            this.setState({
              files:[...this.state.files,data]
            })
          })
      },
      listType:"picture-card",
      beforeUpload:this.beforeUpload
    };
    
    return (
      <div className={styles.productform}>
        <Form  onSubmit={this.handleSubmit}>
          <Form.Item label="商品名称">
            {getFieldDecorator('productName', {
              initialValue:state.productName||'',
              rules: [
                {
                  required: true,
                  message: '请输入商品名称!',
                },
              ],
            })(<Input/>)}
          </Form.Item>
          <div className={styles.flex}>
            <Form.Item label="商品型号" >
            {getFieldDecorator('productType', {
                initialValue:state.productType||'',
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
                initialValue:state.amount||'',
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
                initialValue:state.price||'',
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
                initialValue:state.description||'',
                rules: [
                  {
                    required: true,
                    message: '请输入商品描述!',
                  },
                ],
              })(<TextArea rows={6} />)}
          </Form.Item>
          <Form.Item label="商品图片" >
                <Upload {...uploadParms} 
                  fileList={state.files}>
                  {state.files.length >= 1 ? null : 
                  (<div>
                    <Icon type="plus" />
                  </div>)
                  }
                </Upload>
          </Form.Item>
          
          <Form.Item label="详细信息" >
             {getFieldDecorator('detail', {
                initialValue:state.detail,
                rules: [
                  {
                    required: true,
                    message: '请输入详细信息!',
                  },
                ],
              })(<BraftEditor  {...editorProps}/>)}
              
          </Form.Item>
          <div className={styles.mt62}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button className={styles.ml20} onClick={this.handleReset} >
                重置
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps =(state) => {
  return {
    token:state.token.data
  }
}
const ProductForm = Form.create({ name: 'product' })(Product);
export default connect(mapStateToProps)(ProductForm)