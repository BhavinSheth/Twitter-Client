import SingleCategory from './singleCategory'
import './categories.css'
import { useRef } from 'react'

export const Categories = ({ categories, prefix }) => {
  const container = useRef(null)

  const scroll = (event) => {
    const delta = Math.max(-1, Math.min(1, event.deltaY))
    container.current.scrollLeft -= delta * 30 // Adjust the scroll speed as needed
  }
  console.log('category rendered')

  return (
    <div ref={container} className="categories profile" onWheel={scroll}>
      {categories.map((item, index) => {
        return <SingleCategory key={index} item={item} prefix={prefix} />
      })}
    </div>
  )
}
