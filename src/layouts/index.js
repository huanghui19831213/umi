import styles from './index.css';

// function BasicLayout(props) {
//   return (
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Yay! Welcome to umi!</h1>
//       {props.children}
//     </div>
//   );
// }

// export default BasicLayout;

import { Component } from 'react';
import withRouter from 'umi/withRouter';

class Layout extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    const { children, location } = this.props;
    console.log(location.pathname,this.props)
    if(location.pathname!=='/login'){
      return (
        <div className={styles.normal}>
          <h1 className={styles.title}>Yay! Welcome to umi!</h1>
          <div>{children}</div>
        </div>
      )
    }
    return (
      <div className="allClient">{children}</div>
    )
  }
}

export default withRouter(Layout);