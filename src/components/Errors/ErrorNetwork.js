import { Alert, Space } from 'antd';
const ErrorNetwork = () => (
  <Space
    
    direction="vertical"
    style={{
      width: '50%',
      marginTop: '50px'
    }}
  >
    <Alert
      message="Error"
      description="No internet connection"
      type="error"
      showIcon
    />
  </Space>
);
export default ErrorNetwork;