import React from 'react'
import { Link } from 'react-router-dom'
import { CLIENT_BASE_URL } from '../../../context/globalConstants'
import { useAppContext } from '../../../context/appContext'

function Trend({ hashtag, count }) {
  const { setGlobalSearch, get_filtered_search_results } = useAppContext()

  const handleClick = (hashtag) => {
    // const hashtag = e.target.value
    console.log(hashtag, 'hashtag after clicking')
    setGlobalSearch(hashtag)
    get_filtered_search_results(hashtag)
  }
  return (
    <Link
      to={`${CLIENT_BASE_URL}/search/searchType/tweets`}
      onClick={(e) => {
        // e.preventDefault()
        handleClick(hashtag)
      }}
      className="hashtag-container"
    >
      <div className="hashtag">{hashtag}</div>
      <div className="hashtag-count">{count} Tweets</div>
    </Link>
  )
}

export default Trend
