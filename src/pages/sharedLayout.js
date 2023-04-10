import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/sidebar'
import { Search } from '../components/search/search'

const sharedLayout = () => {
  return (
    <div className="app">
      <Sidebar />
      <Outlet />
      {/* <Search /> */}
    </div>
  )
}

export default sharedLayout
