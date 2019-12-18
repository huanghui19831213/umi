import styles from './index.scss';
import { Component } from 'react';
import withRouter from 'umi/withRouter';


import { connect } from 'dva';
import Link from 'umi/link';
import { Menu } from 'antd';
class Layout extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    const { children, location, token } = this.props;
    console.log(token)
    if(location.pathname!=='/login'){
        return (
          <div className={styles.normal}>
            <div className={styles.topMenu} >
              <Menu 
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className="sider-menu-container">
                <Menu.Item key="mail">
                  <Link to="/list"> Navigation One</Link>
                </Menu.Item>
                <Menu.Item key="app">
                  <Link to="/404"> Navigation Two</Link>
                </Menu.Item>
              </Menu>
              <Link to="/login"> 退出</Link>
            </div>
            <div className={styles.allContent}>{children}</div>
          </div>
        )
      
    }
    return (
      <div className="allClient">{children}</div>
    )
  }
}

const mapStateToProps =(state) => {
  return {
    token:state.token.data
  }
}
 
 export default connect(mapStateToProps)(withRouter(Layout));