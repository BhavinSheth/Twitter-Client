import { Link } from 'react-router-dom'
import React from 'react'
import { useAppContext } from '../../context/appContext'
import { CLIENT_BASE_URL } from '../../context/globalConstants'

function SingleSearch({ hashtag, closeSearch, key }) {
  const { setGlobalSearch, get_filtered_search_results } = useAppContext()

  const handleClick = () => {
    setGlobalSearch(hashtag)
    get_filtered_search_results(hashtag)
    closeSearch()
  }

  return (
    <Link
      to={`${CLIENT_BASE_URL}/search/searchType/tweets`}
      onClick={handleClick}
    >
      <div className="single-search">
        <li>{hashtag}</li>
        {/* <span>Rs {rentPrice}</span> */}
      </div>
    </Link>
  )
}

export default SingleSearch
