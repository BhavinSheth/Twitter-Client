import React from 'react'
import { useAppContext } from '../../context/appContext'

import './loading-page.css'

function LoadingPage({ children }) {
  const { isWaiting } = useAppContext()
  return isWaiting ? (
    <div className="loading-wrapper">
      <div className="blue ball"></div>
      <div className="red ball"></div>
      <div className="yellow ball"></div>
      <div className="green ball"></div>
    </div>
  ) : (
    children
  )
}

export default LoadingPage
