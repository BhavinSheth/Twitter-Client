import { Link } from 'react-router-dom'
import React from 'react'

function SingleSearch({ name, setShowSearch, key }) {
  return (
    <Link to={`#${key}`}>
      <div className="single-search" onClick={() => setShowSearch(false)}>
        <li>{name}</li>
        {/* <span>Rs {rentPrice}</span> */}
      </div>
    </Link>
  )
}

export default SingleSearch
