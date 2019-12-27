
import request from '@/utils/request';
import {formatterTime} from '@/utils/index';
import { Component } from 'react';
import { Table,Button } from 'antd';

import router from 'umi/router'
const { Column } = Table;
class List extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      pagination:{
        pageNum:1,
        pageSize:2,
        total:0
      }
    };
  };
  componentDidMount(){
    this.getList()
  };
  getList(){
    let state=this.state
    request('/api/bus/product/list', {method: 'GET',params:state.pagination}).then((e)=>{
      this.setState({'list':e.rows,'pagination':{...state.pagination,total:e.total}})
    })
  };
  handleTableChange(e){
    this.setState({pagination:{...this.state.pagination,pageNum:e.current}},()=>{
      this.getList()
    })
  }
  handlerModfied(e){
    router.push('/editor/'+e.productId+'/1')

  };e
  handlerRemove(e){
    request('/api/bus/product/'+e.productId, {method: 'DELETE'}).then((data)=>{
      if(data.code===200){
        this.getList();
      }
    })
  };
  render(){
    return (
      <div>
        <Table dataSource={this.state.list} rowKey={record=>record.productId} 
        pagination={this.state.pagination} 
        onChange={(e)=>this.handleTableChange(e)}>
          <Column title="商品名称" dataIndex="productName" key="productName" />
          <Column title="商品型号" dataIndex="productType" key="productType" />
          <Column title="商品价格" dataIndex="price" key="price" />
          <Column title="商品库存" dataIndex="amount" key="amount" />
          <Column title="创建时间" dataIndex="createTime" key="createTime" render={tags => (
            <span>
              {formatterTime(tags)}
            </span>
          )}/>
          <Column title='操作'  render={(text, record) => (
              <div>
                <Button type="primary" onClick={()=>this.handlerModfied(record)}>修改</Button>
                <Button onClick={()=>this.handlerRemove(record)}>删除</Button>
              </div>
            )}></Column>
        </Table>
      </div>
    );
  }
}
export default List