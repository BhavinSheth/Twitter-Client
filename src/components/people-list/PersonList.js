import SinglePerson from './SinglePerson'
import './personList.css'

import React from 'react'

function PersonList({ peopleList }) {
  return (
    <div className="people-list">
      {peopleList.map((person, index) => {
        return <SinglePerson key={index} {...person} />
      })}
    </div>
  )
}

export default PersonList
