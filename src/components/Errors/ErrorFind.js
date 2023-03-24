import { Alert, Space } from 'antd'
const ErrorFind = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Informational Note" description="No movies found" type="info" showIcon />
  </Space>
)
export default ErrorFind
