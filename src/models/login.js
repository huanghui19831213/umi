
// import { message } from 'antd';
// import { routerRedux } from 'dva/router';
export default {
  namespace: 'token',
  state: {
    data:''
  },
  reducers: {
    saveToken(state,data) {
      state.data=data.data
      return state
    }
  },
  effects: {
    *setToken({ data }, { call, put }) {
      yield put({type: 'saveToken',data: data});
        // if(data.username==='admin'){
        //   yield put({type: 'getToken',data: '111222'});
        //   yield put(routerRedux.push('/'))
        // }else{
        //   message.error('请输入正确的用户名和密码');
        // }
    }
  },
  subscriptions: {
    // setup: ({ dispatch, history }) => {
    //   console.log(history,11111)
    //   return history.listen(({ pathname, search }) => {
    //   });
    // }
  },
}
