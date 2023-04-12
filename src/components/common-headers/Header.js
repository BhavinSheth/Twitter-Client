import React from 'react'
import './header.css'
import { BsArrowLeft } from 'react-icons/bs'

function Header({ headerName, margin }) {
  return (
    <div className={`header-container ${margin && 'mg-negative'}`}>
      <div className="header">
        <div className="back-btn">
          {window.history.length > 0 && (
            <BsArrowLeft
              onClick={() => {
                window.history.back()
              }}
            />
          )}
        </div>

        <div className="header-info">{headerName}</div>
      </div>
    </div>
  )
}

export default Header
