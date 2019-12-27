
import request from '@/utils/request';

import { Component } from 'react';
class List extends Component{
  componentDidMount(){
    this.getList()
  };
  getList(){
    request('/api/bus/product/list', {method: 'GET'}).then((e)=>{
      
    })
  };
  render(){
    return (
      <div>list</div>
    );
  }
}
export default List