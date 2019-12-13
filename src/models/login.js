
import { message } from 'antd';
// import createHistory from "history/createBrowserHistory"
// const history = createHistory()
// import router from 'umi/router';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'login',
  state: {
    token:''
  },
  reducers: {
    getToken(state,data) {
      
      return state
    }
  },
  effects: {
    *login({ data }, { call, put }) {
        if(data.username==='admin'){
          yield put(routerRedux.push('/'))
        }else{
          message.error('请输入正确的用户名和密码');
        }
      }
    },
}
