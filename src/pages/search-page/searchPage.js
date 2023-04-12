import { Outlet } from 'react-router-dom'
import { Search } from '../../components/search/search'

import { useAppContext } from '../../context/appContext'
import { Categories } from '../explore/categories'
import { useEffect } from 'react'
const searchCategories = ['tweets', 'latest ', 'people']

const SearchPage = () => {
  const { filteredResults } = useAppContext()
  console.log('search page rendered')
  useEffect(() => {}, [])
  return (
    <>
      <div className="explore">
        <div className="explore-headers place-center">
          <Search />
          <Categories categories={searchCategories} prefix={'searchType/'} />
        </div>
        {filteredResults && <Outlet />}
      </div>
    </>
  )
}

export default SearchPage
