import { Alert, Space } from 'antd'
const ErrorLoad = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Error" description="Failed to load data" type="error" showIcon />
  </Space>
)
export default ErrorLoad
