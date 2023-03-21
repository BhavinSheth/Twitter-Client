import './explore.css'
import { Outlet } from 'react-router-dom'
import { Search } from '../../components/search/search'

import { useAppContext } from '../../context/appContext'
import { Categories } from './categories'

const Explore = () => {
  // const { category } = useAppContext()
  console.log('explore rendered')

  return (
    <>
      <div className="explore">
        <div className="explore-headers place-center">
          <Search />
          <Categories />
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Explore
