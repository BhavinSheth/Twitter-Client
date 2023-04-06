import { Link } from 'react-router-dom'
import React from 'react'

function SingleSearch({ name, closeSearch, key }) {
  return (
    <Link to={`#${key}`} onClick={closeSearch}>
      <div className="single-search">
        <li>{name}</li>
        {/* <span>Rs {rentPrice}</span> */}
      </div>
    </Link>
  )
}

export default SingleSearch
