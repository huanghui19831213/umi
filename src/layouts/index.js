import styles from './index.scss';
import { Component } from 'react';
import withRouter from 'umi/withRouter';
import router from 'umi/router'
import { connect } from 'dva';
import Link from 'umi/link';
import { Menu } from 'antd';
import routerJson from '@/router/router';
class Layout extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  signout(){
    localStorage.clear();
    router.push('/login')
  };
  setMenu(e){
   return e.map((item) => {
      if(!item.children&&item.title){
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
    })

  };
  render() {
    const { children, location } = this.props;
    const path = location.pathname;
    if(location.pathname!=='/login'){
        return (
          <div className={styles.normal}>
            <div className={styles.topMenu} >
              <Menu 
                selectedKeys={[path]}
                mode="horizontal"
                className="sider-menu-container">
                {
                  this.setMenu(routerJson[0].routes)
                }
              </Menu>
              <span onClick={()=>this.signout()}> 退出</span>
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