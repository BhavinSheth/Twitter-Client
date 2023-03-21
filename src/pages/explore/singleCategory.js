import { NavLink } from 'react-router-dom'
import './singleCategory.css'

function SingleCategory({ item: category }) {
  return (
    <NavLink to={`tabs/${category}`} className={`single-category `}>
      <div className="single-category-container">
        <h3 className="single-category-text">{category}</h3>
      </div>
      <div className="single-category-slider"></div>
    </NavLink>
  )
}

export default SingleCategory
