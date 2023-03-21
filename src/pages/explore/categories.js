import categories from './constants'
import SingleCategory from './singleCategory'
import './categories.css'
import uuid from 'react-uuid'

export const Categories = () => {
  console.log('category rendered')

  return (
    <div className="categories">
      {categories.map((item) => {
        return <SingleCategory key={uuid()} item={item} />
      })}
    </div>
  )
}
