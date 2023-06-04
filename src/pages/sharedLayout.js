import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/sidebar'

const sharedLayout = () => {
  return (
    <div className="app">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default sharedLayout
