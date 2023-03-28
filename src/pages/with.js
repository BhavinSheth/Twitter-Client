import React from 'react'
import { useParams } from 'react-router-dom'

function With() {
  const { param } = useParams()
  console.log('in With', param)
  return <div>{param}</div>
}

export default With
