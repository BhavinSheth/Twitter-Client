import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

function Protected({ Component }) {
  const { user, isLoggedIn } = useAppContext()
  const navigate = useNavigate()
  console.log(user, isLoggedIn)
  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [])

  return <div>{Component}</div>
}

export default Protected
