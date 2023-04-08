import React from 'react'
import './sidebaroptions.css'
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'

const SidebarOptions = ({ id, setId, Icons, curId, name }) => {
  const { isLoggedIn, logout } = useAppContext()

  if (name === 'login' && isLoggedIn) return null
  if (name === 'logout' && !isLoggedIn) return null

  return (
    <Link
      to={name}
      className="sidebaroptions"
      onClick={(e) => {
        console.log(name)
        if (name === 'logout') {
          e.preventDefault()
          logout()
        }
        setId(id)
      }}
    >
      <Icons className={`svg ${curId === id && 'active-sidebar'}`} />
      <p className={`${curId === id ? 'active-p' : null}`}>{name}</p>
    </Link>
  )
}

export default SidebarOptions
