import React from 'react'
import './sidebaroptions.css'
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'

const SidebarOptions = ({ id, setId, Icons, curId, name }) => {
  return (
    <Link
      to={name}
      className="sidebaroptions"
      onClick={() => {
        setId(id)
      }}
    >
      <Icons className={`svg ${curId === id && 'active-sidebar'}`} />
      <p className={`${curId === id ? 'active-p' : null}`}>{name}</p>
    </Link>
  )
}

export default SidebarOptions
