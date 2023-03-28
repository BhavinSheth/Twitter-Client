import { NavLink } from 'react-router-dom'
import './singleCategory.css'

function SingleCategory({ item: category, prefix }) {
  prefix = prefix || ''
  return (
    <NavLink to={`${prefix}${category}`} className={`single-category `}>
      <div className="single-category-container profile">
        <h3 className="single-category-text profile">{category}</h3>
      </div>
      <div className="single-category-slider profile"></div>
    </NavLink>
  )
}

export default SingleCategory
