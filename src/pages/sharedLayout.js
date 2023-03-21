import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/sidebar'

const sharedLayout = () => {
  console.log('shared layout')
  return (
    <div className="app">
      <Sidebar />
      <Outlet />
      {/* <h1>3rd pane</h1> */}
    </div>
  )
}

export default sharedLayout
