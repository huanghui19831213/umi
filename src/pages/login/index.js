import styles from './index.scss';
import { Form, Icon, Input, Button } from 'antd';
export default () => {
  return (
    <div className={styles.contentBg}>
      <Form layout="inline" >
        <Form.Item >
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
        </Form.Item>
       
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};