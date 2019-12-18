
import { Component } from 'react';
import { connect } from 'dva';
import request from '@/utils/request';

@connect(({loading}) => ({
}))
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      img:'',
      uuid:''
    };
  };
  componentDidMount() {
    this.getList();
  };
  getList(){
    request('/api/bus/product/list', {method: 'GET'}).then(e=>{
      if(e.code===200){
      }
    })
  };
  render() {
    return(
      <div>1111</div>
    )
  }
}


const mapStateToProps =(state) => {
  return {
    state
  }
}
export default connect(mapStateToProps)(List)


