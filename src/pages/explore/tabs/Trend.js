import React from 'react'
import { Link } from 'react-router-dom'

function Trend({ hashtag, count }) {
  return (
    <Link className="hashtag-container">
      <div className="hashtag">{hashtag}</div>
      <div className="hashtag-count">{count} Tweets</div>
    </Link>
  )
}

export default Trend
