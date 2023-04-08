import { Home } from '@material-ui/icons'
import { Explore } from '@material-ui/icons'
import { Notifications } from '@material-ui/icons'
import { Search } from '@material-ui/icons'
import { FiLogOut } from 'react-icons/fi'
import { FiLogIn } from 'react-icons/fi'

const sidebarData = [
  {
    id: 1,
    name: 'home',
    Icons: Home,
  },
  {
    id: 2,
    name: 'explore',
    Icons: Explore,
  },
  {
    id: 3,
    name: 'search',
    Icons: Search,
  },
  {
    id: 4,
    name: 'login',
    Icons: FiLogIn,
  },
  {
    id: 5,
    name: 'logout',
    Icons: FiLogOut,
  },
  // {
  //   id: 4,
  //   name: 'notifications',
  //   Icons: Notifications,
  // },
  // {
  //   id: 5,
  //   name: 'bookmarks',
  //   Icons: Bookmarks,
  // },
]

export default sidebarData
