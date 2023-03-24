import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 150,
    }}
    spin
  />
)

const Spinner = () => <Spin className="load-movies" indicator={antIcon} />
export default Spinner
