import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppContext } from '../context/appContext'

function Protected({ protectedComponent }) {
  const { isLoggedIn } = useAppContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      toast.warning('you need to login first')
    }
  }, [])

  return <>{protectedComponent}</>
}

export default Protected
