import React, { Component } from 'react'
import { connect } from 'dva';
import {  Route, Redirect, withRouter } from 'dva/router';
import { message } from 'antd';

class AuthRouter extends Component {
    render() {
        const { component: Component, token } = this.props
        let isLogged = false
        if (!isLogged) {
          message.warning('您需要先登陆');
        }
        
        return (
            <Route  render={props => {
              return isLogged
                  ? <Component {...props} />
                  : <Redirect to="/login" />
            }} />
        )
      }
}

function mapStateToProps(state) {
 return {
    token:state.token.data
 }
}

// export default ListData;
export default connect(mapStateToProps)(withRouter(AuthRouter));